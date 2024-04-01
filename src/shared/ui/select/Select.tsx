import { Select as MSelect, SelectProps as MSelectProps } from "@mantine/core";

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
