import { Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/multiple_uses/button';


export default function Unauthorized() {
    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
                <Lock className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Unauthorized Access</h1>
                <p className="mt-4 text-muted-foreground">
                    You do not have the necessary permissions to access this resource. Please contact your administrator for
                    assistance.
                </p>
                <Link href="/">
                    <Button >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go back to Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}