import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const SignInBtn = () => {
    return (
        <>
            <SignedOut>
                <SignInButton mode="modal">
                    <Button variant="ghost">Sign In</Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </>
    );
};
