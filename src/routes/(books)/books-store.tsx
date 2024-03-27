// /src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { BooksStore } from "../../widgets/books-store/BooksStore";

export const Route = createFileRoute("/(books)/books-store")({
	component: BooksStore,
});
