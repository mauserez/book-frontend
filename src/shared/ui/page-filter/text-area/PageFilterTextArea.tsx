import { usePageFilterContext } from "../PageFilterContext";
import { Textarea, TextareaProps } from "@mantine/core";
import clsx from "clsx";
import s from "./PageFilterTextArea.module.css";

type PageFilterTextAreaProps = TextareaProps & { width?: string };
export const PageFilterTextArea = (props: PageFilterTextAreaProps) => {
	const {
		placeholder = "Введите...",
		name = "test",
		className = "",
		width = "100%",
		...inputProps
	} = props;

	const form = usePageFilterContext();

	return (
		<Textarea
			rows={5}
			resize="vertical"
			{...form.getInputProps(name)}
			style={{ width: width }}
			name={name}
			className={clsx(s.input, className)}
			placeholder={placeholder}
			{...inputProps}
		/>
	);
};
