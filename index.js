
//1. Use a readable stream to read a file in chunks and log each chunk. (0.5 Grade)
const fs = require("fs");

const readableStream = fs.createReadStream("big.txt", {
  encoding: "utf8",
  highWaterMark: 64,
});

readableStream.on("data", (chunk) => {
  console.log("New chunk received:");
  console.log(chunk);
});

readableStream.on("end", () => {
  console.log("File reading finished!");
});


//2. Use readable and writable streams to copy content from one file to another.
const fs = require("fs");
fs.writeFileSync("source.txt", "Hello this is the source file content!");
const sourceReadStream = fs.createReadStream("source.txt");

const writeStream = fs.createWriteStream("dest.txt");
sourceReadStream.pipe(writeStream);

writeStream.on("finish", () => {
  console.log("File copied successfully using streams");
});
//3. Create a pipeline that reads a file, compresses it, and writes it to another file.

const fs = require("fs");
const zlib = require("zlib");

const dataReadStream = fs.createReadStream("data.txt");
const gzipStream = zlib.createGzip();
const gzipWriteStream = fs.createWriteStream("data.txt.gz");

dataReadStream.pipe(gzipStream).pipe(gzipWriteStream);

gzipWriteStream.on("finish", () => {
  console.log("File compressed and saved to data.txt.gz!");
});


//Part2: Simple CRUD Operations Using HTTP (
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  // GET all users
  if (method === "GET" && url === "/user") {
    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  }

  // GET user by ID
  else if (method === "GET" && url.startsWith("/user/")) {
    const id = Number(url.split("/")[2]);
    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);

    const user = users.find((u) => u.id === id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User not found." }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    }
  }

  // post /user
  else if (method === "POST" && url === "/user") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const { name, age, email } = JSON.parse(body);

      const data = fs.readFileSync("users.json", "utf8");
      const users = JSON.parse(data);

      const emailExists = users.find((u) => u.email === email);

      if (emailExists) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Email already exists." }));
      } else {
        const newUser = {
          id: users.length + 1,
          name: name,
          age: age,
          email: email,
        };

        users.push(newUser);
        fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User added successfully." }));
      }
    });
  }

  // patch /user/id 
  else if (method === "PATCH" && url.startsWith("/user/")) {
    const id = Number(url.split("/")[2]);
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const data = fs.readFileSync("users.json", "utf8");
      const users = JSON.parse(data);

      const index = users.findIndex((u) => u.id === id);

      if (index === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User ID not found." }));
      } else {
        const updates = JSON.parse(body);

        if (updates.name) users[index].name = updates.name;
        if (updates.age) users[index].age = updates.age;
        if (updates.email) users[index].email = updates.email;

        fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User updated successfully." }));
      }
    });
  }

  // delete/ user/id
  else if (method === "DELETE" && url.startsWith("/user/")) {
    const id = Number(url.split("/")[2]);

    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);

    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User ID not found." }));
    } else {
      users.splice(index, 1);
      fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User deleted successfully." }));
    }
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//1. Event Loop It is like a loop that Node.js use to keep checking tasks. When the call stack is empty it takes callbacks and run them.

//2- Libuv is a  library that Node depends on. It handle async stuff like file system, thread pool and event loop.

//3. Async,Node don’t run async tasks directly, it send them to Libuv or system. After finish, result go to a queue then event loop take it and run callback.
//4. Call stack / Event queue / Event loop

// Call stack: where functions run
// Event queue: store waiting callbacks
// Event loop: move callback from queue to stack when stack is free