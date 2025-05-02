import { SignIn } from "@clerk/nextjs";

export const SignInForm = () => {
    return (
        <div className="flex size-full items-center justify-center">
            <SignIn />
        </div>
    );
};
