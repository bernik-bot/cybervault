# CyberVault

Personal cybersecurity cheatsheets, built with [VitePress](https://vitepress.dev) and published as a static site.

Live site: [vault.cyberbook.me](https://vault.cyberbook.me)

## Usage

Open the site and pick a domain from the home page or the sidebar: Offensive Security, OSINT, OPSEC, Threat Intelligence, Digital Forensics, Hardware & Embedded, and Resources.

- **Search**: press `Ctrl+K` (`⌘K` on macOS) to search every page.
- **Theme**: the `...` menu in the top bar switches between light/dark mode and sets the color theme.
- **Suggest an edit**: each page links to its Markdown source on GitHub.

To add content, create a Markdown file under `docs/src/<domain>/`. The sidebar is generated from the folder structure, so the page shows up on its own.

## Local development

```sh
npm install
npm run dev
```

Build and preview the production output:

```sh
npm run build
npm run preview
```

## Deployment

The site is built and served via Docker (see `Dockerfile`): a Node build stage compiles the VitePress site, then an Nginx stage serves the static output.

```sh
docker build -t cybervault .
docker run -p 8080:80 cybervault
```