# 💬 Real-Time Messaging App

A simple real-time messaging application built with React, Socket.io, and Express.

## Features

- Real-time messaging with WebSocket
- Dark theme UI
- Contact management
- Group conversations
- Responsive design

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express + Socket.io
- **Deployment:** Railway

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm

### Installation

1. **Clone the repo**

```bash
git clone https://github.com/kubthesupermax/realtime-messaging-platform.git
cd realtime-messaging-platform
```

2. **Install dependencies**

```bash
cd server && npm install
cd ../client && npm install
```

3. **Run locally**

Terminal 1 - Server:

```bash
cd server
npm start
```

Terminal 2 - Client:

```bash
cd client
npm run dev
```

Visit http://localhost:5173

## Usage

1. Create or enter your unique ID
2. Add contacts using their IDs
3. Start a conversation and send messages
4. Messages sync in real-time!

## Deployment

Built for Railway deployment:

```bash
cd client && npm run build
cp -r dist/ ../server/
cd ../server
git add . && git commit -m "Deploy" && git push
```

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   └── hooks/
│   └── package.json
└── server/          # Express + Socket.io backend
    ├── server.js
    └── package.json
```

## How It Works

The app uses Socket.io for real-time bidirectional communication. Each user connects with a unique ID, joins a Socket.io room, and messages are broadcast to recipients instantly through WebSocket connections.

## License

MIT

## Author

kubthesupermax - [@kubthesupermax](https://github.com/kubthesupermax)
