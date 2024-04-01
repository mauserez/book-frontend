import { ComponentProps, useState, useLayoutEffect } from "react";
import { GoHeartFill } from "react-icons/go";
import { api } from "../../../shared/axios/api";
import { notifyError } from "../../../shared/helpers/toast";

import { ResponseResult } from "../../../shared/types";
import clsx from "clsx";
import s from "./ToggleFavorite.module.css";

type ToggleFavoriteProps = {
	id: string;
	favorite?: boolean;
	size?: number;
} & ComponentProps<"div">;

export const ToggleFavorite = (props: ToggleFavoriteProps) => {
	const { favorite = false, size = 22, id, ...divProps } = props;

	const [isfav, setIsFav] = useState(favorite);

	useLayoutEffect(() => {
		api
			.get<ResponseResult<boolean>>(`/user-books/is-favorite?id=${id}`)
			.then((res) => {
				setIsFav(res.data.result);
			});
	}, [id]);

	const handleFav = () => {
		setIsFav((prev) => !prev);
	};

	return (
		<div style={{ zIndex: 5 }} {...divProps}>
			<GoHeartFill
				size={size}
				onClick={async () => {
					handleFav();
					api
						.post<
							ResponseResult<string>
						>("/user-books/toggle-favorite", { id: id })
						.then((res) => {
							if (!res.data.success) {
								notifyError(res.data.result);
								handleFav();
							}
						});
				}}
				className={clsx({ [s.toggle]: true, [s.active]: isfav })}
			/>
		</div>
	);
};
