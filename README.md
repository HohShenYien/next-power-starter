<h1>Next Power Starter</h1>

<center>
   <img src="https://github.com/HohShenYien/next-power-starter/assets/55322546/e21721f5-bb92-49e0-9d2d-23dc7f98f30d" alt="Next Power Starter">
</center>

<!-- toc -->
<h2>Table of Contents</h2>

- [🧐 About](#-about)
- [⚡ Features](#-features)
- [🛠 Getting Started](#-getting-started)
- [🚩 Usage](#-usage)
  - [Recommended File Structure](#recommended-file-structure)
  - [Env](#env)
  - [Authentication](#authentication)
    - [Default API routes](#default-api-routes)
    - [Axios](#axios)
    - [Public \& non-Public pages](#public--non-public-pages)
    - [useSession](#usesession)
    - [Auth configs](#auth-configs)
  - [useQuery](#usequery)
  - [Modal](#modal)
  - [Zustand Store](#zustand-store)
  - [Theming](#theming)
- [📚 Library](#-library)
- [🧾 Learn More](#-learn-more)
- [🚩 TODO](#-todo)
- [🚀 Deploy on Vercel](#-deploy-on-vercel)

<!-- tocstop -->

## 🧐 About

Next Power Starter is an **optionated** Next.js starter template with flexibility & ease of use in mind.

I always find myself needing to setup the project in the same way, and oftentimes, reusing the same structures and types. Hence, I've put together the common configurations into this starter template.

PS: Due to several breaking bugs in App Router, I have reverted back to **Page Router** for now

## ⚡ Features

- **💃 Zero Setup**: After installation, you need 0 setup to begin using it, check out the [📚 Library](#-library) section to see what have been added.
- **🧑‍🏭 Extensible and Configurable**: Missing something? Easily add any library without needing to fear that it breaks.
- **🔏 Client-side Authentication**: Fully baked client side authentication with public and authenticated pages, sprinkle more logic if you need.
- **👾 UI Components**: [Mantine](https://mantine.dev) & [Tailwind](https://tailwindcss.com/) out of the box with more than enough components and styles ready for you.
- **🗄️ File Structure**: Stop worrying about a messy file structure with this starter.
- **Fully Typed**

## 🛠 Getting Started

1. You can either clone this repo, or run the following command to use the template

   ```bash
   yarn create-next-app [project-name] -e https://github.com/HohShenYien/next-power-starter
   # or
   npx create-next-app [project-name] -e https://github.com/HohShenYien/next-power-starter
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

You can start editing the page by modifying `src/pages/index.tsx`. The page auto-updates as you edit the file.

## 🚩 Usage

### Recommended File Structure

```
-src
  - components: All the general components
  - configs: Constant configurations that do not need to be kept in .env
  - features: Groups of related components for specific features
  - layouts: Layout Component
  - pages: Page Components & Routes
  - stores: Zustand stores
  - styles: Themes & styles files
  - utils: Files that don't see to belong elsewhere
```

### Env

The .env file has one variable that you might want to update

```env
# The base API URL to make any request
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Authentication

Currently, **authentication API** routes are in `src/features/Auth/queries.ts` (which you should customize), and relies on **http-only** cookie using server. You can find everything related to authentication in `src/features/Auth` folder.

For more information about the Authentication structure, check out my [article](https://blogs.shenyien.cyou/client-side-authentication-in-nextjs-using-cookies).

#### Default API routes

As defined in `src/features/Auth/queries.ts`, the following routes are created by default, but you should update them to match your needs.

The `login` and `logout` routes implement **http-only** cookie setting

```
/auth/login => POST Login route, accept
  {
    email: string,
    password: string
  }
returns {message: string}
```

```
/auth/me => Get current user details

returns {
  email: string,
  username: string
  }
```

```
/auth/logout => Logout the current user

returns {message: string}
```

#### Axios

This project uses Axios where some interceptors have already been implemented in `src/features/Auth/AxiosProvider.tsx`. This includes basic error handling and configures the `base path` for requests.

```ts
...
    const reqInterceptor = apiClient.interceptors.request.use((config) => {
      const authToken = getCookie("authToken");
      if (authToken) {
        config.headers.Authorization = `bearer ${authToken}`;
      }
      return config;
    });
...
```

#### Public & non-Public pages

Instead of router path pattern, this project uses a less conventional `page.isPublic` component attribute. By default, every page is **public**, so to make authentication compulsory for the page, you set the `isPublic` attribute to false.

For example,

```tsx
import { NextPageWithAttributes } from "@/pages/_app";

const ProtectedPage: NextPageWithAttributes = () => {
  ...
}

// This is the key line
ProtectedPage.isPublic = false;

export default ProtectedPage;
```

#### useSession

`src/features/Auth/hooks/useSession.ts` is a hook for you to quickly get current user's status as well as information if it's authenticated.

```ts
type Session = {
  user: undefined | User; // undefined if it's unauthenticated or loading
  status: "loading" | "unauthenticated" | "authenticated"
}
```

#### Auth configs

Currently, there are a few default configs defined in `src/configs/auth.config.ts`

```ts
// Where to redirect the users after successfully login
export const authRedirectPath = "/protected";
// If true, the user will be directly authenticated after registration instead of requiring a separate login, default is false
export const loginAfterRegister = false;
```

### useQuery

The recommended location to keep all the API services is in `src/features/.../queries.ts`. 

You can refer to the [useQuery documentation](https://tanstack.com/query/) for more details.

Learn more about the good `use-query` patterns in this [blog series](https://tkdodo.eu/blog/effective-react-query-keys).

### Modal

To use Mantine's modal, there are two choices here. You can either use [vanilla modal](https://mantine.dev/core/modal/) with the standard `onClose` and `open` disclosures, or [Modal Manager](https://mantine.dev/others/modals/) implemented with a global context manager that is much simpler. 

This template has implemented a **helper** for modal manager. It manages

To use it, you'll have to add the modal name, and prop types into `/src/utils/modals/types.ts`

```ts
// This is the modal names, constants to identify the modal
export const helloWorldModal = "Hello World Modal";
export const secondModal = "Second Modal";

// Add the modal here for TypeScript support
export type ModalType = typeof helloWorldModal | typeof secondModal;

// Still figuring out how to work without using this type
export type ModalInnerProps = {
  // The modal type to the props type
  [key in typeof helloWorldModal]: HelloWorldModalProps;
} & {
  [key in typeof secondModal]: {};
};
//...
```

You will also need to map the modal name to the modal component in `src/utils/modals/modals.ts`

```ts
// mapping modal name to modal Component
export const modals: Record<ModalType, MantineModal<any>> = {
  [helloWorldModal]: HelloWorldModal,
  [secondModal]: SecondModal,
  [loginModal]: LoginModal,
  [registerModal]: RegisterModal,
  [modalNameImported]: ModalComponentCreated
};
```


```ts
openModal({
  type: "<Modal Name>",
  innerProps: {
    // props go here
  },
});
```

### Zustand Store

While using Zustand's `persist` middleware, there'll be [hydration mismatch](https://github.com/pmndrs/zustand/issues/1145), that is, server-side rendered contents do not match client side contents. This happens because `localStorage` can only be retrieved on the frontend.

A temporary solution here is using `useStore` hook from here, where the values are only retrieved after client renders.

```ts
const { bears, increase } = useStore(
  useBearStore,
  (state) => state
) ?? // The defaults are set here as they will be empty before client renders
{
  bears: 0,
  increase: () => null,
};
```

### Theming

This starter has filled up all Tailwind colors in Mantine's theme.

To customize Mantine's component theme globally, edit `src/styles/MantineTheme.ts`.

## 📚 Library

Next Power Starter includes the following packages out of the box:

- [Mantine](https://mantine.dev/): A React **Component library** which supports _almost_ all components you can think of. It also provides dark-mode support and utility hooks that I often find handy.

- [Tailwind CSS](https://tailwindcss.com/): Mantine sometimes lacks the granularity in designing the styles. Tailwind comes naturally as the optimal choice to fill in the gap.

- [useQuery](https://tanstack.com/query/): No more 🙅‍♂️ `fetching` in `useEffect`. Also provides caching and various other powerful features like refetch, loading state, etc.

- [Zustand](https://github.com/pmndrs/zustand): A small but powerful state management library so that we don't need to be bothered about Redux anymore.

- [TypeScript](https://www.typescriptlang.org/): This project is fully typed.

- [Zod](https://zod.dev/): Stop writing your own rules for validation, use Zod instead.

## 🧾 Learn More

To learn more about the technologies used, refer to their respective documentations from the link provided above.

## 🚩 TODO

- [ ] Improve documentation

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out Vercel's [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
