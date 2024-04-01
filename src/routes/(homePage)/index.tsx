// /src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import s from "./index.module.css";

export const Route = createFileRoute("/(homePage)/")({
	component: Home,
});

function Home() {
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
