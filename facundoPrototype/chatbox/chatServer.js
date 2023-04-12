const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const port = 6969;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
	ws.on("message", function incoming(data, isBinary) {
		wss.clients.forEach(function each(client) {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(data, { binary: isBinary });
			}
		});
	});
});

server.listen(port, function () {
	console.log(`Server is listening on ${port}!`);
});
