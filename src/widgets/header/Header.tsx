import { Link } from "@tanstack/react-router";
import { Nav } from "../nav/Nav";
import { UserNav } from "../user-nav/UserNav";

import s from "./Header.module.css";

export const Header = () => {
	return (
		<header className={s.header}>
			<Link className={s.logo} to="/">
				Book Store
			</Link>
			<Nav />
			<UserNav />
		</header>
	);
};
