import { readdirSync } from "node:fs";
import { join } from "node:path";
import { UDPServer } from "@remote-kakao/core";
import { RKEvalPlugin } from "@remote-kakao/rkeval-plugin";
import { LoggerPlugin } from "./plugins";
import Command from "./lib/command";

const prefix = ">";
const port = Number(process.env.PORT || 3000);
const server = new UDPServer({ serviceName: "remote-kakao" });

server.usePlugin(RKEvalPlugin);
server.usePlugin(LoggerPlugin, {
	logFilePath: join(process.cwd(), "messages.log"),
	enableAppInfo: true,
});

const commands: { [command: string]: ReturnType<typeof Command> } = {};

readdirSync(join(__dirname, "./commands")).map((fileName) => {
	const command: {
		default: ReturnType<typeof Command>;
		aliases: string[] | undefined;
	} = require(`./commands/${fileName}`);

	if (command.aliases)
		command.aliases.forEach((alias) => (commands[alias] = command.default));
	else commands[fileName.slice(0, -3)] = command.default;
});

server.on("message", (msg) => {
	const args = msg.content.split(" ");
	const cmd = args.shift()?.slice(prefix.length);
	if (!cmd || !Object.keys(commands).includes(cmd)) return;

	commands[cmd](msg, args, server);
});

server.start(port);
