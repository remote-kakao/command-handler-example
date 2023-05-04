import { Message, UDPServer } from "@remote-kakao/core";

const Command = (
	handler: (message: Message, args: string[], server: UDPServer) => void,
) => handler;

export default Command;
