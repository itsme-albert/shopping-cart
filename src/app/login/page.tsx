'use client';
import { ClerkProvider, SignIn } from '@clerk/nextjs';
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient("https://befitting-mockingbird-971.convex.cloud");

export default function Login() {

    return (
        <ClerkProvider publishableKey="pk_test_cG9zaXRpdmUteWV0aS03NS5jbGVyay5hY2NvdW50cy5kZXYk">
            <ConvexProvider client={convex}>
                <SignIn path="/login" routing="path" />
            </ConvexProvider>
        </ClerkProvider>
    );
}
