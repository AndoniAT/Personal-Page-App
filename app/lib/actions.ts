import { auth } from '@/auth';
import { notFound, redirect, RedirectType } from 'next/navigation'
import { getUserByUsername } from './data';

export async function goToLogin() {
    'use server'
    redirect('/login');
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
    let session = await auth();
    const user = await getUserByUsername( username );

    if( !user ) {
        notFound();
    }

    if( !session || session.user?.email != user.email ) {
        throw new Error('You don\'t have acces to this page');
    }
}
