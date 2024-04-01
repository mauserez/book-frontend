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

import s from "./BookForm.module.css";
import { useForm } from "@mantine/form";

interface FormValues {
	name: string;
	price: string | number;
	description: string;
	currency_id: string;
	author: string[];
	category: string[];
}

type BookFormProps = { book: BookRow | null | undefined };

export const BookForm = (props: BookFormProps) => {
	const { book } = props;
	const authors = useAuthors();
	const currencies = useCurrencies();
	const categories = useCategories();

	const authorIds = book?.book_authors.map((author) => author.author_id);
	const categoryIds = book?.book_categories.map(
		(category) => category.category_id
	);

	const name = book?.name || "";
	const price = book?.price || 0;
	const description = book?.description || "";
	const currency = book?.currency.id || "";
	const author = authorIds || [];
	const category = categoryIds || [];

	const form = useForm<FormValues>({
		initialValues: {
			name: name,
			price: price,
			description: description,
			currency_id: currency,
			author: author,
			category: category,
		},
	});

	return (
		<>
			<ButtonBack />
			<div className={s.container}>
				<form
					className={s.form}
					onSubmit={form.onSubmit((values) => {
						console.log(values);
					})}
				>
					<Input
						{...form.getInputProps("name")}
						label="Название"
						required
						name="name"
						placeholder="Название"
					/>

					<Input
						{...form.getInputProps("price")}
						label="Цена"
						required
						name="price"
						placeholder="Цена"
					/>

					<TextArea
						{...form.getInputProps("description")}
						required
						label="Описание"
						name="description"
						placeholder="Описание"
					/>

					<Select
						width={200}
						{...form.getInputProps("currency_id")}
						required
						label="Валюта"
						name="currency_id"
						options={currencies}
					/>

					<MultiSelect
						width={"50%"}
						{...form.getInputProps("author")}
						required
						label="Автор"
						name="author"
						options={authors}
					/>
					<MultiSelect
						width={"50%"}
						{...form.getInputProps("category")}
						required
						label="Категория"
						name="category"
						options={categories}
					/>
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
