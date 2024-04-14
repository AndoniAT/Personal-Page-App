import { auth } from '@/auth';
import { notFound, redirect, RedirectType } from 'next/navigation'
import { getUserByEmail, getUserByUsername } from './data';
import { revalidateTag } from 'next/cache';

export async function goToLogin() {
    'use server'
    redirect('/login');
}

export async function goToCreateAccount() {
    'use server'
    redirect('/createAccount');
}

export async function goToMyresume() {
    'use server'
    let session = await requiresLogin();

    if( session?.user?.email ) {
        let { username } = await getUserByEmail( session.user?.email);
        redirect(`/resumes/${username}`);
    }
}

export async function goHome() {
    'use server'
    redirect('/', RedirectType.replace );
}

/**
 * Verify if the connected user is accesing to his own information
 * @param username : Of the requested user information
 */
export async function requiresSessionUserProperty( username:string ) {
    'use server'
    let session = await requiresLogin();
    const user = await getUserByUsername( username );

    if( !user ) {
        notFound();
    }

    if( !session || session.user?.email != user.email ) {
        throw new Error('You don\'t have acces to this action');
    }
}


export async function requiresLogin() {
    'use server'
    let session = await auth();
    if( !session ) {
        throw new Error('You are not login');
    }
    return session;
}

export async function customRevalidateTag(tag: string) {
    'use server'
    revalidateTag( tag );
}