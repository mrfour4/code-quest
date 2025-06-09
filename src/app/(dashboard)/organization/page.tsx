import { Suspense } from "react";

export default async function OrganizationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>Organization Page</Suspense>
    );
}
