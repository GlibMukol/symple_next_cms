"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

interface IFormButtonProps {
    children: React.ReactNode
}

export default function FormButton({ children }: IFormButtonProps) {
    const { pending } = useFormStatus();
    return <Button type="submit" isLoading={pending}>{children}</Button>
}