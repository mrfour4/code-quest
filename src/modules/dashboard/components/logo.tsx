import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
    return (
        <Link
            href="/"
            className="mr-4 flex items-center gap-2 hover:opacity-80"
        >
            <Image
                src="/logo.svg"
                alt="Code Quest Logo"
                width={24}
                height={24}
                className="size-6 object-cover"
            />
            <span className="text-lg font-bold whitespace-nowrap">
                Code Quest
            </span>
        </Link>
    );
};
