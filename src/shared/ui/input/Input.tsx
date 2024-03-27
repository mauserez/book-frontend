import { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";

import clsx from "clsx";
import s from "./Input.module.css";

type InputProps = ComponentProps<"input">;
export const Input = (props: InputProps) => {
	const {
		placeholder = "Введите",
		name = "test",
		className = "",
		...inputProps
	} = props;
	const { register } = useFormContext();
	return (
		<input
			{...register(name)}
			name={name}
			className={clsx(s.input, className)}
			placeholder={placeholder}
			{...inputProps}
		/>
	);
};
