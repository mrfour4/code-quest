import { useEffect, useState } from "react";

type Props = {
    children: React.ReactNode;
};

export const ClientOnly = ({ children }: Props) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }
    return children;
};
