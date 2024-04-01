import { BookRow } from "../../../../../widgets/books-store/types";
import { BookListItem } from "../..";
import s from "./BookList.module.css";

export type BookListProps = {
	admin?: boolean;
	bookList: BookRow[];
};

export const BookList = (props: BookListProps) => {
	const { bookList = [], admin = false } = props;

	return (
		<div className={s.bookList}>
			{bookList.map((book) => {
				return <BookListItem admin={admin} key={book.id} book={book} />;
			})}
		</div>
	);
};
