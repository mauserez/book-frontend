import { TextInput, TextInputProps } from "@mantine/core";
import clsx from "clsx";
import s from "./Input.module.css";

type InputProps = TextInputProps;
export const Input = (props: InputProps) => {
	const {
		placeholder = "Введите",
		name = "test",
		className = "",
		width,
		...inputProps
	} = props;

	return (
		<TextInput
			autoComplete="off"
			style={{ width: width }}
			name={name}
			className={clsx(s.input, className)}
			placeholder={placeholder}
			{...inputProps}
		/>
	);
};
