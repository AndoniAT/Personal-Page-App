<h1 class="text-center" style="background-color: rgb(226 232 240 / var(--tw-bg-opacity, 1));
 padding: 5px;"> Resumes Social Network in NextJs + PostgreSQL + Vercel
 <img src="https://github.com/user-attachments/assets/0f0f9f25-769a-49f3-a68e-ae3f4a71748e" width="100"/>
 </h1>
<h4>Author : Andoni ALONSO TORT</h4>

### React + NextJs + TypeScript + Vercel + PortgreSQL

# [Visit the project in production](https://mypersonalresume.vercel.app/resumes/AndoniAT)

An application so that users can personalize their own resume.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project is a modern web application developed with Next.js and deployed on Vercel, combining profile management, web page customization, and social features. It allows users to create and personalize their own responsive website, add interactive content (text, images, HTML, YouTube videos, etc.), and easily manage styling through a visual interface without coding.

The application features secure authentication with NextAuth, advanced role and permission management, and an image storage system using UploadThing. Each user can search for and follow other profiles, turning the application into an interactive social network.

With a smooth user experience, an intuitive interface, and a secure architecture, this project provides a complete solution for creating, customizing, and sharing online content.

## 🔒 Security & Authentication
  - Secure authentication with NextAuth, ensuring reliable session management.
  - Route protection based on user roles: access is restricted according to defined permissions.
  - Error handling with clear messages to inform the user.

## 🛠️ Main Features
### Profile Management & Social Network
  - Each user has a personal profile, including an image gallery stored via UploadThing.
  - Ability to search for and follow other users, creating a social network dynamic.
  - Profile view, edit, and delete functionalities.

### 📄 Responsive Web Page Editor
  - Each user can create and customize their own responsive web page with five screen types: 2XL, XL, LG, MD, and Mobile.
  - The profile serves as the default homepage, but multiple sections/pages can be added.
  - Available elements on a page:
    - Text
    - Images
    - Custom HTML content
    - iFrame (e.g., YouTube)
    - Each element can be visually customized through an intuitive interface, without the need to code in CSS.

### 🔗 Navigation & User Experience
  - Dynamic links to reference other elements or pages within the application.
  - Skeleton loading with Suspense to enhance fluidity and prevent waiting times during data loading.
  - Real-time error handling to guide users in case of issues with forms or data loading.

### 🚀 Deployment & Technologies
  - Front-end: Next.js (React)
  - Back-end: RESTful API with PostgreSQL
  - File Storage: UploadThing
  - Hosting: Vercel

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

<hr/>

# Other project details

## == 🏠 Home Page ==

On the homepage, there will be a brief presentation of the application. There is also a left-side navbar with login and account creation buttons. This menu can be hidden using the arrow in the middle to view the page in full.

<div style="flex inline-flex">
  <img src="https://github.com/user-attachments/assets/a5755064-8d69-4298-9d8e-a8ee9a4db539" width="500"/>
  <img src="https://github.com/user-attachments/assets/8e035f32-d21c-4a46-aae8-c6642937785e" width="500"/>



## == 🔒 Login / Crreate Account ==
<div style="flex inline-flex">
  <img src="https://github.com/user-attachments/assets/326ab5e7-dcce-424c-8018-095963cfe0f3" width="500"/>
  <img src="https://github.com/user-attachments/assets/7c5fc96a-3fd6-4399-8612-e539267e9218" width="500"/>
</div>

## == 🔒 Profile ==

The profile consists of several parts:
  - Sections: All the sections that have been created; new ones can be added.
  - View/Edit Button
  - Image Gallery
  - Styles
  - Section Content

<div style="flex inline-flex">
    <img src="https://github.com/user-attachments/assets/5ff523dc-0614-4987-9669-0ce62492f2d3" width="500"/>
    <img src="https://github.com/user-attachments/assets/26fe6448-7152-454b-8cdf-20c4787062a2" width="500"/>
</div>

### ✅ Create Elements

To create an element, simply select the blocks you want to merge, choose the type of element you want to create, and define the content.

<div style="flex inline-flex">
  <img src="https://github.com/user-attachments/assets/de35d75c-d72c-4219-802d-481629b66d67" width="500"/>
  <img src="https://github.com/user-attachments/assets/1623a361-a03f-4cd7-9228-c26eaec9f145" width="500"/>
</div>

<b>⛰️Image element</b>

To create an image, simply select one from your gallery. It will be displayed automatically. New images can also be added.
<div style="flex inline-flex">
  <img src="https://github.com/user-attachments/assets/f70fd92b-d5a2-44e8-b978-fa76009aecdd" width="500"/>
</div>

<b><💻/> HTML element</b>

If you want a more customizable element, you can also add your own HTML styles and apply any styles you like.

<div style="flex inline-flex">
  <img src="https://github.com/user-attachments/assets/cd44afbc-c9e8-4eec-b681-1199801910b8" width="500"/>
</div>

<b>⛓️‍💥 Reference element</b>

A window displaying all your elements by type will appear, allowing you to select the reference element.
You can also create a new element from an existing one to copy its content and styles instead of recreating it multiple times.

<div style="flex inline-flex">
  <img src="https://github.com/user-attachments/assets/0196ba2e-4b7d-4f77-abaf-be16feac8729" width="500"/>
</div>
<br/>

<b>👁️ Displays </b>

You can customize the appearance based on the screen size.

<div style="flex inline-flex">
   <img src="https://github.com/user-attachments/assets/09d8bcda-fb4c-427d-9ab6-c1bd1d55196e" width=500"/>
   <img src="https://github.com/user-attachments/assets/59b1f960-2a33-4671-b8da-c9326c3f58dd" width="500"/>
</div>

### ✏️ Modify Elements

When selecting an element, a modification window will appear. You can edit any styles you want or add a link to make the element clickable. On the bottom you'll find a button tu delete the element.

All changes are made in real-time, allowing the user to see the site's appearance instantly. 🕛

<div style="flex inline-flex">
  <img src="https://github.com/user-attachments/assets/0d6440c9-6bba-4374-b511-aacb81d53339" width="500"/>
  <img src="https://github.com/user-attachments/assets/9671bd69-d798-41f1-bb7c-55c301272ced" width="500"/>
</div>



<hr/>
<h5>Author: <i>Andoni ALONSO TORT</i><h5>
