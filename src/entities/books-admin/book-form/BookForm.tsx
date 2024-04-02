import { BookRow } from "../../../widgets/books-store/types";
import { BookFormDelete } from "./delete/BookFormDelete";

import {
	Button,
	ButtonBack,
	Input,
	MultiSelect,
	Select,
	TextArea,
} from "../../../shared/ui";

import {
	useCategories,
	useAuthors,
	useCurrencies,
} from "../../../shared/hooks/books-store";

import { createBook, editBook } from "../../../shared/api/books-admin";

import { useForm, isNotEmpty } from "@mantine/form";
import s from "./BookForm.module.css";
import { useNavigate } from "@tanstack/react-router";

export interface BookSavePayload {
	id?: string;
	name: string;
	price: string | number;
	description: string;
	language: string;
	currency_id: string;
	author: string[];
	category: string[];
}

type BookFormProps = { book: BookRow | null | undefined };

export const BookForm = (props: BookFormProps) => {
	const { book } = props;
	const navigate = useNavigate();

	const authors = useAuthors();
	const currencies = useCurrencies();
	const categories = useCategories();
	const languages = [
		{ label: "Русский", value: "RU" },
		{ label: "Английский", value: "EN" },
	];

	const authorIds = book?.book_authors.map((author) => author.author_id);
	const categoryIds = book?.book_categories.map(
		(category) => category.category_id
	);

	const id = book?.id || "";
	const name = book?.name || "";
	const price = book?.price || "";
	const description = book?.description || "";
	const language = book?.language || "";
	const currency = book?.currency.id || "";
	const author = authorIds || [];
	const category = categoryIds || [];

	const form = useForm<BookSavePayload>({
		initialValues: {
			id: id,
			name: name,
			price: price,
			description: description,
			language: language,
			currency_id: currency,
			author: author,
			category: category,
		},
		validate: {
			name: isNotEmpty("Введите название"),
			price: isNotEmpty("Введите цену"),
			description: isNotEmpty("Введите описание"),
			language: isNotEmpty("Выберите язык"),
			currency_id: isNotEmpty("Выберите валюту"),
			author: isNotEmpty("Выберите автора"),
			category: isNotEmpty("Выберие категорию"),
		},
	});

	return (
		<>
			<ButtonBack />
			<div className={s.container}>
				<form
					className={s.form}
					onSubmit={form.onSubmit(async (values) => {
						book?.id ? await editBook(values) : await createBook(values);
						setTimeout(() => {
							navigate({ to: "/books-admin" });
						}, 1500);
					})}
				>
					<div className={s.mainFormItems}>
						<Input
							className={s.id}
							{...form.getInputProps("id")}
							value={book?.id}
						/>

						<Input
							className={s.name}
							{...form.getInputProps("name")}
							label="Название"
							placeholder="Название"
						/>

						<Input
							className={s.price}
							{...form.getInputProps("price")}
							label="Цена"
							placeholder="Цена"
						/>
					</div>

					<TextArea
						{...form.getInputProps("description")}
						label="Описание"
						placeholder="Описание"
					/>
					<div className={s.formItems}>
						<Select
							width={"100%"}
							{...form.getInputProps("language")}
							label="Язык"
							options={languages}
						/>

						<Select
							width={"100%"}
							{...form.getInputProps("currency_id")}
							label="Валюта"
							options={currencies}
						/>

						<MultiSelect
							width={"100%"}
							{...form.getInputProps("author")}
							label="Автор"
							options={authors}
						/>
						<MultiSelect
							width={"100%"}
							{...form.getInputProps("category")}
							label="Категория"
							options={categories}
						/>
					</div>
					<div className={s.break}></div>

					<div className={s.buttons}>
						<Button type="submit">Сохранить</Button>
						{book?.id ? <BookFormDelete bookId={book.id} /> : null}
					</div>
				</form>
			</div>
		</>
	);
};
