// /src/routes/index.tsx
import { useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../shared/axios/api";
import { ResponseResult } from "../../shared/types";
import { PageFilter } from "../page-filter/PageFilter";
import { Input } from "../../shared/ui/input/Input";
import { HashLoader } from "react-spinners";
import qs from "query-string";
import { BooksNotFound } from "../../entities/book-store/books";

import s from "./BooksStore.module.css";
import clsx from "clsx";

type BookRow = {
	id: string;
	name: string;
	price: number;
	language: string;
	description: string;
	currency_acronym: string;
	rating_count: number;
	rating_value: number | null;
};

export type FetchBooksResult = {
	books: BookRow[];
	bookCount: number;
	pageCount: number;
};

const fetchBooks = async (searchString: string) => {
	console.log(searchString);
	return api
		.get<ResponseResult<FetchBooksResult>>(`/books?${searchString}`)
		.then((res) => {
			const { success, result } = res.data;
			if (success) {
				return result;
			} else {
				return null;
			}
		})
		.catch((e) => {
			console.log(e);
			return null;
		});
};

type BooksSearchType = {
	priceFrom?: number | string;
	priceTo?: number | string;
	page: number;
	pagination?: boolean;
};

export const BooksStore = () => {
	const router = useRouter();
	const location = router.parseLocation();
	const search = location.search as BooksSearchType;

	const booksFetching = useQuery({
		queryKey: ["books-store", search],
		queryFn: (): Promise<FetchBooksResult | null> =>
			fetchBooks(qs.stringify(search)),
	});

	const { status, data: books } = booksFetching;

	const bookList = books ? books.books : [];
	const pageCount = books?.pageCount || 0;
	const bookCount = books?.bookCount || 0;

	return (
		<div>
			<PageFilter>
				<Input
					defaultValue={search.priceFrom || 0}
					placeholder="Цена от"
					name="priceFrom"
				/>
				<Input
					defaultValue={search.priceTo || 100000}
					placeholder="Цена до"
					name="priceTo"
				/>
			</PageFilter>

			{!bookList.length && status !== "pending" ? (
				<BooksNotFound />
			) : status === "pending" ? (
				<div className={s.loader}>
					<HashLoader color="#869c81" size={24} />
				</div>
			) : (
				<div>
					<div className={s.pagination}>
						{[...Array(pageCount)].map((x, i) => {
							const pageNum = i + 1;
							const search = location.search as { page: number };

							console.log(search.page);

							return (
								<div
									key={i}
									onClick={() => {
										const navigateSearch = {
											...location.search,
											page: pageNum,
										};

										router.navigate({
											to: location.pathname,
											search: navigateSearch,
											replace: true,
										});
									}}
									className={clsx({
										[s.paginate]: true,
										[s.paginateActive]: (search.page || 1) === pageNum,
									})}
								>
									{i + 1}
								</div>
							);
						})}
					</div>

					<div>Всего книг: {bookCount}</div>
					<div>Всего страниц: {pageCount}</div>
					<div>Текущая страница: {search.page}</div>
					<div>
						{bookList?.map((book) => {
							return (
								<div key={book.id}>
									<span>{book.id}</span>
									<span>{book.price}</span>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};
