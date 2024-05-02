'use server';

import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { string, z } from 'zod';
import { getUserByEmail, getUserByUsername } from '../data';
import bcrypt from 'bcrypt';
import { createNewBlock } from '../blocks/actions';
import { Section } from '../definitions';

const specialCharactersRegex = /^[a-zA-Z0-9]*$/;

const FormSchema = z.object({
  firstname: z.string({
    invalid_type_error: 'Please enter your firstname.',
  }).min(1, { message: "Fistname is required" }),
  lastname: z.string({
    invalid_type_error: 'Please enter your lastname.',
  }).min(1, { message: "Lastname is required" }),
  username: z.string({
    invalid_type_error: 'Please enter your username.',
  }).min(1, { message: "Username is required" })
  .regex(specialCharactersRegex, {
    message: 'Le nom d\'utilisateur ne peux pas contenir des caractères spéciaux.'
  })
  ,
  email: z.string({
    invalid_type_error: 'Please enter your email.',
  }).email(),
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


type ErrorsCreateUser = {
  firstname: string[];
  lastname: string[];
  username: string[];
  email: string[];
  password: string[];
  confirm: string[];
}

export type State = {
  errors: ErrorsCreateUser|{};
  message: string | null;
};

const CreateUser = FormSchema;

export async function createAccount(
    prevState: State,
    formData: FormData,
  ) {
    noStore();

    const validFields = CreateUser.safeParse({
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname'),
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirm: formData.get('confirm'),
    });
      
    if (!validFields.success) {
      // If validatedFields isn't successful, we return the function early with the error messages from Zod.
      return {
        errors: validFields.error.flatten().fieldErrors,
        message: 'Failed to Create User.'
      };
    }

    // Prepare data
    const { 
      firstname, lastname, username, email,
      password, confirm } = validFields.data;

      let errors = { 
        firstname:[], 
        lastname:[], 
        username:[], 
        email:[], 
        password:[], 
        confirm:[]
      } as ErrorsCreateUser;

      let success = true;

      // Check if user exists by username
      let userByUsername = await getUserByUsername( username );
      if( userByUsername && errors.username ) {
        errors.username.push( 'This username already exists' );
        success = false;
      }

      // Check if user exists by email
      let userByEmail = await getUserByEmail( email );

      if( userByEmail && errors.email ) {
        errors.email.push( 'This email already exists' );
        success = false;
      }

      if( !success ) {
        return {
          errors: errors,
          message: 'Failed to Create User.'
        };
      }
      const hashedPassword = await bcrypt.hash( password, 10 );

      let userInsert = await sql`
      INSERT INTO USERS ( username, firstname, lastname, email, password )
      VALUES ( ${username}, ${firstname}, ${lastname}, ${email}, ${hashedPassword} )
      RETURNING user_id`;

      let userInsertId = userInsert.rows[ 0 ].user_id;
      
      if( userInsertId ) {

        // Create a default resume for user
        let resumeInsert = await sql`
          INSERT INTO RESUME ( user_id )
          VALUES ( ${userInsertId} ) RETURNING resume_id`;
        
        let resumeInsertId = resumeInsert.rows[ 0 ].resume_id;
        
        // Create a home default section
        if( resumeInsertId ) {
          let homeName = 'Home';
          let public_section = true;
          let css = {};

          let homeInsert = (await sql`INSERT INTO SECTION ( 
            name, 
            public, 
            ishome,
            css,
            resume_id )
          VALUES ( 
            ${homeName}, 
            ${public_section},
            ${true}, 
            ${JSON.stringify( css )},
            ${resumeInsertId} 
          )
          RETURNING section_id`).rows[ 0 ] as Section
          await createNewBlock.call({section_id: homeInsert.section_id, username: username })
        }
      }
      
      /*return {
        errors: errors,
        message: 'Create User created'
      };*/
      redirect(`/login`);

}