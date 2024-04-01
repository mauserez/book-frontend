import { api } from "../../axios/api";
import { ResponseResult } from "../../types";
import { notifyError } from "../../helpers/toast";

export type Author = {
	id: string;
	first_name: string;
	last_name: string;
};

export type AuthorListItem = {
	label: string;
	value: string;
};

export const fetchAuthorList = async (): Promise<AuthorListItem[]> => {
	return await api
		.get<ResponseResult<Author[]>>("/authors")
		.then((res) => {
			const { success, result } = res.data;
			if (success) {
				const authorList = result.map((author) => {
					return {
						label: `${author.first_name} ${author.last_name}`,
						value: author.id,
					};
				});
				return authorList;
			}
			return [];
		})
		.catch((e) => {
			notifyError(e);
			return [];
		});
};
