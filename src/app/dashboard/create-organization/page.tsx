import { Suspense } from "react";

export default async function CreateOrganizationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>Create-organization Page</div>
        </Suspense>
    );
}
