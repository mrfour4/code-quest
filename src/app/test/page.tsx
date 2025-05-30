import { Suspense } from "react";
import { TodoWrapper } from "./todo-wrapper";

export default async function Home() {
    return (
        <div className="h-screen bg-gray-900">
            <Suspense fallback={<div className="text-white">Loading...</div>}>
                <TodoWrapper />
            </Suspense>
        </div>
    );
}
