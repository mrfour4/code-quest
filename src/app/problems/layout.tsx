import { Header } from "@/modules/problems/components/header";

type Props = {
    children: React.ReactNode;
};

export default async function ProblemsLayout({ children }: Props) {
    return (
        <div className="flex h-screen w-screen flex-col overflow-hidden">
            <Header />
            <main className="bg-border flex size-full">
                <div className="mx-auto mt-16 size-full max-w-3xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
