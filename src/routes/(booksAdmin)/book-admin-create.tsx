import { createFileRoute } from "@tanstack/react-router";
import { BookForm } from "../../entities/books-admin/book-form/BookForm";
import { checkToken } from "../../shared/helpers/session";

export const Route = createFileRoute("/(booksAdmin)/book-admin-create")({
	beforeLoad: ({ context }) => {
		checkToken(context);
	},
	component: () => <Book />,
});

function Book() {
	return <BookForm book={null} />;
}
