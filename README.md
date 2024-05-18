# Review to Refactor

- commit w/ number and comments w/ same number in files

## setup boilerplate

- NextJS 14
  - package manager: pnpm
  - `pnpm dlx create-next-app@latest`

- vscode 
  - extensions 
  - settings
  - snippets

- shadcn/ui 
  - `pnpm dlx shadcn-ui@latest init`
  - tailwind.config.ts | components.json
  - globals.css | utils.ts

- prettier integration
  - `pnpm add -D prettier eslint-config-prettier prettier-plugin-tailwindcss`
  - prettier.config.mjs + prettier-plugin-tailwindcss
  - package.json + script w/ prettier
  - .eslintrc.json(old) + extends prettier

- eslint
  - [ ] read fast eslint 9 documentation for the future updates
  - eslint.config.mjs(new) like prettier.config.mjs convention

## UI Layout setup

- CenterWrapper component
- new snippet `tsx-slot`
- [ ] read and take notes on [Tailwind Layout](https://tailwindcss.com/docs/container)

---

## Hero section

- app/page.tsx
- lucid icons `pnpm install lucide-react`

- `Phone` component
  - extends `HTMLAttributes<HTMLDivElement>`
  - z-index
  - pointer-events-none, select-none

- `Navbar` component
  - shadcn button `pnpm dlx shadcn-ui@latest add button`
  - using buttonVariants

- Change Theme from Shadcn
  - replace @layer base

## Kinde Authentication Integration

- kinde.com
  - sign up by my github account
  - business, domain, region
  - tech NextJS
  - Email, FB, Google, X, Github
  - connect to NextJS codebase
- QuickStart Documentation
  - Select Existing codebase
  - URL `http://localhost:3000`
  - Dep `pnpm i @kinde-oss/kinde-auth-nextjs`
  - Update `.env.local` env vars
  - API endpoint `src/app/api/auth/[kindeAuth]/route.ts`
  - Rerun `pnpm run dev` to load env vars
- [NextJS SDK Documentation](https://docs.kinde.com/developer-tools/sdks/backend/nextjs-sdk/)

## Animated landing page 1

- home page customers review section
- space between words and span
  - `text-balance` to style Heading text+`{' '}`+spanText
- Icon Component for custom svg control

- `Reviews` Component with animation
  - `pnpm add framer-motion` 
  - Review (enter animation) `useInView`
  - ReviewColumn (marquee animation)
  - ReviewGrid (screen size affect display mode)
  - Reviews/container (gradient blur effect)
  - tailwind.config.ts customize keyframes and animations
  - constants
  - utils

- anther marketing section
- Footer

## file upload page

- page configure/upload
- `pnpm add react-dropzone`
- flex box review
- `pnpm dlx shadcn-ui@latest add progress`

- Free upload service [uploadthing](https://uploadthing.com/)
- sign in with github
- create a app 
  - named josh-casecobra with default setting
- dashboard API keys
  - copy and paste to .env.local
- read integration [documentation](https://docs.uploadthing.com/getting-started/appdir)
- `pnpm add uploadthing @uploadthing/react`
- app/api/uploadthing/core.ts
- app/api/uploadthing/route.ts
- lib/uploadthing.ts hooks
- `pnpm add zod` for server to client full-type

- useUploadthing hook
- `pnpm dlx shadcn-ui@latest add toast` for file format rejection

- ConfigureStep Component

## configuration page 1

- [neon postgres](https://neon.tech/)
  - github sign up
  - project: Springer, database: neon, region: Singapore
  - copy postgres URL to .env.local
- `pnpm add prisma @prisma/client`
- `npx prisma init` create a prisma setup
- src/db/index.ts
- modify schema.prisma then `npx prisma db push`
  - change .env.local to .env
  - table format appear in neon database
- Do Not Delete .env directly. Backup First!!!

- `pnpm add sharp@0.32.6` compatible with NextTS
- `npx prisma studio` db GUI

- I should put all notes in the project then extract from the project
- 4:55 

> 3:35:53 Creating our configuration page 
> 59m + 120m


## configuration page 2

6:34:15 Creating our configuration summary page
- 54m

## secure payment

7:28:33 Integrating secure payments
- 59m

## auth callback

8:27:28 Creating an auth callback
- 23m

## stripe webhook

8:50:20 Creating our stripe webhook
- 44m

## thank you page

9:34:19 Creating our thank you page
- 56m

## secret admin dashboard

10:30:00 Creating a secret admin dashboard
- 45m

## thank you email

11:15:00 Writing our thank-you email
- 22m

## final touch & improvement

11:37:30 Final touches & improvements
- 10m

## deployment

11:47:45 Final deployment
- 7m

## review

11:54:00 Final review
- 5m
11:59:00 Outro - thank you for following along!


## Highlights

- [x] 🛠️ Complete shop built from scratch in Next.js 14
- [x] ⌨️ 100% written in TypeScript
- [x] 🌟 Clean, modern UI on top of shadcn-ui

- [x] 🔑 Authentication using Kinde
  - build-in Email 2-step authentication

- [x] 💻 Beautiful landing page included
  - 🎨 Custom artworks made by a professional illustrator

🖥️ Drag-and-drop file uploads
🛒 Completely custom phone case configuration
✅ Apple-inspired configuration design

🛍️ Customers can purchase directly from you
✉️ Beautiful thank-you email after purchase
💳 Secret admin dashboard to manage orders