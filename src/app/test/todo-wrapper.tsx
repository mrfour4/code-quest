"use client";

import { useAtom } from "jotai";
import { todosAtom } from "./atom";

export const TodoWrapper = () => {
    const [todos, setTodos] = useAtom(todosAtom);
    console.log("🚀 ~ TodoWrapper ~ todos:", todos);

    return <div>Todos</div>;
};
