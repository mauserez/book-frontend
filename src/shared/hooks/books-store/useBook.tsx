import { useQuery } from "@tanstack/react-query";
import { BookRow } from "../../../widgets/books-store/types";
import { apiFetch } from "../../axios/api";

export type BookResult = BookRow;

export const useBook = (bookId: string) => {
	const book = useQuery({
		queryKey: ["books-store", bookId],
		queryFn: (): Promise<BookResult | null> => apiFetch(`/book/${bookId}`),
	});

	return book;
};
