import { redirect, RedirectType } from 'next/navigation'

export async function goToLogin() {
    'use server'
    redirect('/login');
}

export async function goHome() {
    'use server'
    redirect('/', RedirectType.replace );
}