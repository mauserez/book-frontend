import { MdCurrencyYuan as YuanIcon } from "react-icons/md";
import { BiRuble, BiDollar, BiEuro } from "react-icons/bi";
import s from "./CurrencyIcon.module.css";

const getCurrencyIcon = (acronym: string, size: number) => {
	const CurrencyIcons = {
		"RUR": <BiRuble size={size} />,
		"EUR": <BiEuro size={size} />,
		"USD": <BiDollar size={size} />,
		"CNY": <YuanIcon size={size} />,
	};
	return CurrencyIcons[acronym];
};

type CurrencyIconProps = {
	acronym: string;
	size?: number;
};
export const CurrencyIcon = (props: CurrencyIconProps) => {
	const { acronym, size = 18 } = props;
	return <span className={s.icon}>{getCurrencyIcon(acronym, size)}</span>;
};
