import React, { useState, useRef, useEffect } from "react";
import { MdSend } from "react-icons/md";
import { useNavigate } from "react-router";
import { useChatContext } from "../context/ChatContext";
import { getMessages } from "../services/RoomService";
import { toast } from "react-hot-toast";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { baseURL } from "../config/AxiosHelper";
import { timeAgo } from "../config/helper";

const ChatPage: React.FC = () => {
    const {
        roomId,
        currentUser,
        connected,
        setConnected,
        setRoomId,
        setCurrentUser,
      } = useChatContext();
    
      const navigate = useNavigate();
      useEffect(() => {
        if (!connected) {
          navigate("/");
        }
      }, [connected, roomId, currentUser]);
    
      interface Message {
        sender: string;        
        content: string;       
        timeStamp: string;       
    }

    const [messages, setMessages]  = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
    
    useEffect(() => {
        async function loadMessages() {
          try {
            const messages = await getMessages(roomId);
            setMessages(messages);
          } catch (error) {}
        }
        if (connected) {
          loadMessages();
        }
      }, []);
      useEffect(() => {
        if (chatBoxRef.current) {
          chatBoxRef.current.scroll({
            top: chatBoxRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, [messages]);
    
      useEffect(() => {
        const connectWebSocket = () => {
          const sock = new SockJS(`${baseURL}/chat`);
          const client = Stomp.over(sock);
    
          client.connect({}, () => {
            setStompClient(client);
    
            toast.success("connected");
    
            client.subscribe(`/topic/room/${roomId}`, (message) => {
              console.log(message);
    
              const newMessage = JSON.parse(message.body);
    
              setMessages((prev) => [...prev, newMessage]);

            });
          });
        };
    
        if (connected) {
          connectWebSocket();
        }
      }, [roomId]);
    
      const sendMessage = async () => {
        if (stompClient && connected && input.trim()) {
    
           const message = {
            sender: currentUser,
            content: input,
            roomId: roomId,
          };
    
          stompClient.send(
            `/app/sendMessage/${roomId}`,
            {},
            JSON.stringify(message)
          );
          setInput("");
        }
    
        //
      };
    
      function handleLogout() {
        stompClient?.disconnect(() => {
          console.log("Disconnected");
        });
        setConnected(false);
        setRoomId("");
        setCurrentUser("");
        navigate("/");
      }

  return (
    <div className="">
        <header className="dark:border-gray-700 border fixed w-full dark:bg-gray-900 py-5 shadow flex justify-around items-center">
            <div className="">
                <h1 className="text-xl font-semibold">
                    Room : <span>{roomId}</span>
                </h1>
            </div>
            <div className="text-xl font-semibold">
                User : <span>{currentUser}</span>
            </div>
            <div>
                <button onClick={handleLogout} className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full">Leave Room</button>
            </div>
        </header>

        <main ref={chatBoxRef} className="py-20 px-10 w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto">
            {messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === currentUser ? "justify-end" : "justify-start"}`}>
                <div className={`my-2 ${message.sender === currentUser? "bg-green-700" : "bg-gray-700"} p-2 max-w-xs rounded`}>
                    <div className="flex flex-row gap-2">
                        <img className="h-10 w-10" src="https://avatar.iran.liara.run/public/35"></img>
                    <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold">{message.sender}</p>
                    <p>{message.content}</p>
                    <p className="text-xs text-gray-400">
                    {timeAgo(message.timeStamp)}
                  </p>
                    </div>
                    </div>
                    
                </div>
                </div>))}
        </main>

        <div className="fixed bottom-2 w-full h-16">
            <div className="h-full rounded w-1/2 gap-2 mx-auto dark:bg-gray-900 pr-5 flex items-center justify-between">
                <input type="text" value={input} onChange={(e) => {setInput(e.target.value);}} onKeyDown={(e) => { 
                    if (e.key === "Enter") {
                        sendMessage();
                    }}}
                    placeholder="Type your message here..." className="dark:border-gray-600 dark:bg-gray-800 h-full px-5 py-2 rounded-full w-full focus:outline-none" />
                <button onClick={sendMessage} className="dark:bg-green-600 h-12 flex justify-center items-center w-12 px-3 py-2 rounded-full ">
                    <MdSend />
                    </button>
            </div>
        </div>
    </div>
  );
};

export default ChatPage;