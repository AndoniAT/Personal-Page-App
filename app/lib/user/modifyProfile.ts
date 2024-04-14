'use server';

import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getUserByEmail, getUserByUsername } from '../data';
import bcrypt from 'bcrypt';
import { User } from '../definitions';

const FormSchema = z.object({
  user_id: z.string().uuid({
    message: "Please enter a valid UUID for user_id",
  }),
  firstname: z.string({
    invalid_type_error: 'Please enter your firstname.',
  }).min(1, { message: "Fistname is required" }),
  lastname: z.string({
    invalid_type_error: 'Please enter your lastname.',
  }).min(1, { message: "Lastname is required" }),
  username: z.string({
    invalid_type_error: 'Please enter your username.',
  }).min(1, { message: "Username is required" }),
  email: z.string({
    invalid_type_error: 'Please enter your email.',
  }).email()
});

const FormPasswordSchema = z.object({
    password: z.string({
      invalid_type_error: 'Please enter a password.',
    }).min(6, { message: "Enter a password of at least 6 characters" }),
    confirm: z.string({
      invalid_type_error: 'Please confirm your password.',
    }).min(1, { message: "Please confirm your password." }),
  }).refine(
    (data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

type ErrorsUpdateUser = {
  user_id: string[];
  firstname: string[];
  lastname: string[];
  username: string[];
  email: string[];
  password: string[];
  confirm: string[];
}

export type Mystate = {
  errorss: ErrorsUpdateUser;
  message: string;
};

const UpdatePassword = FormPasswordSchema;
const UpdateUser = FormSchema;

export async function modifyProfile(
    prevState: Mystate,
    formData: FormData,
  ):Promise<Mystate> {

    noStore();
    let user_id = formData.get('user_id') as string;
    
    if( !user_id )  {
      throw new Error('user_id required');
    }

    let success = true;
    let errorss = { 
      user_id:[], 
      firstname:[], 
      lastname:[], 
      username:[], 
      email:[], 
      password:[], 
      confirm:[]
    } as ErrorsUpdateUser;

    // User information
    const validFields = UpdateUser.safeParse({
        user_id: formData.get('user_id'),
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname'),
        username: formData.get('username'),
        email: formData.get('email')
    });

    if (!validFields.success) {
      errorss = validFields.error.flatten().fieldErrors as ErrorsUpdateUser;
      success = false;
    }
    // ===========

    // User pwd
    let password = formData.get('password') as string;
    let changePassword = password != '';

    if( changePassword ) {
      const validFieldsPwd = UpdatePassword.safeParse({
        password: formData.get('password'),
        confirm: formData.get('confirm')
      });

      if (!validFieldsPwd.success) {
        let err = validFieldsPwd.error.flatten().fieldErrors;
        errorss.password = ( err.password ) ? err.password : [];
        errorss.confirm = ( err.confirm ) ? err.confirm : [];
        success = false;
      }
    }

    // ===========
    
    let userBeforeUpdate = (await sql`SELECT * FROM USERS WHERE user_id = ${user_id}`).rows[ 0 ] as User;
    if( !userBeforeUpdate ) success = false;


    if( !success ) {
      return {
        errorss:errorss,
        message:'Filed to update the User.'
      }
    }

    // Update user information
    if( validFields.success ) {
      const { user_id, firstname, lastname, username, email } = validFields.data;

      // Check if user exists by username
      let userByUsername = await getUserByUsername( username );
      if( userByUsername && userByUsername.user_id != user_id && errorss.username ) {console.log('username exists');
        errorss.username.push( 'This username already exists' );
        success = false;
      }

      // Check if user exists by email
      let userByEmail = await getUserByEmail( email );
  
      if( userByEmail && userByEmail.user_id != user_id && errorss.email ) {
        errorss.email.push( 'This email already exists' );
        success = false;
      }

      try {
          await sql`
          UPDATE USERS 
          SET 
          username = ${username}, 
          firstname = ${firstname}, 
          lastname = ${lastname}, 
          email = ${email}
          WHERE user_id = ${user_id}`;
      } catch( e:any ) {
          throw new Error( e?.message );
      }
    }

    
    // Update user pwd
    if ( changePassword ) {
      const hashedPassword = await bcrypt.hash( password, 10 );

        await sql`
        UPDATE USERS 
        SET 
        password = ${hashedPassword}
        WHERE user_id = ${user_id}`;
    }

      if( !success ) {
        //console.log('errors', errorss);
        return {
          errorss: errorss,
          message: 'Failed to Create User.'
        };
      }

      let username = formData.get('username');
      if( userBeforeUpdate.username != username ) {
        redirect(`/${username}/editprofile`);
      } else {
        revalidatePath(`/${username}/editprofile`);
        return {
          errorss:errorss,
          message:'OK'
        }
      }
}