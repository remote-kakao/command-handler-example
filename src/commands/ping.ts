import Command from "../lib/command";

export default Command(async (msg, _args, _server) => {
	const timestamp = Date.now();
	await msg.reply("Pong!");
	msg.reply(`${Date.now() - timestamp}ms`);
});
