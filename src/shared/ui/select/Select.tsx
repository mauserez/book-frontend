import {
	Select as MSelect,
	SelectProps as MSelectProps,
	MantineProvider,
} from "@mantine/core";
import { usePageFilterContext } from "../page-filter/PageFilterContext";

type SelectOption = {
	label: string;
	value: string;
};

type SelectProps = {
	label: string;
	name: string;
	options: SelectOption[];
} & MSelectProps;

export const Select = (props: SelectProps) => {
	const { label, name, options = [], placeholder, ...otherProps } = props;
	const form = usePageFilterContext();

	return (
		<MSelect
			label={label}
			placeholder={placeholder}
			data={options}
			name={name}
			{...otherProps}
			{...form.getInputProps(name)}
		/>
	);
};
