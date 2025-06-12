import { ClerkProvider, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        // Redirect to sign-in if not authenticated
        if (!pageProps.isSignedIn) {
            router.push('/sign-in');
        }
    }, [pageProps.isSignedIn]);

    return (
        <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}>
            <RedirectToSignIn />
            <Component {...pageProps} />
        </ClerkProvider>
    );
}

export default MyApp; 