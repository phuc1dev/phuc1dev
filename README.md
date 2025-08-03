![header](https://raw.githubusercontent.com/phuc1dev/phuc1dev/main/assets/svg/header.svg?v=1)
![](https://komarev.com/ghpvc/?username=phuc1dev&label=PROFILE+VIEWS&abbreviated=true)  
Welcome to my GitHub profile! I'm a programmer specializing in **C#**, **NodeJS**, **PHP** and **Java**. I love building scalable web applications, exploring new technologies, and contributing to open-source projects.

![NodeJS](https://img.shields.io/badge/-NodeJS-339933?style=flat&logo=node.js&logoColor=white)
![PHP](https://img.shields.io/badge/-PHP-777BB4?style=flat&logo=php&logoColor=white)
![C#](https://img.shields.io/badge/-C%23-239120?style=flat&logo=csharp&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![MySQL](https://img.shields.io/badge/-MySQL-0e44e8?style=flat&logo=mysql&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/-VS%20Code-007ACC?style=flat&logo=visual-studio-code&logoColor=white)
![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)

## 🚀 WebSocket Server Backend

This repository now includes a **WebSocket server backend** for real-time JSON communication between client and server. The server is built with Node.js and provides a complete solution for WebSocket-based applications.

### ✨ Features

- **Real-time Communication**: WebSocket server with JSON message handling
- **Multiple Message Types**: Support for ping/pong, echo, broadcast, and custom messages
- **Client Management**: Connection tracking and management
- **Error Handling**: Comprehensive error handling and logging
- **Test Client**: Built-in HTML client for testing WebSocket functionality
- **Broadcasting**: Send messages to all connected clients
- **Server Status**: Get real-time server statistics

### 🛠️ Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```

3. **Test the WebSocket**
   - Open your browser and navigate to `http://localhost:8080`
   - Use the built-in test client to interact with the WebSocket server
   - Server runs on port 8080 (HTTP) and 8081 (WebSocket)

### 📡 WebSocket API

The server accepts JSON messages with the following format:

#### Message Types

**Ping/Pong**
```json
{
  "type": "ping"
}
```

**Echo Message**
```json
{
  "type": "echo",
  "message": "Your message here"
}
```

**Broadcast to All Clients**
```json
{
  "type": "broadcast",
  "message": "Message to broadcast",
  "from": "Your name"
}
```

**Get Server Status**
```json
{
  "type": "status"
}
```

**Custom Messages**
```json
{
  "type": "custom",
  "data": "any custom data structure"
}
```

### 🔧 Configuration

Create a `.env` file based on `.env.example`:

```bash
PORT=8080          # HTTP server port
WS_PORT=8081       # WebSocket server port
NODE_ENV=development
```

### 📁 Project Structure

```
├── server.js          # Main WebSocket server
├── package.json       # Node.js dependencies
├── public/
│   └── index.html     # Test client interface
├── .env.example       # Environment configuration template
└── .gitignore         # Git ignore rules
```

### 🔌 Integration Example

**Client-side JavaScript:**
```javascript
const ws = new WebSocket('ws://localhost:8081');

ws.onopen = function() {
    console.log('Connected to WebSocket server');
    
    // Send a message
    ws.send(JSON.stringify({
        type: 'echo',
        message: 'Hello Server!'
    }));
};

ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log('Received:', data);
};
```

## 📈 GitHub Stats
<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=phuc1dev&show_icons=true&theme=transparent&k=1" alt="GitHub Stats"/>
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=phuc1dev&theme=transparent&k=1" alt="GitHub Streak Stats"/>
</div>
