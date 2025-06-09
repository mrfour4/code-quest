import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
    className?: HTMLSpanElement["className"];
};

export const Logo = ({ className }: Props) => {
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
            {
                <span
                    className={cn(
                        "text-lg font-bold whitespace-nowrap",
                        className,
                    )}
                >
                    Code Quest
                </span>
            }
        </Link>
    );
};
