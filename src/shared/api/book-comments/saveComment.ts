import { notifyError, notifySuccess } from "./../../helpers/toast";
import { api } from "../../axios/api";
import { ResponseResult } from "../../types";

export type SaveCommentPayload = {
	id?: string;
	value: number;
	comment: string;
	book_id: string;
};

export const saveComment = async (payload: SaveCommentPayload) => {
	return await api
		.post<ResponseResult<string>>("/rating", payload)
		.then((res) => {
			const { success, result } = res.data;

			if (success) {
				notifySuccess("Комментарий добавлен");
			} else {
				notifyError(result);
			}

			return success;
		})
		.catch((e) => {
			console.log(e);
		});
};
