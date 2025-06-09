import { DocumentTable } from "@/modules/dashboard/components/document-table";
import { Suspense } from "react";

export default function DashboardPage() {
    return (
        <Suspense fallback={null}>
            <DocumentTable />
        </Suspense>
    );
}
