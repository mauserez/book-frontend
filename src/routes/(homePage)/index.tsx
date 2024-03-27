// /src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import s from "./index.module.css";

const fetchPosts = async () => {
	return axios
		.get("https://jsonplaceholder.typicode.com/posts")
		.then((r) => r.data.slice(0, 10));
};

const postsQueryOptions = queryOptions({
	queryKey: ["posts"],
	queryFn: () => fetchPosts(),
});

export const Route = createFileRoute("/(homePage)/")({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(postsQueryOptions),
	component: Home,
});

function Home() {
	const posts = Route.useLoaderData();
	console.log(posts);
	return (
		<div className={s.info}>
			<h1>Добро пожаловать в книжный магазин!</h1>
			<div className={s.infoRows}>
				<p>Это OpenSource магазин, в котором каждый может добавлять книги.</p>
				<p>Редактировать их и удалять.</p>
				<p>Достаточно только зарегистрироваться или войти.</p>
			</div>
		</div>
	);
}
