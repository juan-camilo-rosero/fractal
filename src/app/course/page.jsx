'use client'

import { useRouter } from 'next/navigation'

function Page() {
    const router = useRouter();
    router.push("/dashboard");

    return (
        <div>Redirecting...</div>
    )
}

export default Page;
