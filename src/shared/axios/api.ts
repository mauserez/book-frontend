import axios from "axios";
import { useSessionStore } from "../../store/sessionStore";
import { ResponseResult } from "../types";
import { notifyError } from "../helpers/toast";

export const api = axios.create({
	baseURL: "http://localhost:5001/api/v1/",
	//baseURL: "https://book-backend-api.vercel.app/api/v1/",
	timeout: 10000,
});

api.interceptors.request.use(
	function (config) {
		const token = useSessionStore.getState().token;
		config.headers["Authorization"] = `Bearer ${token}`;
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export const apiFetchSearch = async <T>(
	endpoint: string,
	searchString?: string
) => {
	return await api
		.get<ResponseResult<T>>(`${endpoint}?${searchString}`)
		.then((res) => {
			const { success, result } = res.data;
			if (success) {
				return result;
			} else {
				notifyError(result as string);
				return null;
			}
		})
		.catch((e) => {
			console.log(e);
			return null;
		});
};

export const apiFetch = async <T>(endpoint: string) => {
	return await api
		.get<ResponseResult<T>>(`${endpoint}`)
		.then((res) => {
			const { success, result } = res.data;
			if (success) {
				return result;
			} else {
				notifyError(result as string);
				return null;
			}
		})
		.catch((e) => {
			console.log(e);
			return null;
		});
};
