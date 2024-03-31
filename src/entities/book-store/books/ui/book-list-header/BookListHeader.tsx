type BookListHeaderProps = {
	bookCount: number | undefined;
	pageCount: number | undefined;
};

export const BookListHeader = (props: BookListHeaderProps) => {
	const { bookCount, pageCount } = props;

	return bookCount ? (
		<div>
			<div>Всего книг: {bookCount}</div>
			<div>Всего страниц: {pageCount}</div>
		</div>
	) : null;
};
