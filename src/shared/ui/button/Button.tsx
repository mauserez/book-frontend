import { ComponentProps } from "react";
import clsx from "clsx";
import s from "./Button.module.css";

export type ButtonProps = ComponentProps<"button">;
export const Button = (props: ButtonProps) => {
	const { children = "Отправить", className = "", ...btnProps } = props;

	return (
		<button className={clsx(s.button, className)} {...btnProps}>
			{children}
		</button>
	);
};
