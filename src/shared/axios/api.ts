import axios from "axios";
import { useSessionStore } from "../../store/sessionStore";

export const api = axios.create({
	baseURL: "http://localhost:5001/api/v1/",
	//baseURL: "https://book-backend-api.vercel.app/api/v1/",
	timeout: 1000,
});

api.interceptors.request.use(
	function (config) {
		console.log(4444);
		console.log(useSessionStore.getState());
		const token = useSessionStore.getState().token;
		console.log(token);
		config.headers["Authorization"] = `Bearer ${token}`;
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);
