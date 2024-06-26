import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { SessionStoreState } from "../store/sessionStore";
import { Toaster } from "react-hot-toast";

import { MantineProvider } from "@mantine/core";
import { Header } from "../widgets/header/Header";
import s from "./__root.module.css";

const TanStackRouterDevtools =
	import.meta.env.NODE_ENV === "production"
		? () => null
		: lazy(() =>
				import("@tanstack/router-devtools").then((res) => ({
					default: res.TanStackRouterDevtools,
				}))
			);

const ReactQueryDevtools =
	import.meta.env.NODE_ENV === "production"
		? () => null
		: lazy(() =>
				import("@tanstack/react-query-devtools").then((res) => ({
					default: res.ReactQueryDevtools,
				}))
			);

type RouterContext = {
	session: SessionStoreState;
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
});

function RootComponent() {
	return (
		<MantineProvider>
			<section className={s.layout}>
				<Header />
				<main className={s.main}>
					<Outlet />
				</main>
				<Suspense>
					<ReactQueryDevtools buttonPosition="top-right" />
				</Suspense>
				<Suspense>
					<TanStackRouterDevtools position="bottom-right" />
				</Suspense>
				<Toaster />
			</section>
		</MantineProvider>
	);
}
