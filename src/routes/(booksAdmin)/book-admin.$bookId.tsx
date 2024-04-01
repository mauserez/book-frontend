import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(booksAdmin)/book-admin/$bookId")({
	component: () => <div>Hello /(booksAdmin)/book-admin/$bookId!</div>,
});
