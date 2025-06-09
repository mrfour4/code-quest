import { Header } from "@/modules/dashboard/components/header";
import { Sidebar } from "@/modules/dashboard/components/sidebar";
import { Suspense } from "react";

type Props = {
    children: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
    return (
        <div className="flex h-screen w-screen flex-col overflow-hidden">
            <Header />
            <main className="flex size-full">
                <Suspense fallback={null}>
                    <Sidebar />
                </Suspense>
                <div className="bg-secondary mt-16 size-full lg:ml-64">
                    <div className="mx-auto flex max-w-3xl flex-col overflow-hidden px-4 py-14">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
