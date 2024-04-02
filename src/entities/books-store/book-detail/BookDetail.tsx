import { BookRating, BooksLoader } from "../books";
import { CurrencyIcon } from "../../currency";
import { ButtonBack } from "../../../shared/ui";

import { useBook } from "../../../shared/hooks/books-store";

import { BookComments } from "../book-comments/BookComments";
import { useState } from "react";

import s from "./BookDetail.module.css";

type BooksDetailProps = {
	bookId: string;
};

export const BookDetail = (props: BooksDetailProps) => {
	const { bookId } = props;

	const bookData = useBook(bookId);
	const { status, data: book } = bookData;
	const [ratingState, setRatingState] = useState(false);

	return (
		<div className={s.container}>
			<ButtonBack />
			{!book && status !== "pending" ? (
				<div>Книга не найдена</div>
			) : status === "pending" ? (
				<BooksLoader />
			) : (
				<div className={s.container}>
					<div className={s.main}>
						<div className={s.image}>Картинка книги</div>
						<div className={s.info}>
							<div className={s.name}>{book?.name}</div>

							<div>
								<div className={s.subTitle}>Авторы</div>
								<div className={s.authors}>
									{book?.book_authors.map((author) => {
										return (
											<div key={author.author_id} className={s.author}>
												<span>{author.author.first_name}</span>
												<span>{author.author.last_name}</span>
											</div>
										);
									})}
								</div>
							</div>

							<div>
								<div className={s.subTitle}>Категории</div>
								<div className={s.categories}>
									{book?.book_categories.map((category) => {
										return (
											<div key={category.category_id} className={s.category}>
												<span>{category.category.name}</span>
											</div>
										);
									})}
								</div>
							</div>

							<div className={s.description}>{book?.description}</div>

							<div className={s.price}>
								{book?.price}
								<CurrencyIcon
									size={32}
									acronym={book?.currency.currency_acronym || "RUR"}
								/>
							</div>
							{book?.id ? (
								<BookRating sideEffect={ratingState} bookId={book.id} />
							) : null}
						</div>
					</div>
					{book?.id ? (
						<BookComments
							toggleRatingState={() => {
								setRatingState(!ratingState);
							}}
							bookId={book.id}
						/>
					) : null}
				</div>
			)}
		</div>
	);
};
