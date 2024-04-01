import {
	BooksLoader,
	BooksNotFound,
	BookList,
} from "../../entities/books-store/books";

import s from "./MyBooks.module.css";
import { useMyBooks } from "../../shared/hooks/my-books/useMyBooks";

export const MyBooks = () => {
	const useBooksData = useMyBooks();

	const { status, data: books } = useBooksData;
	const bookList = books ? books : [];

	return (
		<div className={s.store}>
			{!bookList.length && status !== "pending" ? (
				<BooksNotFound />
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
