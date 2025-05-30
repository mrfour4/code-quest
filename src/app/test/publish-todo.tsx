import { Button } from "@/components/ui/button";
import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import { todosAtom } from "./atom";

export const PublishButton = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: useConvexMutation(api.todos.publish),
    });

    const todos = useAtomValue(todosAtom);

    const onPublish = () => {
        mutate(
            {
                todos: todos.map((todo) => ({
                    title: todo.title,
                    completed: todo.completed,
                })),
            },
            {
                onSuccess() {
                    toast.success("Todos published successfully!");
                },
                onError(err) {
                    console.log("Error publishing todos:", err);
                    toast.error("Failed to publish todos.");
                },
            },
        );
    };

    if (todos.length === 0) {
        return null;
    }

    return (
        <Button onClick={onPublish} disabled={isPending}>
            Publish
        </Button>
    );
};
