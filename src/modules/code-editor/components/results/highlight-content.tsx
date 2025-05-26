import { DiffValue } from "../../types";

type Props = {
    value: DiffValue;
    origin: string;
};

export const HighlightContent = ({ value, origin }: Props) => {
    if (value && Array.isArray(value)) {
        return (
            <span>
                [
                {value.map((item, index) => (
                    <span key={index}>
                        <span className={item.color}>{item.value}</span>
                        {index < value.length - 1 && ","}
                    </span>
                ))}
                ]
            </span>
        );
    }
    return origin;
};
