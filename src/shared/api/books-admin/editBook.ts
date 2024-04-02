import { BookSavePayload } from "../../../entities/books-admin/book-form/BookForm";
import { api } from "../../axios/api";
import { notifyError, notifySuccess } from "../../helpers/toast";
import { ResponseResult } from "../../types";

export const editBook = async (payload: BookSavePayload) => {
	await api.patch<ResponseResult<string>>("/book", payload).then((res) => {
		const { success, result } = res.data;
		if (success) {
			notifySuccess("Книга успешно изменена");
		} else {
			notifyError(`Error.${result}`);
		}
	});
};
