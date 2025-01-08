import React, { useContext, createContext, useState, ReactNode } from 'react';

interface ChatContextProps {
    roomId: string;
    setRoomId: React.Dispatch<React.SetStateAction<string>>;
    currentUser: string;
    setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
    connected: boolean;
    setConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatContext = createContext<ChatContextProps | undefined>(undefined);

interface ChatProviderProps {
    children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [roomId, setRoomId] = useState<string>("");
    const [currentUser, setCurrentUser] = useState<string>("");
    const [connected, setConnected] = useState<boolean>(false);
    const value = { roomId, setRoomId, currentUser, setCurrentUser, connected, setConnected };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = (): ChatContextProps => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChatContext must be used within a ChatProvider");
    }
    return context;
};
