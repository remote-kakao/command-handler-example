import { Message, Server } from "@remote-kakao/core";

const Command = (
	handler: (message: Message, args: string[], server: Server) => void,
) => handler;

export default Command;
