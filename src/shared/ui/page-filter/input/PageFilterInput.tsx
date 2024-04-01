import { usePageFilterContext } from "../PageFilterContext";
import { TextInput, TextInputProps } from "@mantine/core";
import clsx from "clsx";
import s from "./PageFilterInput.module.css";

type PageFilterInputProps = TextInputProps;
export const PageFilterInput = (props: PageFilterInputProps) => {
	const {
		placeholder = "Введите",
		name = "test",
		className = "",
		width,
		...inputProps
	} = props;

	const form = usePageFilterContext();

	return (
		<TextInput
			{...form.getInputProps(name)}
			style={{ width: width }}
			name={name}
			className={clsx(s.input, className)}
			placeholder={placeholder}
			{...inputProps}
		/>
	);
};
