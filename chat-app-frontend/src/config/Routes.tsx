import React from "react";
import App from "../App";2
import { Routes, Route } from "react-router";
import ChatPage from "../pages/ChatPage";

const AppRoutes : React.FC = () => {
    return (
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat/:roomId" element={<ChatPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
    );
    };

export default AppRoutes;