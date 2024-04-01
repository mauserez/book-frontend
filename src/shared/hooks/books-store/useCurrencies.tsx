import {
	CurrencyListItem,
	fetchCurrencyList,
} from "../../api/books-store/fetchCurrencyList";
import { useState, useEffect } from "react";

export const useCurrencies = () => {
	const [currencies, setCurrencies] = useState<CurrencyListItem[]>([]);

	useEffect(() => {
		const getCurrencies = async () => {
			const ctg = await fetchCurrencyList();
			setCurrencies(ctg);
		};

		getCurrencies();
	}, []);

	return currencies;
};
