import { AuthorsSavePayload } from "../../../entities/books-admin/references/author/Form";
import { api } from "../../axios/api";
import { notifyError, notifySuccess } from "../../helpers/toast";
import { ResponseResult } from "../../types";

export const saveAuthors = async (payload: AuthorsSavePayload) => {
	await api
		.post<ResponseResult<string>>("/authors", payload)
		.then((res) => {
			const { success, result } = res.data;

			if (success) {
				notifySuccess("Список авторов успешно изменен");
			} else {
				notifyError(`Error.${result}`);
			}
		})
		.catch(() => {
			notifyError("Ошибка приложения.Обратитесь в поддержку");
		});
};
