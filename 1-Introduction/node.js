// 1️⃣ What is Node.js? (Quick Revision)
// Node.js is a JavaScript runtime built on Chrome’s V8 engine that lets you run JavaScript outside the browser, mainly on the server.

// 👉 Before Node.js
// JS = only for browser (DOM, events)

// 👉 After Node.js
// JS = backend, APIs, servers, databases, CLI tools

// 💡 Key idea:
// Node.js is fast, non-blocking, and event-driven

// 2️⃣ Why Node.js is Fast?
// 🔹 V8 Engine
// Written in C++
// Converts JavaScript → machine code
// Very fast execution

// 🔹 Single-threaded + Non-blocking
// Node.js uses one main thread, but still handles thousands of users.

// How?
// ➡️ Event Loop + Async I/O

// 3️⃣ Blocking vs Non-Blocking (VERY IMPORTANT)
// ❌ Blocking (Bad)
const data = fs.readFileSync("file.txt");
console.log(data);
// ⛔ Server waits until file is read.

// ✅ Non-Blocking (Good)
fs.readFile("file.txt", (err, data) => {
  console.log(data);
});
// ✔ Server continues handling other requests.


// 💡 Node.js philosophy:
// Never block the main thread

// 4️⃣ Event Loop (CORE CONCEPT 🔥)
// The Event Loop handles async operations.
// How it works (Simple Flow):
// Request comes
// Async task (DB, file, API) → sent to background
// Main thread continues
// Callback/Promise goes to event queue
// Event loop executes it when stack is free

// 📌 Used for:
// setTimeout
// Promises
// DB queries
// File system
// API calls

// 5️⃣ Node.js Architecture (Interview Favorite)
// Client → Node Server
//            |
//            |
//      Event Loop
//            |
//      Thread Pool (libuv)

// Components:
// V8 Engine – Executes JS
// Event Loop – Manages async
// libuv – Handles OS-level async tasks
// Thread Pool – For heavy tasks (FS, crypto)

// 6️⃣ Modules in Node.js
// 🔹 Built-in Modules
// fs → File system
// http → Create server
// path → File paths
// os → System info
// events → Event handling

// Example:
const fs = require("fs");

// 7️⃣ CommonJS vs ES Modules
// CommonJS (Old, Default)
const express = require("express");
module.exports = app;

// ES Modules (Modern)
import express from "express";
export default app;
// 📌 ES Modules need:
// "type": "module" in package.json

// 8️⃣ npm (Node Package Manager)
// What npm does:
// Install packages
// Manage dependencies
// Run scripts

// Important commands:
// npm init
// npm install express
// npm install --save-dev nodemon
// npm run dev

// Dependencies types:
// dependencies → production
// devDependencies → development only

// 9️⃣ Creating Server with Node.js
// Using HTTP module
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello Node");
});

server.listen(3000);
// ⛔ Hard to manage routes → Express is better

// 🔟 Express.js (Most Used with Node)
// Express = Node.js framework
// ✔ Simplifies routing, middleware, APIs


// Basic Express App
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(3000);