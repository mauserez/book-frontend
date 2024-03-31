import { useRouter } from "@tanstack/react-router";
import clsx from "clsx";
import s from "./PagePagination.module.css";

type PagePaginationProps = { pageCount: number };
export const PagePagination = (props: PagePaginationProps) => {
	const { pageCount } = props;
	const router = useRouter();
	const search = router.parseLocation().search as { page: number };

	return (
		<div className={s.pagination}>
			{[...Array(pageCount)].map((x, i) => {
				const pageNum = String(i + 1);
				const searchPage = !search.page ? "1" : String(search.page);

				return (
					<div
						key={i}
						onClick={() => {
							const navigateSearch = {
								...search,
								page: pageNum,
							};

							router.navigate({
								to: location.pathname,
								search: navigateSearch,
								replace: true,
							});
						}}
						className={clsx({
							[s.paginate]: true,
							[s.paginateActive]: searchPage === pageNum,
						})}
					>
						{i + 1}
					</div>
				);
			})}
		</div>
	);
};
