import { atom } from "jotai";
import { atomWithStorage, splitAtom } from "jotai/utils";
import { Doc } from "../../../convex/_generated/dataModel";

// export type Todo = {
//     id: string;
//     title: string;
//     completed: boolean;
// };

// export const todosAtom = atomWithStorage<Todo[]>("todos", []);
// export const todoAtomsAtom = splitAtom(todosAtom, (todo) => todo.id);

export type Todo = {
    id: string;
    title: string;
    completed: boolean;
};

export const todosAtom = atomWithStorage<Todo[]>("todos", [
    { id: "1", title: "Sample Todo", completed: false },
]);
export const todoAtomsAtom = splitAtom(todosAtom, (todo) => todo.id);

export const todoData = atom(null, (_, set, data: Doc<"todos">[]) => {
    const todos = data.map((todo) => ({
        id: todo._id,
        title: todo.title,
        completed: todo.completed,
    }));
    set(todosAtom, todos);
});

// export const fetchTodos = async () => {
//     return await fetchQuery(api.todos.getAll, {});
// };
