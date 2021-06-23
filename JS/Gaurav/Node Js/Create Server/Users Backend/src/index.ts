import express from "express";
import { createServer } from "http";
import { userRouter } from "./routes";
import dotEnv from "dotenv";
import cors from "cors";

dotEnv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use(cors());

app.use("/users", userRouter);

const server = createServer(app);

server.listen(PORT);

server.on("listening", function () {
	console.log(`Listening on port ${PORT}`);
});
