import { ScrollArea } from "@/components/ui/scroll-area";
import { DocumentTable } from "@/modules/dashboard/components/document-table";
import { Header } from "@/modules/dashboard/components/header";
import { Sidebar } from "@/modules/dashboard/components/sidebar";

export default function DashboardPage() {
    return (
        <div className="flex h-screen w-screen flex-col overflow-hidden">
            <Header />
            <main className="flex size-full">
                <Sidebar />
                <div className="mt-16 size-full bg-[#202023] lg:ml-64">
                    <ScrollArea className="mx-auto flex h-[calc(100vh-64px)] w-full max-w-3xl flex-col overflow-auto px-4 py-14">
                        <DocumentTable />
                    </ScrollArea>
                </div>
            </main>
        </div>
    );
}
