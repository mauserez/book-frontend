import { Button, Input } from "../../../../shared/ui";
import { isNotEmpty, useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../../../shared/axios/api";
import { type Author } from "../../../../shared/api/books-store/fetchAuthorList";
import { BooksLoader } from "../../../books-store/books";
import { useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { saveAuthors } from "../../../../shared/api/books-admin";

import style from "../style.module.css";

export type AuthorsSavePayload = Author[];

export const AuthorReferenceForm = () => {
	const defAuthor = { id: "", first_name: "", last_name: "", years_active: "" };
	const {
		status,
		data: authors,
		refetch,
	} = useQuery({
		queryKey: ["authors"],
		queryFn: (): Promise<Author[] | null> => apiFetch(`/authors`),
	});

	const form = useForm({
		initialValues: {
			authors: !authors ? [] : authors,
		},
		validate: {
			authors: {
				first_name: isNotEmpty(),
				last_name: isNotEmpty(),
			},
		},
	});

	useEffect(() => {
		if (authors) {
			form.initialize({ authors: [...authors] });
		}
	}, [form, authors]);

	if (status === "pending") {
		return <BooksLoader />;
	}

	const fields = form.values.authors.map((_, index) => (
		<div key={index} className={style.fieldRow}>
			<Input
				className="hidden"
				{...form.getInputProps(`authors.${index}.id`)}
			/>
			<Input
				placeholder="Имя"
				{...form.getInputProps(`authors.${index}.first_name`)}
			/>
			<Input
				placeholder="Фамилия"
				{...form.getInputProps(`authors.${index}.last_name`)}
			/>
			<Input
				placeholder="Годы деятельности"
				{...form.getInputProps(`authors.${index}.years_active`)}
			/>
			<FaRegTrashCan
				onClick={() => {
					form.removeListItem("authors", index);
				}}
				className={style.removeButton}
				size={24}
			/>
		</div>
	));

	return (
		<form
			onSubmit={form.onSubmit(async (values) => {
				await saveAuthors(values.authors);
				refetch();
			})}
		>
			{fields}
			<div className={style.buttons}>
				<Button
					type="button"
					className={style.addFieldRowButton}
					onClick={() => {
						form.insertListItem("authors", defAuthor);
					}}
				>
					Добавить автора
				</Button>
				<Button>Сохранить</Button>
			</div>
		</form>
	);
};
