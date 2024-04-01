import { apiFetch } from "../../../../../shared/axios/api";
import { RatingValue, RatingReviews } from "../../../../rating";
import { useQuery } from "@tanstack/react-query";
import { BarLoader } from "react-spinners";

import s from "./BookRating.module.css";

type BookRatingResult = {
	rating: number | null;
	reviews: number | null;
};

type BookRatingProps = {
	bookId: string;
};

export const BookRating = (props: BookRatingProps) => {
	const { bookId } = props;

	const ratingFetching = useQuery({
		queryKey: ["book-rating"],
		queryFn: (): Promise<BookRatingResult | null> =>
			apiFetch(`/book-rating?id=${bookId}`),
	});

	return (
		<div className={s.rating}>
			{ratingFetching.status === "pending" ? (
				<BarLoader color="#869c81" />
			) : (
				<>
					<RatingValue value={ratingFetching.data?.rating || null} />
					<RatingReviews value={ratingFetching.data?.reviews || 0} />
				</>
			)}
		</div>
	);
};
