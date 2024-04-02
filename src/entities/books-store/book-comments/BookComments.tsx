import { useState } from "react";
import { Button, TextArea } from "../../../shared/ui";
import { apiFetch } from "../../../shared/axios/api";
import { useQuery } from "@tanstack/react-query";
import { BooksLoader } from "../books";
import {
	SaveCommentPayload,
	saveComment,
} from "../../../shared/api/book-comments/saveComment";
import { HiStar } from "react-icons/hi2";
import { FaRegTrashCan } from "react-icons/fa6";

import { deleteComment } from "../../../shared/api/book-comments/deleteComment";
import { RatingValue } from "../../rating";
import { Flex } from "@mantine/core";

import clsx from "clsx";
import s from "./BookComments.module.css";
import { notifyError } from "../../../shared/helpers/toast";

export type CommentRow = {
	id: string;
	value: number;
	comment: string;
	book_id: string;
	user_id: string;
	login: string;
	created_at: string;
};
type CommentsResult = CommentRow[];

type BookCommentsProps = {
	bookId: string;
	toggleRatingState: () => void;
};

export const BookComments = (props: BookCommentsProps) => {
	const { bookId, toggleRatingState } = props;
	const initComment = { id: "", value: 0, comment: "", book_id: bookId };

	const [saving, setSaving] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const [commentState, setCommentState] =
		useState<SaveCommentPayload>(initComment);

	const [page, setPage] = useState(1);

	const {
		status,
		data: commments,
		refetch,
	} = useQuery({
		queryKey: ["books-store", bookId, page],
		queryFn: (): Promise<CommentsResult | null> => {
			setTimeout(() => {
				toggleRatingState();
			}, 1000);

			return apiFetch(`/rating/book-comments?book_id=${bookId}&page=${page}`);
		},
	});

	const noComments = status !== "pending" && !commments?.length;

	return (
		<div className={s.container}>
			<form className={s.commentBlock}>
				<div>
					{[...Array(5)].map((_, idx) => {
						const starNumber = idx + 1;
						return (
							<HiStar
								key={idx}
								onClick={() => {
									setCommentState({ ...commentState, value: starNumber });
								}}
								className={clsx({
									[s.star]: true,
									[s.starActive]: commentState.value >= starNumber,
								})}
							/>
						);
					})}
					<TextArea
						onChange={(e) => {
							setCommentState({ ...commentState, comment: e.target.value });
						}}
						value={commentState.comment}
						placeholder="Введите комментарий"
					/>
				</div>
				<Button
					type="button"
					className={s.addComment}
					onClick={async () => {
						if (!saving) {
							setSaving(true);
							if (commentState.value) {
								await saveComment(commentState);
								setCommentState(initComment);
								refetch();
							} else {
								notifyError("Выберите оценку");
							}
							setSaving(false);
						}
					}}
				>
					Добавить
				</Button>
			</form>

			<div className={s.comments}>
				<div>Комментарии</div>
				{noComments ? (
					<div>У этой книги нет отзывов</div>
				) : (
					<>
						{commments?.map((comment) => {
							return (
								<div className={s.comment} key={comment.id}>
									<Flex gap={8}>
										{comment.login}
										<RatingValue value={comment.value} />
									</Flex>
									<div>{comment.comment}</div>
									<FaRegTrashCan
										className={s.deleteButton}
										onClick={async () => {
											if (!deleting) {
												setDeleting(true);
												if (!deleting) {
													await deleteComment(comment.id);
													refetch();
												}
												setDeleting(false);
											}
										}}
										size={24}
									/>
								</div>
							);
						})}
					</>
				)}
				{status === "pending" ? <BooksLoader /> : null}

				{!noComments ? (
					<Button
						className={s.loadMore}
						onClick={() => {
							setPage((prev) => prev + 1);
						}}
					>
						Загрузить еще
					</Button>
				) : null}
			</div>
		</div>
	);
};
