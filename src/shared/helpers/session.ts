import { redirect } from "@tanstack/react-router";
import { Context } from "../../main";

export const checkToken = async (context: Context) => {
	const exp = context.session.exp;
	const now = Math.floor(Date.now() / 1000);

	await Promise.resolve(context.session && exp < now).then((res) => {
		if (res) {
			throw redirect({
				to: "/login",
			});
		}
	});
};
