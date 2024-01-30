# Astro Dashboard

This POC showcases modular web development and data visualization using Astro, integrated with multiple frameworks like React, Svelte, and others.

## Getting Started

To run the project, execute the following commands:

```sh
yarn
yarn dev
```

## 🚀 Project Structure

The project is organized as follows:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── react/
│   │   │   └── [React components]
│   │   ├── svelte/
│   │   │   └── [Svelte components]
│   │   └── [other framework-specific directories]
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

- **Components**: Organized by framework in the `src/components/` directory. This structure facilitates the modular development of the dashboard, allowing each framework's components, such as React and Svelte, to be maintained separately.

- **Pages**: Astro looks for `.astro` or `.md` files in `src/pages/`. Each page corresponds to a route based on its file name.

- **Static Assets**: Place any static assets, like images, in the `public/` directory.

## 🧞 Commands

Run these commands from the root of the project:

| Command        | Action                                       |
| :------------- | :------------------------------------------- |
| `yarn`         | Installs dependencies                        |
| `yarn knip`    | Find unused files, dependencies and exports  |
| `yarn dev`     | Starts local dev server at `localhost:4321`  |
| `yarn build`   | Build production site to `./dist/`      |
| `yarn preview` | Preview build locally, before deploying |

## ⏭️ Next Steps

- Implement some filters
- Add [nanostores](https://github.com/nanostores/nanostores) for state management.
