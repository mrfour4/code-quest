import { ScrollArea } from "@/components/ui/scroll-area";
import { Header } from "@/modules/dashboard/components/header";
import { Sidebar } from "@/modules/dashboard/components/sidebar";

type Props = {
    children: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
    return (
        <div className="flex h-screen w-screen flex-col overflow-hidden">
            <Header />
            <main className="flex size-full">
                <Sidebar />
                <div className="mt-16 size-full bg-[#202023] lg:ml-64">
                    <ScrollArea className="mx-auto flex h-[calc(100vh-4rem)] w-full max-w-3xl flex-col overflow-auto px-4 py-14">
                        {children}
                    </ScrollArea>
                </div>
            </main>
        </div>
    );
}
