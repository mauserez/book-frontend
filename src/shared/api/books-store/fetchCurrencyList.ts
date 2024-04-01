import { api } from "../../axios/api";
import { ResponseResult } from "../../types";
import { notifyError } from "../../helpers/toast";

export type Currency = {
	id: string;
	currency_name: string;
	currency_acronym: string;
};

export type CurrencyListItem = {
	label: string;
	value: string;
};

export const fetchCurrencyList = async (): Promise<CurrencyListItem[]> => {
	return await api
		.get<ResponseResult<Currency[]>>("/currencies")
		.then((res) => {
			const { success, result } = res.data;
			if (success) {
				const currencyList = result.map((currency) => {
					return { label: currency.currency_name, value: currency.id };
				});
				return currencyList;
			}
			return [];
		})
		.catch((e) => {
			notifyError(e);
			return [];
		});
};
