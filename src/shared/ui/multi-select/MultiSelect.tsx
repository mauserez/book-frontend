import {
	MultiSelect as MMultiSelect,
	MultiSelectProps as MMultiSelectProps,
} from "@mantine/core";
import clsx from "clsx";
import s from "./MultiSelect.module.css";

type SelectOption = {
	label: string;
	value: string;
};

type MultiSelectProps = {
	options: SelectOption[];
	name?: string;
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

	return (
		<MMultiSelect
			className={clsx({ [s.fixedHeight]: fixedHeight, className })}
			style={{ width: width }}
			data={options}
			name={name}
			{...otherProps}
		/>
	);
};
