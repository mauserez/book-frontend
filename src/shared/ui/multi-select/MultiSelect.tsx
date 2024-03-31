import {
	MultiSelect as MMultiSelect,
	MultiSelectProps as MMultiSelectProps,
} from "@mantine/core";
import { usePageFilterContext } from "../page-filter/PageFilterContext";
import clsx from "clsx";
import s from "./MultiSelect.module.css";

type SelectOption = {
	label: string;
	value: string;
};

type MultiSelectProps = {
	name: string;
	options: SelectOption[];
	width?: string;
	label?: string;
	fixedHeight?: boolean;
} & MMultiSelectProps;

export const MultiSelect = (props: MultiSelectProps) => {
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
			className={clsx({ [s.fixedHeight]: fixedHeight, className })}
			style={{ width: width }}
			data={options}
			name={name}
			{...otherProps}
			{...form.getInputProps(name)}
		/>
	);
};
