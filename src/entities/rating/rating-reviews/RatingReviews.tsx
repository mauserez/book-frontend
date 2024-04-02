import { ComponentProps } from "react";
import { plural } from "../../../shared/helpers/plural";

import { FaComment } from "react-icons/fa6";
import s from "./RatingReviews.module.css";

export type RatingReviewsProps = ComponentProps<"div"> & {
	value: number | null;
};

const forms = ["отзыв", "отзыва", "отзывов"];

export const RatingReviews = (props: RatingReviewsProps) => {
	const { value } = props;

	if (!value) {
		return null;
	}

	const text = plural(forms, value);

	return (
		<div className={s.reviews}>
			<FaComment className={s.commentIcon} size={14} /> {value}{" "}
			<span className={s.commentText}>{text}</span>
		</div>
	);
};
