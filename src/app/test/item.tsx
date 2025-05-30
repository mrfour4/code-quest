import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PrimitiveAtom } from "jotai";
import { useImmerAtom } from "jotai-immer";
import { X } from "lucide-react";
import { Todo } from "./atom";

type Props = {
    todoAtom: PrimitiveAtom<Todo>;
    remove: () => void;
};

export const TodoItem = ({ todoAtom, remove }: Props) => {
    const [todo, setTodo] = useImmerAtom(todoAtom);

    const onTodoChange = <K extends keyof Todo>(key: K, value: Todo[K]) => {
        setTodo((draft) => {
            draft[key] = value;
        });
    };

    return (
        <div className="flex items-center gap-2">
            <Checkbox
                checked={todo.completed}
                onCheckedChange={(checked) =>
                    onTodoChange("completed", !!checked)
                }
            />
            <Input
                value={todo.title}
                onChange={(e) => onTodoChange("title", e.target.value)}
            />
            <Button variant="outline" size="icon" onClick={remove}>
                <X />
            </Button>
        </div>
    );
};
