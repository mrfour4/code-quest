import Image from "next/image";

export const Loading = () => {
    return (
        <div className="size-full flex flex-col justify-center items-center">
            <Image
                src="/logo.svg"
                alt="Code Quest Logo"
                width={120}
                height={120}
                className="animate-pulse duration-700"
            />
        </div>
    );
};
