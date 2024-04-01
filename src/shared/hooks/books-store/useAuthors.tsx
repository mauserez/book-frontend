import {
	AuthorListItem,
	fetchAuthorList,
} from "../../api/books-store/fetchAuthorList";
import { useState, useEffect } from "react";

export const useAuthors = () => {
	const [authors, setAuthors] = useState<AuthorListItem[]>([]);

	useEffect(() => {
		const getAuthors = async () => {
			const ctg = await fetchAuthorList();
			setAuthors(ctg);
		};

		getAuthors();
	}, []);

	console.log(authors);

	return authors;
};
