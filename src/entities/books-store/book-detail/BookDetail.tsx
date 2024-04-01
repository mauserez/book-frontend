import { BooksLoader } from "../books";
import { CurrencyIcon } from "../../currency";
import { Button } from "../../../shared/ui";

import {
	useBook,
	useCategories,
	useAuthors,
} from "../../../shared/hooks/books-store";

import s from "./BookDetail.module.css";
import { useRouter } from "@tanstack/react-router";

type BooksDetailProps = {
	bookId: string;
};

export const BookDetail = (props: BooksDetailProps) => {
	const router = useRouter();
	const { bookId } = props;

	const categories = useCategories();
	const authors = useAuthors();
	const bookData = useBook(bookId);

	const { status, data: book } = bookData;

	return (
		<div className={s.container}>
			<Button
				className={s.back}
				onClick={() => {
					router.history.back();
				}}
			>
				Назад
			</Button>
			{!book && status !== "pending" ? (
				<div>Книга не найдена</div>
			) : status === "pending" ? (
				<BooksLoader />
			) : (
				<div className={s.book}>
					<div className={s.main}>
						<div className={s.image}>Картинка книги</div>
						<div className={s.info}>
							<div className={s.name}>{book?.name}</div>
							<div className={s.authors}>
								{book?.book_authors.map((author) => {
									return (
										<div className={s.author}>
											<span>{author.author.first_name}</span>
											<span>{author.author.last_name}</span>
										</div>
									);
								})}
							</div>
							<div className={s.description}>{book?.description}</div>
							<div className={s.price}>
								{book?.price}
								<CurrencyIcon
									size={32}
									acronym={book?.currency.currency_acronym || "RUR"}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
