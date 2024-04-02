import { notifySuccess } from "./../../helpers/toast";
import { api } from "../../axios/api";
import { ResponseResult } from "../../types";

export const deleteComment = async (id: string) => {
	return await api
		.delete<ResponseResult<string>>(`/rating/${id}`)
		.then((res) => {
			const { success, result } = res.data;
			if (success) {
				notifySuccess("Комментарий успешно удален");
			} else {
				console.log(result);
			}
			return success;
		})
		.catch((e) => {
			console.log(e);
		});
};
