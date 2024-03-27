<h1 style="text-align:center">Personal Page App</h1>
<h6>By Andony ALONSO TORT</h6>

An application so that users can personalize their own resume.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open App in [http://localhost:3000](http://localhost:3000).

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

<br/>

Database has been created with [vercel](./https://vercel.com), you have to create a new postgres database and fill your .env file corresponding with your db credentials in vercel.

Seeding database structure and some initial data test with command: `npm run seed`
Test code with lint: `npm run lint`
Build in production: `npm run build`


For the login, we need to generate a secret key for the application. This key is used to encrypt cookies, ensuring the security of user sessions. Run the following command : `openssl rand -base64 32`

Then, in .env file, add the generated key to the AUTH_SECRET variable:

`AUTH_SECRET=your-secret-key`

NOTE : For auth to work in production, we'll need to update our environment variables in your Vercel project too.




`Author: Andoni ALONSO TORT`