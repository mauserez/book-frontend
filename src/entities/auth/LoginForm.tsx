import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { api } from "../../shared/axios/api";
import { ResponseResult } from "../../shared/types";
import { useSessionStore } from "../../store/sessionStore";

import HashLoader from "react-spinners/HashLoader";
import { Button } from "../../shared/ui";

import clsx from "clsx";
import s from "./LoginForm.module.css";
import { useRouter } from "@tanstack/react-router";

type MethodAssocArray = {
	[key: string]: {
		text: string;
		buttonText: string;
		method: string;
		alternative: string;
		alternativeMethod: string;
	};
};

type Inputs = {
	login: string;
	password: string;
};

const formTypes: MethodAssocArray = {
	login: {
		text: "Вход",
		buttonText: "Войти",
		method: "login",
		alternative: "Регистрация",
		alternativeMethod: "register",
	},
	register: {
		text: "Регистрация",
		buttonText: "Зарегистрироваться",
		method: "register",
		alternative: "Вход",
		alternativeMethod: "login",
	},
};

export const LoginForm = () => {
	const { setStore } = useSessionStore((state) => state);
	const router = useRouter();
	const [formType, setFormType] = useState(formTypes["login"]);
	const [errorState, setErrorState] = useState("");
	const [loading, setLoading] = useState(false);

	const method = formType["method"];
	const alternativeMethod = formType["alternativeMethod"];

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setLoading(true);
		await api
			.post<ResponseResult<string>>(`auth/${method}`, data)
			.then((res) => {
				const { result, success } = res.data;
				if (success) {
					setStore(result);
					router.navigate({ to: "/" });
				} else {
					setErrorState(result);
				}
			});
		setLoading(false);
	};

	const onChange: React.FormEventHandler<HTMLFormElement> = () => {
		errorState ? setErrorState("") : null;
	};

	return (
		<div className={s.formWrap}>
			<div className={s.formName}>
				{formType["text"]}{" "}
				<span
					className={s.alternative}
					onClick={() => {
						setFormType(formTypes[alternativeMethod]);
					}}
				>
					{formType["alternative"]}
				</span>
			</div>
			<form
				className={s.form}
				onChange={onChange}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className={s.formItems}>
					<div className={s.formItem}>
						<label>Логин</label>
						<input
							autoComplete="off"
							className={s.input}
							placeholder="Введите логин"
							{...register("login", {
								required: { value: true, message: "Введите логин" },
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "Некорректный почтовый адрес",
								},
							})}
						/>
						{errors.login && (
							<span className={s.errorInput}>{errors.login.message}</span>
						)}
					</div>
					<div className={s.formItem}>
						<label>Пароль</label>
						<input
							autoComplete="off"
							type="password"
							className={clsx(s.input)}
							placeholder="Введите пароль"
							{...register("password", { required: true })}
						/>
						{errors.password && (
							<span className={s.errorInput}>Введите пароль</span>
						)}
					</div>
					<span className={clsx({ [s.error]: true, [s.visible]: errorState })}>
						{errorState}
					</span>
				</div>

				<Button className={s.submit} type="submit">
					<span>{formType.buttonText}</span>
					{loading ? <HashLoader color="#fff" size={20} /> : null}
				</Button>
			</form>
		</div>
	);
};
