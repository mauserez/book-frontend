import { BookRow } from "../../../../../widgets/books-store/types";
import { BookListItem } from "../..";

import s from "./BookList.module.css";

export type BookListProps = {
	bookList: BookRow[];
};

export const BookList = (props: BookListProps) => {
	const { bookList = [] } = props;

	return (
		<div className={s.bookList}>
			{bookList.map((book) => {
				return <BookListItem key={book.id} book={book} />;
			})}
		</div>
	);
};
