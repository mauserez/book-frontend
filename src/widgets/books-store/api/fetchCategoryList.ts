import { api } from "../../../shared/axios/api";
import { ResponseResult } from "../../../shared/types";
import { notifyError } from "../../../shared/helpers/toast";

export type Category = {
	id: string;
	name: string;
};

export type CategoryListItem = {
	label: string;
	value: string;
};

export const fetchCategoryList = async (): Promise<CategoryListItem[]> => {
	return await api
		.get<ResponseResult<Category[]>>("/categories")
		.then((res) => {
			const { success, result } = res.data;
			if (success) {
				const categoryList = result.map((category) => {
					return { label: category.name, value: category.id };
				});
				return categoryList;
			}
			return [];
		})
		.catch((e) => {
			notifyError(e);
			return [];
		});
};
