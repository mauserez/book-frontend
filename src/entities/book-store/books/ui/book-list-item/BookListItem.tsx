import { BookRow } from "../../../../../widgets/books-store/types";
import { CurrencyIcon } from "../../../../currency";
import { ToggleFavorite } from "../../../../../features/favorite";

import { BookRating } from "../..";
import s from "./BookListItem.module.css";

type BookListItemProps = { book: BookRow };
export const BookListItem = (props: BookListItemProps) => {
	const { book } = props;

	return (
		<div className={s.book}>
			<div className={s.image}>
				Картинка книги
				<ToggleFavorite id={book.id} className={s.fav} />
			</div>
			<div className={s.price}>
				{book.price}
				&nbsp;
				<span className={s.acronym}>
					<CurrencyIcon acronym={book.currency_acronym} />
				</span>
			</div>
			<div className={s.name}>{book.name}</div>
			<BookRating bookId={book.id} />
		</div>
	);
};
