import { useRouter } from "@tanstack/react-router";

import {
	BooksLoader,
	BooksNotFound,
	BookListHeader,
	BookList,
} from "../../entities/book-store/books";

import {
	PageFilter,
	PagePagination,
	Input,
	MultiSelect,
} from "../../shared/ui";

import { BooksSearchType } from "./types";
import { useBooks } from "./hooks/useBooks";
import { useCategories } from "./hooks/useCategories";

import s from "./BooksStore.module.css";

export const BooksStore = () => {
	const categories = useCategories();
	const useBooksData = useBooks();

	const router = useRouter();
	const search = router.parseLocation().search as BooksSearchType;
	const { status, data: books } = useBooksData;

	const bookList = books ? books.books : [];
	const pageCount = books?.pageCount || 0;
	const bookCount = books?.bookCount;

	const resetVales = {
		priceFrom: "0",
		priceTo: "100000",
		category: "[]",
	};

	const defaultValues = {
		priceFrom: search.priceFrom || "0",
		priceTo: search.priceTo || "100000",
		category: search.category,
	};

	return (
		<div className={s.store}>
			<PageFilter
				resetValues={resetVales}
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
			</PageFilter>

			{!bookList.length && status !== "pending" ? (
				<BooksNotFound />
			) : status === "pending" ? (
				<BooksLoader />
			) : (
				<div className={s.storeItems}>
					<BookListHeader pageCount={pageCount} bookCount={bookCount} />
					<BookList bookList={bookList} />
				</div>
			)}
			<PagePagination pageCount={pageCount} />
		</div>
	);
};
