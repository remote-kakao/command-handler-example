import Command from "../lib/command";

export default Command(async (msg, _args, _server) => {
	const timestamp = Date.now();
	await msg.replyText("Pong!");
	msg.replyText(`${Date.now() - timestamp}ms`);
});
