import { useRouter } from "@tanstack/react-router";

import {
	BooksLoader,
	BooksNotFound,
	BookListHeader,
	BookList,
} from "../../entities/books-store/books";

import {
	PageFilter,
	PagePagination,
	Input,
	MultiSelect,
} from "../../shared/ui";

import { BooksSearchType } from "./types";

import {
	useBooks,
	useCategories,
	useAuthors,
} from "../../shared/hooks/books-store";

import s from "./BooksStore.module.css";

type BooksStoreProps = {
	admin?: boolean;
};
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
			<PageFilter
				resetValues={resetValues}
				pagination={true}
				defaultValues={defaultValues}
			>
				<Input
					width="100px"
					label="Цена от"
					placeholder="Цена от"
					name="priceFrom"
				/>
				<Input
					width="100px"
					label="Цена до"
					placeholder="Цена до"
					name="priceTo"
				/>
				<MultiSelect
					width="160px"
					label="Категория"
					name="category"
					placeholder="Категория"
					options={categories}
				/>
				<MultiSelect
					width="160px"
					label="Автор"
					name="author"
					placeholder="Автор"
					options={authors}
				/>
			</PageFilter>

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
