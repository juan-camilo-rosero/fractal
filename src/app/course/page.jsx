'use client'

import { useRouter } from 'next/navigation'

function page() {
    const router = useRouter();
    router.push("/dashboard");

    return (
        <div>Redirecting...</div>
    )
}

export default page;
