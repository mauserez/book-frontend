import { useRouterState } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useSessionStore } from "../../store/sessionStore";

import clsx from "clsx";
import s from "./Nav.module.css";

type MenuLink = {
	href: string;
	name: string;
	hidden: boolean;
};

export const Nav = () => {
	const { token } = useSessionStore((state) => state);
	const path = useRouterState();

	const links: MenuLink[] = [
		{ href: "/", name: "Главная", hidden: false },
		{ href: "/books-store", name: "Магазин", hidden: false },
		{ href: "/books-admin", name: "Админка", hidden: !token },
	];

	return (
		<nav className={s.nav}>
			{links.map((link) => {
				return link.hidden ? null : (
					<Link
						key={link.href}
						className={clsx({
							[s.navLink]: true,
							[s.navLinkActive]: link.href === path.location.pathname,
						})}
						to={link.href}
					>
						{link.name}
					</Link>
				);
			})}
		</nav>
	);
};
