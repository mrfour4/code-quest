"use client";

import { Button } from "@/components/ui/button";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { nanoid } from "nanoid";
import { api } from "../../../convex/_generated/api";
import { todoAtomsAtom, todoData } from "./atom";
import { ClientOnly } from "./client-only";
import { TodoItem } from "./item";
import { PublishButton } from "./publish-todo";

export const TodoWrapper = () => {
    return <div>Todos</div>;
};

type Props = {
    preloadedTodos: Preloaded<typeof api.todos.getAll>;
};

export const TodoContent = ({ preloadedTodos }: Props) => {
    const todos = usePreloadedQuery(preloadedTodos);

    useHydrateAtoms([[todoData, todos]]);

    return <TodoList />;
};

export const TodoList = () => {
    const [todoAtoms, dispatch] = useAtom(todoAtomsAtom);

    const onAddTodo = () => {
        dispatch({
            type: "insert",
            value: {
                id: nanoid(),
                title: "",
                completed: false,
            },
        });
    };

    return (
        <ClientOnly>
            <div className="mx-auto max-w-md space-y-2 rounded-lg p-4">
                <div className="flex items-center justify-between rounded-lg p-4">
                    <h1 className="text-2xl font-bold text-white">Todo List</h1>
                    <Button onClick={onAddTodo} className="mt-4 mb-2">
                        Add Todo
                    </Button>
                </div>
                {todoAtoms.length === 0 ? (
                    <p className="text-gray-400">No todos yet. Add some!</p>
                ) : (
                    <ul className="mt-4 space-y-2">
                        {todoAtoms.map((todo) => (
                            <TodoItem
                                key={todo.toString()}
                                todoAtom={todo}
                                remove={() =>
                                    dispatch({ type: "remove", atom: todo })
                                }
                            />
                        ))}
                    </ul>
                )}
                <PublishButton />
            </div>
        </ClientOnly>
    );
};
