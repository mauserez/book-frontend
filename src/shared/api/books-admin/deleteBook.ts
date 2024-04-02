import { api } from "../../axios/api";
import { notifyError, notifySuccess } from "../../helpers/toast";
import { ResponseResult } from "../../types";

export const deleteBook = async (bookId: string) => {
	await api.delete<ResponseResult<string>>(`/book/${bookId}`).then((res) => {
		const { success, result } = res.data;
		if (success) {
			notifySuccess("Книга успешно удалена");
		} else {
			notifyError(`Error.${result}`);
		}
	});
};
