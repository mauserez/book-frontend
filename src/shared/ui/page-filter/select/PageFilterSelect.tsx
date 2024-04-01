import { Select as MSelect, SelectProps as MSelectProps } from "@mantine/core";
import { usePageFilterContext } from "../PageFilterContext";

type PageFilterSelectOption = {
	label: string;
	value: string;
};

type PageFilterSelectProps = {
	label: string;
	name: string;
	options: PageFilterSelectOption[];
} & MSelectProps;

export const PageFilterSelect = (props: PageFilterSelectProps) => {
	const { label, name, options = [], placeholder, ...otherProps } = props;
	const form = usePageFilterContext();

	return (
		<MSelect
			{...form.getInputProps(name)}
			label={label}
			placeholder={placeholder}
			data={options}
			name={name}
			{...otherProps}
		/>
	);
};
