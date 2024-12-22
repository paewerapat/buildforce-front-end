import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Loading from '../components/notification/Loading'

function Lgout() {

    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            signOut({ redirect: false })
        } else if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status])

    return (
        <Loading />
    )
}

export default Lgout