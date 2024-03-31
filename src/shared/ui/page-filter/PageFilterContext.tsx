import { createFormContext } from "@mantine/form";

interface PageFilterValues {
	[key: string]: string;
}

// You can give context variables any name
export const [PageFilterProvider, usePageFilterContext, usePageFilterForm] =
	createFormContext<PageFilterValues>();
