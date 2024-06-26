import { ComponentProps, ReactNode } from "react";
import { HiStar } from "react-icons/hi2";

import s from "./RatingValue.module.css";
import clsx from "clsx";

type RatingValueProps = ComponentProps<"div"> & {
	value: number | null;
	icon?: ReactNode;
	size?: number;
};

export const RatingValue = (props: RatingValueProps) => {
	const { value = null, icon = null, size = 16 } = props;

	if (!value) {
		return null;
	}

	return (
		<div className={s.rating}>
			<span className={clsx({ [s.icon]: true, [s.good]: value >= 4 })}>
				{icon ? icon : <HiStar size={size} />}
			</span>
			{Math.round(value * 100) / 100}
		</div>
	);
};
