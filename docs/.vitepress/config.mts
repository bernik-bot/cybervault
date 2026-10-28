import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";
import { restoreScript } from "./theme/themes.js";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "src",

  title: "CyberVault",
  cleanUrls: true,
  // Page dates come from `git log`: the build needs git and the .git directory
  lastUpdated: true,

  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    ["script", {}, restoreScript],
  ],

  vite: {
    resolve: {
      alias: [
        {
          // Our own "..." navbar menu, with the color theme picker
          find: /^.*\/VPNavBarExtra\.vue$/,
          replacement: fileURLToPath(new URL("./theme/components/NavBarExtra.vue", import.meta.url)),
        },
        {
          // "Last updated" date at the bottom of pages, formatted as dd/mm/yy
          find: /^.*\/VPDocFooterLastUpdated\.vue$/,
          replacement: fileURLToPath(new URL("./theme/components/LastUpdated.vue", import.meta.url)),
        },
      ],
    },
  },

  themeConfig: {
    logo: "/logo.svg",

    editLink: {
      pattern: "https://github.com/n3pt0x/cybervault/edit/main/docs/src/:path",
      text: "Suggest an edit",
    },

    lastUpdated: {
      text: "Last updated",
    },

    search: {
      provider: "local",
      options: {
        detailedView: true, // display detailed list
      },
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],
    outline: "deep",

    sidebar: generateSidebar({
      documentRootPath: "/docs/src",
      collapsed: true,
      useFolderLinkFromIndexFile: true,
      sortMenusOrderNumericallyFromTitle: true,
      hyphenToSpace: true,
      capitalizeFirst: true,
      capitalizeEachWords: true,
      useTitleFromFrontmatter: true,
      useFolderTitleFromIndexFile: true,
    }),
  },
});
