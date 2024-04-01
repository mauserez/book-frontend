import {
	MultiSelect as MMultiSelect,
	MultiSelectProps as MMultiSelectProps,
} from "@mantine/core";
import { usePageFilterContext } from "../PageFilterContext";
import clsx from "clsx";
import s from "./PageFilterMultiSelect.module.css";

type PageFilterSelectOption = {
	label: string;
	value: string;
};

type PageFilterMultiSelectProps = {
	name: string;
	options: PageFilterSelectOption[];
	width?: string;
	label?: string;
	fixedHeight?: boolean;
} & MMultiSelectProps;

export const PageFilterMultiSelect = (props: PageFilterMultiSelectProps) => {
	const {
		name,
		options = [],
		className = "",
		fixedHeight = true,
		width = "120px",
		...otherProps
	} = props;

	const form = usePageFilterContext();

	return (
		<MMultiSelect
			{...form.getInputProps(name)}
			className={clsx({ [s.fixedHeight]: fixedHeight, className })}
			style={{ width: width }}
			data={options}
			name={name}
			{...otherProps}
		/>
	);
};
