import React, {useState} from "react";
import toast from "react-hot-toast";
import { createRoom as createRoomApi } from "../services/RoomService";
import { useChatContext } from "../context/ChatContext";
import { useNavigate } from "react-router";
import { joinChatApi } from "../services/RoomService";


const JoinCreateChat = () => {
    interface IDetail {
        roomId: string;
        userName: string;
    }
    const [detail, setDetail] = useState<IDetail>({
        roomId: "",
        userName: ""
    });

    const { setRoomId, setCurrentUser, setConnected } = useChatContext();
    const navigate = useNavigate();

    const handleFormInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDetail({
            ...detail,
            [event.target.name]: event.target.value
        });
    }   

    const validateForm = () => {
        if(detail.roomId.trim() === "" || detail.userName.trim() === "") {
            toast.error("Please fill all the fields");
            return false;
        }
        return true;
    }
    const joinChat = async () => {
        if (validateForm()) {
            try {
              const room = await joinChatApi(detail.roomId);
              toast.success("joined..");
              setCurrentUser(detail.userName);
              setRoomId(room.roomId);
              setConnected(true);
              navigate(`/chat/${room.roomId}`);
            } catch (error) {
                if(error instanceof Error) {
                    if (error.message === "Request failed with status code 400") {
                    toast.error(error.message);
                } else {
                    toast.error("Error in joining room");
              }
            }
              console.log(error);
            }
          }
        }
       
    const createRoom = async () => {
        if (validateForm()) {
            try {
                const response = await createRoomApi(detail.roomId); 
                toast.success("Room created successfully");
                setCurrentUser(detail.userName);
                setRoomId(response.roomId);
                setConnected(true);
                navigate(`/chat/${response.roomId}`);
                joinChat(); 
            } catch (error) {
                console.error(error);
                if (error instanceof Error) {
                    if (error.message === "Request failed with status code 400") {
                        toast.error("Room already exists");
                    } else {
                        toast.error("Error creating room");
                    }
                } else {
                    toast.error("An unexpected error occurred");
                }
            }
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-10 dark:border-grey-700    w-full flex flex-col gap-5 max-w-md rounded dark:bg-gray-900 shadow">
                <h1 className="text-2xl font-semibold text-center">Join/Create Room...</h1>
            <div>
                <label htmlFor="name" className="block font-medium mb-2">Your Name...</label>
                <input onChange={handleFormInputChange} value={detail.userName} type="text" id="name" name="userName" placeholder="Enter the name" className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
                <label htmlFor="name" className="block font-medium mb-2">Room ID</label>
                <input name="roomId" onChange={handleFormInputChange} placeholder="Enter Room ID" value={detail.roomId} type="text" id="name" className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex justify-center gap-2 mt-4">
                <button onClick={joinChat} className="px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-full"> Join Room</button>
                <button onClick={createRoom} className="px-3 py-2 dark:bg-orange-500 hover:dark:bg-orange-800 rounded-full"> Create Room</button>
            </div>
            </div>
        </div>
    );
    
};

export default JoinCreateChat;