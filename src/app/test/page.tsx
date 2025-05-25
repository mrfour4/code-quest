import { cn } from "@/lib/utils";

export default async function TestPage() {
    return (
        <main className="container mx-auto py-8">
            <div className="space-y-4 p-6">
                <h1 className="text-2xl font-bold">Regular Font (Default)</h1>
                <p className="text-gray-600">
                    This text uses the default system font.
                </p>

                {/* <div className={jetBrainsMono.className}>ok</div> */}

                <div className={cn("rounded-lg p-4")}>
                    <h2 className="mb-2 text-lg font-semibold">
                        JetBrains Mono Font
                    </h2>
                    <pre className="text-sm">
                        {`function hello() {
  console.log("Hello World!");
  return 42;
}`}
                    </pre>
                    <p className="font-jetbrains-mono mt-2 text-sm text-gray-700">
                        This entire block uses JetBrains Mono font via the
                        font-jetbrains class.
                    </p>
                </div>

                <p className="text-gray-600">Back to default font here.</p>
            </div>
        </main>
    );
}
