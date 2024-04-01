import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(books)/book-store/$bookId")({
	component: () => <div>Hello /(booksAdmin)/books-admin/$bookId!</div>,
});
