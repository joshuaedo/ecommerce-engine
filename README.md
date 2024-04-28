# Admin - Headless content management

## Table of Contents

- [Introduction](#introduction)
- [Frameworks](#frameworks)
- [UI](#ui)
- [Hooks and Utilities](#hooks-and-utilities)
- [Code quality](#code-quality)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [License](#license)
- [Author](#author)

## Introduction

Admin (HCM), is an independent application serves as an administrative interface that allows users to manage data and settings for their websites.

### Frameworks

- [Next.js](https://nextjs.org/) – React framework for building performant apps with the best developer experience
- [Auth.js](https://authjs.dev/) – Handle user authentication with ease with providers like Google etc.
- [React Query](https://tanstack.com/query) – Efficient data fetching and state management library for React applications

### UI

- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development
- [Radix](https://www.radix-ui.com/) – Primitives like modal, popover, etc. to build a stellar user experience
- [Shadcn UI](https://ui.shadcn.com/) – Beautifully designed components that you can copy and paste into your app.
- [Lucide](https://lucide.dev/) – Beautifully simple, pixel-perfect icons
- [geist](https://vercel.com/font) – A typeface specifically designed for developers and designers. 
- [next-themes](https://github.com/pacocoursey/next-themes) – A library for adding dark mode support to Next.js applications

### Hooks and Utilities

Some custom React hooks and utilities to enhance functionality and development efficiency:

- `useDate`: Provides current date and time information with automatic updates.
- `useOnClickOutside`: Listens for clicks or touch events outside a specified element and invokes a handler function.
- `cn`: Merges and formats CSS classes for easier class name management, particularly useful for Tailwind CSS integration.
- `useAutoFocus`: Sets focus automatically on a specified element.
- `useCustomToast`: Creates custom toast notifications for displaying messages to users.
- `useMagneticism`: Adds magnetic effect to a specified element based on mouse movement.
- `useMounted`: Tracks whether the component is mounted or not.
- `useMediaQuery`: Tracks the result of a specified media query.

### Code Quality

- [TypeScript](https://www.typescriptlang.org/) – Static type checker for end-to-end typesafety
- [Zod](https://github.com/colinhacks/zod) – A powerful TypeScript-first validation and parsing library for robust data handling.
- [Prettier](https://prettier.io/) – Opinionated code formatter for consistent code style
- [ESLint](https://eslint.org/) – Pluggable linter for Next.js and TypeScript

### To do

&#9745; Add products feature

 &#9744; Build home page

 &#9745; Add description to shop model

 &#9744; Implement multiple image upload in products feature

 &#9744; Make general image cleaner utility function

 &#9744; Add logo, favicon and metadata

 &#9744; Make layout responsive

 &#9744; Add forgot password feature

### Prerequisites

Before you begin, ensure you have the following software installed:

- Node.js
- npm or Yarn

### Usage

Follow these steps to set up and run admin locally.

1. Create a new project:

   ```bash
   npx create-next-app --example https://github.com/joshuaedo/admin
   ```

 2.  Create a `.env` file in the project root and add the following variables:

   ```env
   NEXTAUTH_SECRET=your_next_auth_secret
   NEXTAUTH_URL=your_next_auth_url
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   DATABASE_URL=your_database_url
   ```

   Replace the placeholders with your actual Next Auth and Google OAuth credentials.

 3. Run the development server:

   ```bash
   npm run dev
   ```

   The application should be accessible at `http://localhost:3000`.

## License

This project is licensed under the MIT [License](https://github.com/joshuaedo/admin/blob/main/LICENSE) 

## Author

- Joshua Edo ([joshuaedo.com](https://joshuaedo.com))


