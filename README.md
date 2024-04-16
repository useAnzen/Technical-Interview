# Technical Test - Pokemon Pagination

Welcome to the Pokemon Pagination technical test. This test is designed to assess your ability to implement pagination in a web application. The test is designed to be completed in 2 hours.

## Description

This repository contains a basic web application that showcases a Pokemon list. Initially, the list is not paginated. The objective of this test is to introduce pagination to the Pokemon list, adhering to the following specifications:

### Requirements

-   utilize the TailwindUI design for pagination: [TailwindUi: Pagination](https://tailwindui.com/components/application-ui/navigation/pagination#component-69eb9381f977800aa890ce8f7d9e2d20)
-   The default maximum number of Pokemon per page is 10.
-   The user should be able to navigate between pages.
-   The user should be able to see the total number of Pokemon.
-   The user should be able to see the current page number.
-   The user should be able to see the total number of pages.
-   The user should be able to see the list of Pokemon for the current page.
-   The user should be able to select a page number to navigate to that page.
-   The user should be able to click on a "Next" button to navigate to the next page.
-   The user should be able to click on a "Previous" button to navigate to the previous page.
-   the user should not be able to navigate to a page that does not exist.
-   the user should not be able to request a page number less than 1.
-   the user should not be able to request a page number greater than the total number of pages.
-   the user should not be able to request a page number that is not a number.

### Bonus Points

-   the user should be able to select the number of items per page (5, 10, 25)
-   the user should be able to search for a specific pokemon by name or type
-   the user should be able to limit the items by type

### Submission

Once completed, please setup and deploy the application to a hosting service of your choice (e.g. Vercel, Netlify, Github Pages, etc.) and provide the link to the deployed application along with the link to your forked repository.

If you would like to keep your repository private, please add [@CodeVachon](https://github.com/codevachon) as a collaborator to the repository.

## Project Setup

### Prerequisites

It is expected that you have the following tools installed on your machine:

-   [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) or `Node.js` @ `20.x.x`
-   [pnpm](https://pnpm.io/) (optional, but recommended), `npm` or `yarn`
-   [Git](https://git-scm.com/)
-   [VSCode](https://code.visualstudio.com/) (or any other code editor)

And that you have a basic understanding of the following:

-   [Next.js](https://nextjs.org/) (App Router)
-   [Prisma](https://www.prisma.io/)
-   [TailwindCSS](https://tailwindcss.com/docs)
-   [TypeScript](https://www.typescriptlang.org/)

### Installation

1. Fork this repository.
2. Clone the forked repository to your local machine.
3. install the dependencies by running `pnpm install` (note: `npm install` or `yarn install` will also work)
4. Generate the Prisma client by running `pnpm prisma generate` (note: `npm run prisma generate` or `yarn prisma generate` will also work)
5. Start the development server by running `pnpm dev` (note: `npm run dev` or `yarn dev` will also work)

If required, you can use the following command to seed or update the database.

```bash
pnpm prisma db seed

# or
npm prisma db seed

# or
yarn prisma db seed
```

## Helpful Documentation

Use the following links for more information on the tools and frameworks used in this project:

-   Next.js: Dynamic Routing - https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#convention
-   Prisma: Query Pagination - https://www.prisma.io/docs/orm/prisma-client/queries/pagination
-   TailwindCSS - https://tailwindcss.com/docs

## Resource Credits

-   Pokemon Data - https://pokeapi.co
-   Pokemon Type Icons - https://github.com/duiker101/pokemon-type-svg-icons
