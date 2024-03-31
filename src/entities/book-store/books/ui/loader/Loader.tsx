import { HashLoader } from "react-spinners";
import s from "./Loader.module.css";

export const Loader = () => {
	return (
		<div className={s.loader}>
			<HashLoader color="#869c81" size={24} />
		</div>
	);
};
