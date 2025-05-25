export type TestCase = {
    id: string;
    inputs: { label: string; value: string }[];
    expected: string;
};
