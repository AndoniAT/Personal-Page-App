import { notFound } from "next/navigation"

export default async function Page(){
    notFound();
    return (
            <main>
                Check
            </main>
    )
}