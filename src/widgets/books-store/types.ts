export type BookRow = {
	id: string;
	name: string;
	price: number;
	language: string;
	description: string;
	currency_acronym: string;
};

export type BooksSearchType = {
	priceFrom?: string;
	priceTo?: string;
	category: string;
	page: string;
};
