// /src/routes/index.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { MyBooks } from "../../widgets/my-books/MyBooks";

export const Route = createFileRoute("/(user)/my-books")({
	beforeLoad: ({ context, location }) => {
		if (!context.session.token) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: UserBooks,
});

function UserBooks() {
	return <MyBooks />;
}
