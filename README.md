
# Real-Time Chat App

This is a real-time chat application built with Spring Boot for the backend and Vite (React) for the frontend. It allows users to join chat rooms and send/receive messages in real-time using WebSocket.

## Features
- Real-time messaging using WebSocket
- Users can join multiple rooms
- Messages are broadcasted to all connected users in the room
- Frontend built with React using Vite
- Backend powered by Spring Boot

## Tech Stack
- **Frontend**: React, Vite
- **Backend**: Spring Boot, WebSocket
- **Protocol**: WebSocket for real-time communication
- **Build Tool**: Vite for frontend bundling

## File Structure

### Frontend (React)

```
src/
│
├── components/                # Contains reusable UI components
│   └── JoinCreateChats.tsx     # Component for creating/joining chat rooms
│
├── config/                    # Configuration files
│   ├── AxiosHelper.ts         # Axios configuration for API requests
│   ├── Helper.ts              # Utility functions
│   └── Routes.tsx             # Route definitions for the app
│
├── context/                   # Context providers for global state
│   └── ChatContext.tsx        # React context for managing chat state
│
├── pages/                     # Pages for routing
│   ├── ChatPage.tsx           # Page for the chat room
│   └── HomePage.tsx           # Home page of the chat app
│
├── services/                  # Services for handling business logic
│   └── RoomService.ts         # Service for managing chat rooms
│
├── App.tsx                    # Main component to render the app
└── main.tsx                   # Entry point to the app
```

### Backend (Spring Boot)

```
backend/
└── src/
    └── main/
        └── java/
            └── com/
                └── project/
                    └── chat/
                        ├── ChatAppBackendApplication.java   # Main Spring Boot application class
                        ├── config/
                        │   └── WebSocketConfig.java         # WebSocket configuration
                        ├── controllers/
                        │   ├── ChatController.java          # Handles chat room operations
                        │   └── RoomController.java          # Manages room operations
                        ├── entities/
                        │   ├── Message.java                # Entity for chat messages
                        │   ├── Room.java                   # Entity for chat rooms
                        │   └── repositories/               # Repository for room data access
                        │       └── RoomRepository.java      # Room repository
                        ├── payload/
                        │   └── MessageRequest.java          # Payload for incoming messages
```

## Installation

### Backend (Spring Boot)
1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   ```

2. Navigate to the backend directory:
   ```bash
   cd chat-app-backend
   ```

3. Install the dependencies and run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

4. The backend will be running on `http://localhost:8080`.

### Frontend (React with Vite)
1. Navigate to the frontend directory:
   ```bash
   cd chat-app-frontend
   ```

2. Install the frontend dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. The frontend will be accessible at `http://localhost:5173`.

## Usage

1. Open the app in a web browser.
2. Join a chat room by entering a room name.
3. Start sending and receiving messages in real-time.


