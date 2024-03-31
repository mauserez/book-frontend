import { CategoryListItem, fetchCategoryList } from "../api/fetchCategoryList";
import { useState, useEffect } from "react";

export const useCategories = () => {
	const [categories, setCategories] = useState<CategoryListItem[]>([]);

	useEffect(() => {
		const getCategories = async () => {
			const ctg = await fetchCategoryList();
			setCategories(ctg);
		};

		getCategories();
	}, []);

	return categories;
};
