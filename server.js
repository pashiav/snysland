const express = require("express");
const app = express();
const http = require("http"); // Used to start server
const server = http.createServer(app);

// Send HTML file when user connects to server
const path = require("path"); // Import the "path" module.
app.use(express.static(path.join(__dirname, "website"))); //serve static files from the "website" directory.
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "website/index.html"));
});

// Start server on port
const localIPAddress = "localhost" // ipv4 //"10.104.58.91" // IPv4 or localhost
const port = 3000
server.listen(port, localIPAddress, () => {
	console.log(`Server is running on http://${localIPAddress}:${port}`)
})