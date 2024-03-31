import { ReactNode } from "react";
import { Button } from "..";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { PageFilterProvider, usePageFilterForm } from "./PageFilterContext";
import { MdFilterAltOff } from "react-icons/md";

import s from "./PageFilter.module.css";
import qs from "query-string";

type PageFilterProps = {
	children: ReactNode;
	buttonText?: string;
	pagination?: boolean;
	defaultValues: { [key: string]: string };
	resetValues: { [key: string]: string | undefined };
};

export const PageFilter = (props: PageFilterProps) => {
	const router = useRouter();
	const routerState = useRouterState();
	const search = routerState.location.search;

	const { children, buttonText = "Поиск", defaultValues, resetValues } = props;
	const pathname = routerState.location.pathname;

	const form = usePageFilterForm({
		initialValues: defaultValues,
	});

	return (
		<div className={s.filter}>
			<h4>Фильтр для поиска</h4>
			<PageFilterProvider form={form}>
				<form
					className={s.form}
					onSubmit={form.onSubmit(() => {
						const newSearch = { ...form.values, page: 1 };
						if (JSON.stringify(newSearch) === JSON.stringify(search)) {
							location.search = qs.stringify(newSearch);
						}
						router.navigate({ to: pathname, search: newSearch });
					})}
				>
					<MdFilterAltOff
						style={{ alignSelf: "stretch", marginBottom: "-20px" }}
						fontSize={20}
						onClick={() => {
							console.log(resetValues);
							const newResetValues = {};
							for (const [key, value] of Object.entries(resetValues)) {
								newResetValues[key] = value === "[]" ? [] : value;
							}
							form.setValues(newResetValues);
						}}
					/>
					{children}
					<Button type="submit">{buttonText}</Button>
				</form>
			</PageFilterProvider>
		</div>
	);
};
