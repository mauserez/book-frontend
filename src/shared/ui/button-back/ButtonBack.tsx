import { useRouter } from "@tanstack/react-router";
import { Button } from "..";
import s from "./ButtonBack.module.css";
import clsx from "clsx";

type ButtonBackProps = { className?: string };
export const ButtonBack = (props: ButtonBackProps) => {
	const { className = "" } = props;

	const router = useRouter();

	return (
		<Button
			className={clsx(s.back, className)}
			onClick={() => {
				router.history.back();
			}}
		>
			Назад
		</Button>
	);
};
