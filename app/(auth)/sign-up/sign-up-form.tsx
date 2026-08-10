'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignUpDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { signUpUser } from "@/lib/actions/user.actions";
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useSearchParams } from "next/navigation";

const SignUpBottom = () => {
    const { pending } = useFormStatus();

    return (
        <Button className="w-full" variant="default" disabled={pending}>
            {pending ? 'Submitting...' : 'Sign In'}
        </Button>
    );
}

const SignUpForm = () => {

    const [data, action] = useActionState(signUpUser, {
        success: false,
        message: '',
    });

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';


    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div className="space-y-6">
                <div>
                    <Label htmlFor="email">
                        Name
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        defaultValue={SignUpDefaultValues.name}
                    />
                </div>
                <div>
                    <Label htmlFor="email">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        defaultValue={SignUpDefaultValues.email}
                    />
                </div>
                <div>
                    <Label htmlFor="password">
                        Password
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        defaultValue={SignUpDefaultValues.password}
                    />
                </div>
                <div>
                    <Label htmlFor="confirmPassword">
                        Confirm Password
                    </Label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="current-password"
                        required
                        defaultValue={SignUpDefaultValues.confirmPassword}
                    />
                </div>
                <div>
                    <SignUpBottom />
                </div>

                {data && !data.success && (
                    <div className="text-center text-destructive">
                        {data.message}
                    </div>
                )}

                <div className="text-sm text-center text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/sign-in" target='_self' className="link">Sign In</Link>
                </div>
            </div>
        </form>
    );
}

export default SignUpForm;