import { useQuery } from "@tanstack/react-query";
import { BookRow } from "../../../widgets/books-store/types";
import { apiFetch } from "../../axios/api";

export type FetchBooksResult = BookRow[];

export const useMyBooks = () => {
	const booksFetching = useQuery({
		queryKey: ["my-books"],
		queryFn: (): Promise<FetchBooksResult | null> => apiFetch(`/user-books`),
	});

	return booksFetching;
};
