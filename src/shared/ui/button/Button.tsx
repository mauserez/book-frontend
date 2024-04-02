import { ComponentProps } from "react";
import clsx from "clsx";
import s from "./Button.module.css";

export type ButtonProps = ComponentProps<"button"> & { width?: string };
export const Button = (props: ButtonProps) => {
	const { children = "Отправить", width, className = "", ...btnProps } = props;

	return (
		<button
			style={{ width: width }}
			className={clsx(s.button, className)}
			{...btnProps}
		>
			{children}
		</button>
	);
};
