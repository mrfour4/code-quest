"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { ComboboxDemo } from "./combobox-demo";

export default function Home() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>Open Dialog with Combobox</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <div className="grid gap-4 py-4">
                        <h2 className="text-lg font-medium">
                            Select a framework
                        </h2>
                        <ComboboxDemo />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
