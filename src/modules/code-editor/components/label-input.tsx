import { useState } from "react";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export const LabelInput = ({ value, onChange }: Props) => {
    const [editing, setEditing] = useState(true);

    const [text, setText] = useState(value);

    if (editing) {
        return (
            <input
                autoFocus
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={() => setEditing(false)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        setEditing(false);
                        onChange(text);
                    } else if (e.key === "Escape") {
                        setEditing(false);
                        setText(value);
                    }
                }}
                onFocus={(e) => e.target.select()}
                className="text-muted-foreground border border-transparent bg-transparent px-2 py-1 text-xs font-medium focus:border-blue-500 focus:outline-none"
            />
        );
    }
    return (
        <span
            className="text-muted-foreground cursor-text pr-4 text-xs font-medium"
            onClick={() => setEditing(true)}
        >
            {value} =
        </span>
    );
};
