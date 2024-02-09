"use client";

import { NextUIProvider } from '@nextui-org/react';

interface ProviderProps {
    children: React.ReactNode
}

export default function Provideres({ children }: ProviderProps) {
    return <NextUIProvider>
        {children}
    </NextUIProvider>
}