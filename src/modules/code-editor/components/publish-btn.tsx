import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useDocumentId } from "@/modules/document/hooks/use-document-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue } from "jotai";
import { FileCode } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { usePublishTemplate } from "../api/template";
import { codeAtom } from "../atom/code";
import { languagesAtom } from "../atom/language";
import { ActionSelector } from "./action-selector";
import { templateSchema, TemplateValues } from "./schemas/template";

export const PublishButton = () => {
    const [open, setOpen] = useState(false);
    const language = useAtomValue(languagesAtom);
    const code = useAtomValue(codeAtom);
    const { mutate, isPending } = usePublishTemplate();
    const documentId = useDocumentId();

    const form = useForm<TemplateValues>({
        resolver: zodResolver(templateSchema),
        defaultValues: {
            head: "",
            body: "",
            tail: "",
        },
    });

    const onSubmit = (data: TemplateValues) => {
        mutate(
            {
                documentId,
                language: language.value,
                ...data,
            },
            {
                onSuccess() {
                    toast.success("Template created successfully!");
                    setOpen(false);
                },
                onError(error) {
                    toast.error(`Failed to create template: ${error.message}`);
                },
            },
        );
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <ActionSelector
                        title="Make template"
                        onClick={() => {}}
                        disabled={false}
                    >
                        <FileCode />
                    </ActionSelector>
                </DialogTrigger>
                <DialogContent
                    // onPointerDownOutside={(e) => e.preventDefault()}
                    className="flex h-[90vh] flex-col overflow-hidden sm:max-w-4xl"
                >
                    <DialogHeader>
                        <DialogTitle>Create Code Template</DialogTitle>
                        <DialogDescription>
                            Create a structured code template with organized
                            sections for imports, main code, and helper
                            functions.
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-4 overflow-hidden"
                        >
                            <div className="space-y-3">
                                <Label>Programming Language</Label>
                                <div className="bg-muted rounded-md px-3 py-2 text-sm font-medium">
                                    {language.label}
                                </div>
                            </div>

                            <div className="flex-1 overflow-hidden">
                                <ScrollArea className="h-full pr-4">
                                    <Accordion
                                        type="multiple"
                                        className="w-full"
                                    >
                                        <AccordionItem value="preview">
                                            <AccordionTrigger>
                                                Source Code
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <Textarea
                                                    value={code}
                                                    readOnly
                                                />
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="head">
                                            <AccordionTrigger>
                                                Head Section
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <FormField
                                                    control={form.control}
                                                    name="head"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Textarea
                                                                    {...field}
                                                                    placeholder="// Import necessary libraries"
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="body">
                                            <AccordionTrigger>
                                                Body Section
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <FormField
                                                    control={form.control}
                                                    name="body"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Textarea
                                                                    {...field}
                                                                    placeholder="// Main user code area (e.g., function example() { })"
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="tail">
                                            <AccordionTrigger>
                                                Tail Section
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <FormField
                                                    control={form.control}
                                                    name="tail"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Textarea
                                                                    {...field}
                                                                    placeholder="// Helper functions and main execution"
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>

                                    <DialogFooter className="mt-4 gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={isPending}
                                        >
                                            Create
                                        </Button>
                                    </DialogFooter>
                                </ScrollArea>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};
