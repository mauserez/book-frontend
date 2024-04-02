import { Select as MSelect, SelectProps as MSelectProps } from "@mantine/core";

type SelectOption = {
	label: string;
	value: string;
};

type SelectProps = {
	options: SelectOption[];
	label?: string;
	name?: string;
} & MSelectProps;

export const Select = (props: SelectProps) => {
	const { label, name, options = [], placeholder, ...otherProps } = props;

	return (
		<MSelect
			label={label}
			placeholder={placeholder}
			data={options}
			name={name}
			{...otherProps}
		/>
	);
};
