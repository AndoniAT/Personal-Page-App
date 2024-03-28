import { put, del  } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

/**
 * Upload image to server
 * @param formData 
 * @returns 
 */
export async function uploadImage(formData: FormData) {
    'use server'
    const imageFile = formData.get('image') as File;
    const blob = await put(imageFile.name, imageFile, {
      access: 'public',
    });
    revalidatePath('/');
    return blob;
}

export async function deleteImage(formData: FormData) {
  'use server'
  const urlToDelete = formData.get('url') as string;
  await del(urlToDelete);
 
  return new Response();
}