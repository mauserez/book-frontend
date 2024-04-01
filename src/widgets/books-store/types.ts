export type BookRow = {
	id: string;
	name: string;
	price: number;
	language: string | null;
	description: string;
	currency: {
		id: string;
		currency_acronym: string;
		currency_name: string;
	};
	book_categories: { category: { name: string }; category_id: string }[];
	book_authors: {
		author: { first_name: string; last_name: string };
		author_id: string;
	}[];
};

export type BooksSearchType = {
	priceFrom?: string;
	priceTo?: string;
	category: string;
	author: string;
	page: string;
};
