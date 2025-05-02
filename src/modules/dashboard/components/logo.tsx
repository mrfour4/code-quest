import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2">
            <Image
                src="/logo.svg"
                alt="Code Quest Logo"
                width={24}
                height={24}
                className="size-6 object-cover"
            />
            <span className="text-lg font-bold">Code Quest</span>
        </Link>
    );
};
