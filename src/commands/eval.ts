import Command from "../lib/command";

export default Command(async (msg, args) => {
	const result = await msg.rkeval(args.join(" "));
	msg.replyText(result);
});
