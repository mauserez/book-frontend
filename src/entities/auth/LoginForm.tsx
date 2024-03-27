import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { api } from "../../shared/axios/api";
import { ResponseResult } from "../../shared/types";
import { useSessionStore } from "../../store/sessionStore";

import HashLoader from "react-spinners/HashLoader";
import { Button } from "../../shared/ui/button/Button";

import clsx from "clsx";
import inputStyle from "../../shared/ui/input/Input.module.css";
import s from "./LoginForm.module.css";

type MethodAssocArray = {
	[key: string]: {
		text: string;
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
		method: "login",
		alternative: "Регистрация",
		alternativeMethod: "register",
	},
	register: {
		text: "Регистрация",
		method: "register",
		alternative: "Вход",
		alternativeMethod: "login",
	},
};

export const LoginForm = () => {
	const { setStore } = useSessionStore((state) => state);
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
					location.href = "/my-books";
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
							className={inputStyle.input}
							placeholder="Введите логин"
							{...register("login", {
								required: true,
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "Invalid email address",
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
							className={clsx(inputStyle.input, inputStyle.password)}
							placeholder="Введите пароль"
							{...register("password", { required: true })}
						/>
						{errors.password && (
							<span className={s.errorInput}>This field is required</span>
						)}
					</div>
					<span className={clsx({ [s.error]: true, [s.visible]: errorState })}>
						{errorState}
					</span>
				</div>

				<Button className={s.submit} type="submit">
					<span>Submit</span>
					{loading ? <HashLoader color="#fff" size={20} /> : null}
				</Button>
			</form>
		</div>
	);
};
