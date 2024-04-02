import { createFileRoute } from "@tanstack/react-router";
import { BookForm } from "../../entities/books-admin/book-form/BookForm";
import { useBook } from "../../shared/hooks/books-store";
import { BooksLoader } from "../../entities/books-store/books";
import { checkToken } from "../../shared/helpers/session";

export const Route = createFileRoute("/(booksAdmin)/book-admin/$bookId")({
	beforeLoad: ({ context }) => {
		checkToken(context);
	},
	component: () => <Book />,
});

function Book() {
	const { bookId } = Route.useParams();
	const { status, data: book } = useBook(bookId);

	if (status === "pending") {
		return <BooksLoader />;
	}

	return <BookForm book={book} />;
}
