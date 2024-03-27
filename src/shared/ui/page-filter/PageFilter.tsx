import { ReactNode } from "react";
import { Button } from "../../shared/ui/button/Button";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { MdFilterAltOff } from "react-icons/md";

import s from "./PageFilter.module.css";

type PageFilterProps = {
	children: ReactNode;
	buttonText?: string;
	pagination?: boolean;
};

export const PageFilter = (props: PageFilterProps) => {
	const router = useRouter();
	const routerState = useRouterState();
	const methods = useForm();

	const pathname = routerState.location.pathname;
	const search = routerState.location.search as { page: number };

	const { children, buttonText = "Поиск", pagination = true } = props;
	const onSubmit = (data: FieldValues) => {
		const newSearch = { ...data };
		if (pagination) {
			console.log(search.page);
			newSearch.page = search.page || 1;
		}
		router.navigate({ to: pathname, search: newSearch });
	};

	return (
		<div className={s.filter}>
			<h4>Фильтр для поиска</h4>
			<FormProvider {...methods}>
				<form className={s.form} onSubmit={methods.handleSubmit(onSubmit)}>
					<MdFilterAltOff
						fontSize={20}
						onClick={() => {
							router.navigate({ to: pathname });
						}}
					/>
					{children}
					<Button type="submit">{buttonText}</Button>
				</form>
			</FormProvider>
		</div>
	);
};
