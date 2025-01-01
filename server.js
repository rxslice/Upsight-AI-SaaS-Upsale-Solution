const WebSocket = require('ws');
const uuid = require('uuid');

const wss = new WebSocket.Server({ port: 8080 });
const clients = new Map();

wss.on('connection', ws => {
  const clientId = uuid.v4();
  clients.set(clientId, ws);
  console.log(`Client connected: ${clientId}`);

  ws.on('message', message => {
    console.log(`Received message from ${clientId}: ${message}`);
    try {
      const parsedMessage = JSON.parse(message);
      if (parsedMessage.type === 'customerUpdate') {
        clients.forEach((client, id) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(parsedMessage));
          }
        });
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', () => {
    console.log(`Client disconnected: ${clientId}`);
    clients.delete(clientId);
  });

  ws.on('error', error => {
    console.error(`WebSocket error for ${clientId}: ${error}`);
    clients.delete(clientId);
  });
});

console.log('WebSocket server started on port 8080');
