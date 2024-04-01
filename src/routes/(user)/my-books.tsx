// /src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { MyBooks } from "../../widgets/my-books/MyBooks";
import { checkToken } from "../../shared/helpers/session";

export const Route = createFileRoute("/(user)/my-books")({
	beforeLoad: ({ context }) => {
		checkToken(context);
	},
	component: UserBooks,
});

function UserBooks() {
	return <MyBooks />;
}
