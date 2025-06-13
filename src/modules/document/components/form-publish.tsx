import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    useGetDocument,
    useUpdateDocument,
} from "@/modules/dashboard/api/documents";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";
import { documentSchema, DocumentValues } from "../schemas/document";
import { CategorySelection } from "./category-selection";
import { LevelSelection } from "./level-selection";

type Props = {
    onClose: () => void;
    documentId: Id<"documents">;
};

export const FormPublishDocument = ({ documentId, onClose }: Props) => {
    const form = useForm<DocumentValues>({
        resolver: zodResolver(documentSchema),
        defaultValues: {
            title: "",
            type: "draft",
            categoryId: "",
            tag: "easy",
        },
    });

    const document = useGetDocument(documentId);
    const create = useUpdateDocument();

    useEffect(() => {
        if (!document.data) return;

        form.reset({
            title: document.data.title,
            type: document.data.type,
            categoryId: document.data.categoryId,
            tag: document.data.tag,
        });
    }, [document.data, form]);

    if (document.isPending) {
        return <div>Loading...</div>;
    }

    const onSubmit = (data: DocumentValues) => {
        create.mutate(
            {
                id: documentId,
                title: data.title,
                type: "published",
                categoryId: data.categoryId as Id<"categories">,
                tag: data.tag,
            },
            {
                onError(error) {
                    toast.error(`Failed to publish document`);
                    console.log("Error publishing document:", error);
                },
                onSuccess() {
                    toast.success("Document published successfully.");
                    onClose();
                    // TODO: Refactor this when use ID token instead of Access token
                    window.location.reload();
                },
            },
        );
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Document Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter document name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tag"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Difficulty Level</FormLabel>
                            <FormControl>
                                <LevelSelection
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <CategorySelection
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogFooter>
                    <Button type="submit" disabled={create.isPending}>
                        Publish
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
};
