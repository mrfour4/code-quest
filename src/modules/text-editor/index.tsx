import { useParams } from "next/navigation";
import { Editor } from "./editor";

export const TextEditor = () => {
    const { documentId } = useParams<{ documentId: string }>();

    return <Editor />;
};
