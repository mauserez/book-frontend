import { Link, useRouter } from "@tanstack/react-router";

import {
	BooksLoader,
	BooksNotFound,
	BookListHeader,
	BookList,
} from "../../entities/books-store/books";

import { PagePagination, Button } from "../../shared/ui";

import { BooksSearchType } from "./types";

import {
	useBooks,
	useCategories,
	useAuthors,
} from "../../shared/hooks/books-store";

import {
	PageFilterInput,
	PageFilter,
	PageFilterMultiSelect,
} from "../../shared/ui/page-filter";

type BooksStoreProps = {
	admin?: boolean;
};

import s from "./BooksStore.module.css";

export const BooksStore = (props: BooksStoreProps) => {
	const { admin = false } = props;

	const categories = useCategories();
	const authors = useAuthors();
	const useBooksData = useBooks();

	const router = useRouter();
	const search = router.parseLocation().search as BooksSearchType;
	const { status, data: books } = useBooksData;

	const bookList = books ? books.books : [];
	const pageCount = books?.pageCount || 0;
	const bookCount = books?.bookCount;

	const resetValues = {
		priceFrom: "0",
		priceTo: "100000",
		category: "[]",
		author: "[]",
	};

	const defaultValues = {
		priceFrom: search.priceFrom || "0",
		priceTo: search.priceTo || "100000",
		category: search.category,
		author: search.author,
	};

	return (
		<div className={s.store}>
			<div className={s.filter}>
				<PageFilter
					resetValues={resetValues}
					pagination={true}
					defaultValues={defaultValues}
				>
					<PageFilterInput
						width="100px"
						label="Цена от"
						placeholder="Цена от"
						name="priceFrom"
					/>
					<PageFilterInput
						width="100px"
						label="Цена до"
						placeholder="Цена до"
						name="priceTo"
					/>
					<PageFilterMultiSelect
						width="160px"
						label="Категория"
						name="category"
						placeholder="Категория"
						options={categories}
					/>
					<PageFilterMultiSelect
						width="160px"
						label="Автор"
						name="author"
						placeholder="Автор"
						options={authors}
					/>
				</PageFilter>
				{admin ? (
					<Button>
						<Link to="/book-admin-create">Добавить книгу</Link>
					</Button>
				) : null}
			</div>

			{!bookList.length && status !== "pending" ? (
				<BooksNotFound />
			) : status === "pending" ? (
				<BooksLoader />
			) : (
				<div className={s.storeItems}>
					<BookListHeader pageCount={pageCount} bookCount={bookCount} />
					<BookList admin={admin} bookList={bookList} />
				</div>
			)}
			<PagePagination pageCount={pageCount} />
		</div>
	);
};
