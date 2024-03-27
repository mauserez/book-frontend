import { Link } from "@tanstack/react-router";
import { Nav } from "../nav/Nav";
import { UserNav } from "../user-nav/UserNav";

import s from "./Header.module.css";

export const Header = () => {
	return (
		<header className={s.header}>
			<div className={s.logo}>
				<Link to="/">Book Store</Link>
			</div>
			<Nav />
			<UserNav />
		</header>
	);
};
