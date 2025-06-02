import { InputTestCase } from "../types";

export function generateStdinFromInputs(inputs: InputTestCase[]): string {
    return inputs.map((input) => input.value).join("\n");
}
