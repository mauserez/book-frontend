import { Link } from "@tanstack/react-router";
import { useRouterState } from "@tanstack/react-router";
import { useSessionStore } from "../../store/sessionStore";
import { GoHeartFill } from "react-icons/go";

import clsx from "clsx";
import navStyle from "../nav/Nav.module.css";
import s from "./UserNav.module.css";

export const UserNav = () => {
	const path = useRouterState();
	const { token, reset } = useSessionStore((state) => state);

	return (
		<div className={s.myLinks}>
			{token ? (
				<>
					<Link
						className={clsx({
							[s.fav]: true,
							[s.favActive]: "/my-books" === path.location.pathname,
						})}
						to="/user-books"
					>
						<GoHeartFill fontSize={26} />
					</Link>
					<Link
						onClick={() => {
							reset();
							location.href = "/";
						}}
						className={navStyle.navLink}
					>
						Выйти
					</Link>
				</>
			) : (
				<Link
					to="/login"
					className={clsx({
						[navStyle.navLink]: true,
						[navStyle.navLinkActive]: "/login" === path.location.pathname,
					})}
				>
					Войти
				</Link>
			)}
		</div>
	);
};
