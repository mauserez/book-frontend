import { Tabs } from "@mantine/core";
import { AuthorReferenceForm } from ".";
import { CategoryReferenceForm } from "./category/Form";
import { DiYeoman } from "react-icons/di";
import { BiCategory } from "react-icons/bi";

import s from "./References.module.css";
import { ButtonBack } from "../../../shared/ui";

export const BooksAdminReferences = () => {
	return (
		<div className={s.container}>
			<ButtonBack />
			<Tabs defaultValue="authors">
				<Tabs.List className={s.tabsList} defaultValue="authors">
					<Tabs.Tab value="authors">
						<DiYeoman size={20} /> Авторы
					</Tabs.Tab>
					<Tabs.Tab value="categories">
						<BiCategory size={20} />
						Категории
					</Tabs.Tab>
				</Tabs.List>
				<Tabs.Panel value="authors">
					<AuthorReferenceForm />
				</Tabs.Panel>
				<Tabs.Panel value="categories">
					<CategoryReferenceForm />
				</Tabs.Panel>
			</Tabs>
		</div>
	);
};
