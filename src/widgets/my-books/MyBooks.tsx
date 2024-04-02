import { BooksLoader, BookList } from "../../entities/books-store/books";
import { MyBooksNotFound } from "../../entities/my-books/not-found/NotFound";

import s from "./MyBooks.module.css";
import { useMyBooks } from "../../shared/hooks/my-books/useMyBooks";

export const MyBooks = () => {
	const useBooksData = useMyBooks();

	const { status, data: books } = useBooksData;
	const bookList = books ? books : [];

	return (
		<div className={s.store}>
			{!bookList.length && status !== "pending" ? (
				<MyBooksNotFound />
			) : status === "pending" ? (
				<BooksLoader />
			) : (
				<div className={s.storeItems}>
					<BookList bookList={bookList} />
				</div>
			)}
		</div>
	);
};
