import { apiFetch } from "../../../../../shared/axios/api";
import { RatingValue, RatingReviews } from "../../../../rating";
import { useQuery } from "@tanstack/react-query";
import { BarLoader } from "react-spinners";

import clsx from "clsx";
import s from "./BookRating.module.css";

type BookRatingResult = {
	rating: number | null;
	reviews: number | null;
};

type BookRatingProps = {
	bookId: string;
	className?: string;
	ratingSize?: number;
	sideEffect?: boolean;
};

export const BookRating = (props: BookRatingProps) => {
	const { bookId, className = "", ratingSize, sideEffect } = props;

	const rating = useQuery({
		queryKey: ["book-rating", bookId, sideEffect],
		queryFn: (): Promise<BookRatingResult | null> =>
			apiFetch(`/book-rating?id=${bookId}`),
	});

	return (
		<div className={clsx(s.rating, className)}>
			{rating.status === "pending" ? (
				<BarLoader color="#869c81" />
			) : (
				<>
					<RatingValue size={ratingSize} value={rating.data?.rating || null} />
					<RatingReviews value={rating.data?.reviews || 0} />
				</>
			)}
		</div>
	);
};
