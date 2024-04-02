import { CategoriesSavePayload } from "./../../../entities/books-admin/references/category/Form";
import { api } from "../../axios/api";
import { notifyError, notifySuccess } from "../../helpers/toast";
import { ResponseResult } from "../../types";

export const saveCategories = async (payload: CategoriesSavePayload) => {
	await api
		.post<ResponseResult<string>>("/categories", payload)
		.then((res) => {
			const { success, result } = res.data;

			if (success) {
				notifySuccess("Список категорий успешно изменен");
			} else {
				notifyError(`Error.${result}`);
			}
		})
		.catch(() => {
			notifyError("Ошибка приложения.Обратитесь в поддержку");
		});
};
