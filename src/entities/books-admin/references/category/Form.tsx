import { Button, Input } from "../../../../shared/ui";
import { isNotEmpty, useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../../../shared/axios/api";
import { type Category } from "../../../../shared/api/books-store/fetchCategoryList";
import { BooksLoader } from "../../../books-store/books";
import { useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { saveCategories } from "../../../../shared/api/books-admin";

import style from "../style.module.css";

export type CategoriesSavePayload = Category[];

export const CategoryReferenceForm = () => {
	const defCategory = { id: "", name: "" };
	const {
		status,
		data: categories,
		refetch,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: (): Promise<Category[] | null> => apiFetch(`/categories`),
	});

	const form = useForm({
		initialValues: {
			categories: !categories ? [] : categories,
		},
		validate: {
			categories: {
				name: isNotEmpty(),
			},
		},
	});

	useEffect(() => {
		if (categories) {
			form.initialize({ categories: [...categories] });
		}
	}, [form, categories]);

	if (status === "pending") {
		return <BooksLoader />;
	}

	const fields = form.values.categories.map((_, index) => (
		<div key={index} className={style.fieldRow}>
			<Input
				className="hidden"
				{...form.getInputProps(`categories.${index}.id`)}
			/>
			<Input
				placeholder="Имя"
				{...form.getInputProps(`categories.${index}.name`)}
			/>
			<FaRegTrashCan
				onClick={() => {
					form.removeListItem("categories", index);
				}}
				className={style.removeButton}
				size={24}
			/>
		</div>
	));

	return (
		<form
			onSubmit={form.onSubmit(async (values) => {
				await saveCategories(values.categories);
				refetch();
			})}
		>
			{fields}
			<div className={style.buttons}>
				<Button
					type="button"
					className={style.addFieldRowButton}
					onClick={() => {
						form.insertListItem("categories", defCategory);
					}}
				>
					Добавить категорию
				</Button>
				<Button>Сохранить</Button>
			</div>
		</form>
	);
};
