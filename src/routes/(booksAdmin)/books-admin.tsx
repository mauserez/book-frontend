// /src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { BooksAdmin } from "../../widgets/books-admin/BooksAdmin";

export const Route = createFileRoute("/(booksAdmin)/books-admin")({
	component: BooksAdmin,
});
