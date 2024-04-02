import { useDisclosure } from "@mantine/hooks";
import { Button } from "../../../../shared/ui";
import { Modal, FocusTrap } from "@mantine/core";
import { deleteBook } from "../../../../shared/api/books-admin";
import { useNavigate } from "@tanstack/react-router";

import s from "./BookFormDelete.module.css";

type BookFormDeleteProps = { bookId: string };
export const BookFormDelete = (props: BookFormDeleteProps) => {
	const navigate = useNavigate();
	const [opened, { open, close }] = useDisclosure(false);
	const { bookId } = props;

	return (
		<div>
			<Button type="button" onClick={open}>
				Удалить
			</Button>
			<Modal opened={opened} onClose={close} title="">
				<div className={s.container}>
					<div className={s.title}>
						Вы точно хотите удалить книгу {bookId} ?
					</div>
					<FocusTrap.InitialFocus />
					<div className={s.buttons}>
						<Button
							onClick={async () => {
								await deleteBook(bookId);
								close();

								setTimeout(() => {
									navigate({ to: "/books-admin" });
								}, 1500);
							}}
						>
							Да
						</Button>
						<Button onClick={close}>Нет</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};
