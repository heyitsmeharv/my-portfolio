# Adam Harvey's Portfolio

Adam Harvey's personal portfolio and blog, built with React and Vite.

## Features

- **Blog** - long-form posts on software engineering topics
- **Projects** - a carousel/showcase of personal projects
- **Contact form** - backed by an AWS Lambda function
- **Flashcards** - a Leitner spaced-repetition study tool and summary sheets
- **Analytics** - self-hosted pageview/event tracking via [quiet-ly](https://github.com/heyitsmeharv/quiet-ly), an AWS-backed analytics service
- **Theming** - light, dark, blue, red, and green themes
- **Localization** - English/Spanish toggle

## Tech stack

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [react-router-dom](https://reactrouter.com/) (v5)
- [styled-components](https://styled-components.com/)
- [Vitest](https://vitest.dev/) + Testing Library
- [architexter](https://www.npmjs.com/package/architexter) for interactive architecture diagrams in posts
- [Husky](https://typicode.github.io/husky/) + [commitlint](https://commitlint.js.org/) for conventional commits
- [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for changelog/versioning

## Project structure

```
src/
  components/     UI components, including Posts/ (one file per blog post) and Flashcards/
  pages/          Route-level pages (Home, Projects, Blog, Analytics, NotFound)
  helpers/        Post metadata, i18n text, analytics client, codeblocks
  hooks/          Theme and language hooks
  resources/      Theme definitions and global styles
infra/            Terraform for the likes Lambda and quiet-ly analytics module
```

## Deployment

Deployed via [Netlify](https://www.netlify.com/) (`netlify.toml`), with client-side routing redirected to `index.html`.
