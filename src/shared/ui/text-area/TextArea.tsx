import { Textarea, TextareaProps } from "@mantine/core";
import clsx from "clsx";
import s from "./TextArea.module.css";

type TextAreaProps = TextareaProps & { width?: string };
export const TextArea = (props: TextAreaProps) => {
	const {
		placeholder = "Введите...",
		name = "test",
		className = "",
		width = "100%",
		...inputProps
	} = props;

	return (
		<Textarea
			rows={5}
			resize="vertical"
			style={{ width: width }}
			name={name}
			className={clsx(s.input, className)}
			placeholder={placeholder}
			{...inputProps}
		/>
	);
};
