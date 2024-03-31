import { useQuery } from "@tanstack/react-query";
import { BooksSearchType, BookRow } from "../../../widgets/books-store/types";
import { useRouter } from "@tanstack/react-router";
import { apiFetcher } from "../../axios/api";
import qs from "query-string";

export type FetchBooksResult = {
	books: BookRow[];
	bookCount: number;
	pageCount: number;
};

export const useBooks = () => {
	const router = useRouter();
	const search = router.parseLocation().search as BooksSearchType;
	const booksFetching = useQuery({
		queryKey: ["books-store", search],
		queryFn: (): Promise<FetchBooksResult | null> =>
			apiFetcher(`/books`, qs.stringify(search)),
	});

	return booksFetching;
};
