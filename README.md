# Next Power Starter

## 🧐 About

Next Power Starter is an **optionated** Next.js starter template with flexibility & ease of use in mind.

I always find myself needing to setup the project in the same way, and often times, reusing the same structures and types. Hence, I've put together the common configurations into this starter template.

PS: It uses Next.js 13's [App Router](https://nextjs.org/docs/app).

## ⚡ Features

Next Power Starter includes the following features out-of-the-box:

- [Mantine](https://mantine.dev/): A React UI library which supports _almost_ all components you can think of. It also provides dark-mode support and utility hooks that I often find handy.

- [Tailwind CSS](https://tailwindcss.com/): Mantine sometimes lacks the granularity in designing the styles. Tailwind comes naturally as the optimal choice to fill in the gap.

- [useQuery](https://tanstack.com/query/): No more 🙅‍♂️ `fetching` in `useEffect`. Also provides caching and various other powerful features like refetch, loading state, etc.

- [Zustand](https://github.com/pmndrs/zustand): A small but powerful state management library so that we don't need to be bothered about Redux anymore.

- [TypeScript](https://www.typescriptlang.org/): This project is fully typed.

## 🛠 Getting Started

1. You can either clone this repo, or alternatively, run the following command to use the template

   ```bash
   yarn create next-app [project-name] -e [GitHub URL]
   # or
   npx create-next-app [project-name] -e [GitHub URL]
   ```

   Alternatively, you can click `Use this template` button from GitHub.

2. Install the dependencies

   ```bash
   yarn
   # or
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 🧾 Learn More

To learn more about the technologies used, refer to their respective documentations from the link provided in the features.

## 🚩 TODO

- [] Improve documentation
- [] Include a top header navbar
- [] Authentication Management using Cookies
- [] 404 & 500 page
- [] Option to use JWT for authentication

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out Vercel's [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
