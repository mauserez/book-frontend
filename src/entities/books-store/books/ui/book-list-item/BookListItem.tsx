import { BookRow } from "../../../../../widgets/books-store/types";
import { CurrencyIcon } from "../../../../currency";
import { ToggleFavorite } from "../../../../../features/favorite";
import { Link } from "@tanstack/react-router";

import { BookRating } from "../..";
import { Button } from "../../../../../shared/ui";
import s from "./BookListItem.module.css";

type BookListItemProps = { book: BookRow; admin: boolean };
export const BookListItem = (props: BookListItemProps) => {
	const { book, admin = false } = props;

	return (
		<div className={s.book}>
			<ToggleFavorite id={book.id} className={s.fav} />
			<Link
				className={s.bookContent}
				to="/book-store/$bookId"
				params={{ bookId: book.id }}
			>
				<div className={s.image}>Картинка книги</div>
				<div className={s.info}>
					<div className={s.price}>
						{book.price}
						&nbsp;
						<span className={s.acronym}>
							<CurrencyIcon acronym={book.currency.currency_acronym} />
						</span>
					</div>

					<div className={s.name}>{book.name}</div>

					<div>
						{book.book_authors.map((author) => {
							return (
								<div key={author.author_id} className={s.authors}>
									<span>
										{author.author.first_name} {author.author.last_name}
									</span>
								</div>
							);
						})}
					</div>
				</div>

				<BookRating className={s.rating} bookId={book.id} />
			</Link>
			{admin ? (
				<Button>
					<Link to="/book-admin/$bookId" params={{ bookId: book.id }}>
						Редактировать
					</Link>
				</Button>
			) : null}
		</div>
	);
};
