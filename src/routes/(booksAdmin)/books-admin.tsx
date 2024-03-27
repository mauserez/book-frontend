// /src/routes/index.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
	return axios
		.get("https://jsonplaceholder.typicode.com/posts")
		.then((r) => r.data.slice(0, 10));
};

const postsQueryOptions = queryOptions({
	queryKey: ["posts"],
	queryFn: () => fetchPosts(),
});

export const Route = createFileRoute("/(booksAdmin)/books-admin")({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(postsQueryOptions),
	beforeLoad: ({ context, location }) => {
		if (!context.session.token) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: BooksAdmin,
});

function BooksAdmin() {
	const posts = Route.useLoaderData();
	console.log(posts);
	return <div>Admin panel</div>;
}
