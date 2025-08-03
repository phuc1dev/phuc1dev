const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const path = require('path');

// Configuration
const PORT = process.env.PORT || 8080;
const WS_PORT = process.env.WS_PORT || 8081;

// Create Express app
const app = express();
const server = http.createServer(app);

// Serve static files (for testing client)
app.use(express.static(path.join(__dirname, 'public')));

// WebSocket Server
const wss = new WebSocket.Server({ port: WS_PORT });

// Store connected clients
const clients = new Set();

// WebSocket connection handler
wss.on('connection', (ws, request) => {
    console.log(`New WebSocket connection from ${request.socket.remoteAddress}`);
    
    // Add client to active connections
    clients.add(ws);
    
    // Send welcome message
    const welcomeMessage = {
        type: 'welcome',
        message: 'Connected to WebSocket server',
        timestamp: new Date().toISOString(),
        clientId: generateClientId()
    };
    
    ws.send(JSON.stringify(welcomeMessage));
    
    // Handle incoming messages
    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data.toString());
            console.log('Received message:', message);
            
            // Handle different message types
            handleMessage(ws, message);
            
        } catch (error) {
            console.error('Error parsing message:', error);
            const errorResponse = {
                type: 'error',
                message: 'Invalid JSON format',
                timestamp: new Date().toISOString()
            };
            ws.send(JSON.stringify(errorResponse));
        }
    });
    
    // Handle connection close
    ws.on('close', (code, reason) => {
        console.log(`WebSocket connection closed: ${code} ${reason}`);
        clients.delete(ws);
    });
    
    // Handle errors
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        clients.delete(ws);
    });
});

// Message handler function
function handleMessage(ws, message) {
    const response = {
        type: 'response',
        originalMessage: message,
        timestamp: new Date().toISOString()
    };
    
    switch (message.type) {
        case 'ping':
            response.type = 'pong';
            response.message = 'pong';
            break;
            
        case 'echo':
            response.type = 'echo';
            response.message = message.message || 'No message provided';
            break;
            
        case 'broadcast':
            // Broadcast message to all connected clients
            const broadcastMessage = {
                type: 'broadcast',
                message: message.message || 'Broadcast message',
                from: message.from || 'Anonymous',
                timestamp: new Date().toISOString()
            };
            
            clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(broadcastMessage));
                }
            });
            return; // Don't send individual response for broadcast
            
        case 'status':
            response.type = 'status';
            response.data = {
                connectedClients: clients.size,
                serverUptime: process.uptime(),
                memoryUsage: process.memoryUsage()
            };
            break;
            
        default:
            response.type = 'unknown';
            response.message = `Unknown message type: ${message.type}`;
    }
    
    ws.send(JSON.stringify(response));
}

// Generate unique client ID
function generateClientId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Start HTTP server
server.listen(PORT, () => {
    console.log(`HTTP server running on port ${PORT}`);
    console.log(`WebSocket server running on port ${WS_PORT}`);
    console.log(`Visit http://localhost:${PORT} to test the WebSocket client`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Shutting down gracefully...');
    server.close(() => {
        wss.close(() => {
            process.exit(0);
        });
    });
});

process.on('SIGINT', () => {
    console.log('Shutting down gracefully...');
    server.close(() => {
        wss.close(() => {
            process.exit(0);
        });
    });
});