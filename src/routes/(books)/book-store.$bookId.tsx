import { createFileRoute } from "@tanstack/react-router";
import { BookDetail } from "../../entities/books-store/book-detail/BookDetail";

export const Route = createFileRoute("/(books)/book-store/$bookId")({
	component: () => <Book />,
});

function Book() {
	const { bookId } = Route.useParams();
	return <BookDetail bookId={bookId} />;
}
