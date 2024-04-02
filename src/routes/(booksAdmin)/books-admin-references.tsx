import { createFileRoute } from "@tanstack/react-router";
import { checkToken } from "../../shared/helpers/session";
import { BooksAdminReferences } from "../../entities/books-admin/references/References";

export const Route = createFileRoute("/(booksAdmin)/books-admin-references")({
	beforeLoad: async ({ context }) => {
		await checkToken(context);
	},
	component: () => <ReferenceForms />,
});

function ReferenceForms() {
	return <BooksAdminReferences />;
}
