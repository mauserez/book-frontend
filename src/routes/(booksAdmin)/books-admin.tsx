// /src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { BooksAdmin } from "../../widgets/books-admin/BooksAdmin";
import { checkToken } from "../../shared/helpers/session";

export const Route = createFileRoute("/(booksAdmin)/books-admin")({
	beforeLoad: async ({ context }) => {
		await checkToken(context);
	},
	component: BooksAdmin,
});
