/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ShippingAddress } from "@/types";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { shippingAddressSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { z } from "zod";
import { shippingAddressDefaultValues } from "@/lib/constants";
import { updateUserAddress } from "@/lib/actions/user.actions";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const FormInput = ({
    control,
    name,
    label,
    placeholder,
}: {
    control: any;
    name: string;
    label: string;
    placeholder?: string;
}) => {
    const { field, fieldState } = useController({ name, control });

    return (
        <Field className="w-full" data-invalid={!!fieldState.error}>
            <FieldLabel>{label}</FieldLabel>
            <Input
                placeholder={placeholder}
                {...field}
                aria-invalid={!!fieldState.error}
            />
            <FieldError>{fieldState.error?.message}</FieldError>
        </Field>
    );
};

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof shippingAddressSchema>>({
        resolver: zodResolver(shippingAddressSchema),
        defaultValues: address || shippingAddressDefaultValues,
    });

    const [isPending, startTransition] = useTransition();

    const onSubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (
        values
    ) => {
        startTransition(async () => {

            const res = await updateUserAddress(values);

            if (!res.success) {
                toast.error(res.message);
                return;
            }
            router.push('/payment-method');
        });
    };

    return (
        <div className="max-w-md mx-auto space-y-4">
            <h1 className="h2-bold mt-4">Shipping Address</h1>
            <p className="text-sm text-muted-foreground">
                Please enter and address to ship to
            </p>

            <form
                method="post"
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex flex-col md:flex-row gap-5">
                    <FormInput
                        control={form.control}
                        name="fullName"
                        label="Full Name"
                        placeholder="Enter full name"
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    <FormInput
                        control={form.control}
                        name="streetAddress"
                        label="Address"
                        placeholder="Enter address"
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    <FormInput
                        control={form.control}
                        name="city"
                        label="City"
                        placeholder="Enter city"
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    <FormInput
                        control={form.control}
                        name="postalCode"
                        label="Postal Code"
                        placeholder="Enter postal code"
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    <FormInput
                        control={form.control}
                        name="country"
                        label="Country"
                        placeholder="Enter country"
                    />
                </div>

                <div className="flex gap-2">
                    <Button type="submit" disabled={isPending}>
                        {isPending ? (
                            <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                            <ArrowRight className="w-4 h-4" />
                        )}{' '}
                        Continue
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ShippingAddressForm;