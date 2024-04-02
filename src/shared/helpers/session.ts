import { redirect } from "@tanstack/react-router";
import { Context } from "../../main";

export const checkToken = (context: Context) => {
	const exp = context.session.exp;
	const now = Math.floor(Date.now() / 1000);

	if (context.session.token && exp < now) {
		throw redirect({
			to: "/login",
		});
	}
};
