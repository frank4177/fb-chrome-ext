// vite.config.js
import { defineConfig } from "file:///C:/Users/FRANK/Desktop/chome-ex/node_modules/vite/dist/node/index.js";
import { crx } from "file:///C:/Users/FRANK/Desktop/chome-ex/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import react from "file:///C:/Users/FRANK/Desktop/chome-ex/node_modules/@vitejs/plugin-react/dist/index.mjs";

// src/manifest.js
import { defineManifest } from "file:///C:/Users/FRANK/Desktop/chome-ex/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// package.json
var package_default = {
  name: "chome-ex",
  displayName: "chome-ex",
  version: "0.0.0",
  author: "**",
  description: "",
  type: "module",
  license: "MIT",
  keywords: [
    "chrome-extension",
    "react",
    "vite",
    "create-chrome-ext"
  ],
  engines: {
    node: ">=14.18.0"
  },
  scripts: {
    dev: "vite",
    build: "vite build",
    preview: "vite preview",
    fmt: "prettier --write '**/*.{jsx,js,json,css,scss,md}'",
    zip: "npm run build && node src/zip.js"
  },
  dependencies: {
    react: "^18.2.0",
    "react-dom": "^18.2.0"
  },
  devDependencies: {
    "@crxjs/vite-plugin": "^2.0.0-beta.19",
    "@types/react": "^18.2.28",
    "@types/react-dom": "^18.2.13",
    "@vitejs/plugin-react": "^4.1.0",
    glob: "^10.3.10",
    gulp: "^4.0.2",
    "gulp-zip": "^6.0.0",
    prettier: "^3.0.3",
    vite: "^4.4.11"
  }
};

// src/manifest.js
var isDev = process.env.NODE_ENV == "development";
var manifest_default = defineManifest({
  name: `${package_default.displayName || package_default.name}${isDev ? ` \u27A1\uFE0F Dev` : ""}`,
  description: package_default.description,
  version: package_default.version,
  manifest_version: 3,
  icons: {
    16: "img/logo-16.png",
    32: "img/logo-34.png",
    48: "img/logo-48.png",
    128: "img/logo-128.png"
  },
  action: {
    default_popup: "popup.html",
    default_icon: "img/logo-48.png"
  },
  options_page: "options.html",
  devtools_page: "devtools.html",
  background: {
    service_worker: "src/background/index.js",
    type: "module"
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/contentScript/index.js"],
      "run_at": "document_idle"
    }
  ],
  side_panel: {
    default_path: "sidepanel.html"
  },
  web_accessible_resources: [
    {
      resources: ["img/logo-16.png", "img/logo-34.png", "img/logo-48.png", "img/logo-128.png"],
      matches: []
    }
  ],
  permissions: ["sidePanel", "storage", "tabs", "scripting", "https://web.facebook.com/profile.php?id=100085654272097, https://web.facebook.com/profile.php?id=100074343574223"],
  // chrome_url_overrides: {
  //   newtab: "newtab.html"
  // }
});

// vite.config.js
var vite_config_default = defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: true,
      outDir: "build",
      rollupOptions: {
        output: {
          chunkFileNames: "assets/chunk-[hash].js"
        }
      }
    },
    plugins: [crx({ manifest: manifest_default }), react()]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAic3JjL21hbmlmZXN0LmpzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEZSQU5LXFxcXERlc2t0b3BcXFxcY2hvbWUtZXhcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEZSQU5LXFxcXERlc2t0b3BcXFxcY2hvbWUtZXhcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0ZSQU5LL0Rlc2t0b3AvY2hvbWUtZXgvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgY3J4IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vc3JjL21hbmlmZXN0LmpzJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGJ1aWxkOiB7XG4gICAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICAgIG91dERpcjogJ2J1aWxkJyxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvY2h1bmstW2hhc2hdLmpzJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIHBsdWdpbnM6IFtjcngoeyBtYW5pZmVzdCB9KSwgcmVhY3QoKV0sXG4gIH1cbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEZSQU5LXFxcXERlc2t0b3BcXFxcY2hvbWUtZXhcXFxcc3JjXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxGUkFOS1xcXFxEZXNrdG9wXFxcXGNob21lLWV4XFxcXHNyY1xcXFxtYW5pZmVzdC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvRlJBTksvRGVza3RvcC9jaG9tZS1leC9zcmMvbWFuaWZlc3QuanNcIjtpbXBvcnQgeyBkZWZpbmVNYW5pZmVzdCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcbmltcG9ydCBwYWNrYWdlRGF0YSBmcm9tICcuLi9wYWNrYWdlLmpzb24nIGFzc2VydCB7IHR5cGU6ICdqc29uJyB9XG5cbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT0gJ2RldmVsb3BtZW50J1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVNYW5pZmVzdCh7XG4gIG5hbWU6IGAke3BhY2thZ2VEYXRhLmRpc3BsYXlOYW1lIHx8IHBhY2thZ2VEYXRhLm5hbWV9JHtpc0RldiA/IGAgXHUyN0ExXHVGRTBGIERldmAgOiAnJ31gLFxuICBkZXNjcmlwdGlvbjogcGFja2FnZURhdGEuZGVzY3JpcHRpb24sXG4gIHZlcnNpb246IHBhY2thZ2VEYXRhLnZlcnNpb24sXG4gIG1hbmlmZXN0X3ZlcnNpb246IDMsXG4gIGljb25zOiB7XG4gICAgMTY6ICdpbWcvbG9nby0xNi5wbmcnLFxuICAgIDMyOiAnaW1nL2xvZ28tMzQucG5nJyxcbiAgICA0ODogJ2ltZy9sb2dvLTQ4LnBuZycsXG4gICAgMTI4OiAnaW1nL2xvZ28tMTI4LnBuZycsXG4gIH0sXG4gIGFjdGlvbjoge1xuICAgIGRlZmF1bHRfcG9wdXA6ICdwb3B1cC5odG1sJyxcbiAgICBkZWZhdWx0X2ljb246ICdpbWcvbG9nby00OC5wbmcnLFxuICB9LFxuICBvcHRpb25zX3BhZ2U6ICdvcHRpb25zLmh0bWwnLFxuICBkZXZ0b29sc19wYWdlOiAnZGV2dG9vbHMuaHRtbCcsXG4gIGJhY2tncm91bmQ6IHtcbiAgICBzZXJ2aWNlX3dvcmtlcjogJ3NyYy9iYWNrZ3JvdW5kL2luZGV4LmpzJyxcbiAgICB0eXBlOiAnbW9kdWxlJyxcbiAgfSxcbiAgY29udGVudF9zY3JpcHRzOiBbXG4gICAge1xuICAgICAgbWF0Y2hlczogW1wiPGFsbF91cmxzPlwiXSxcbiAgICAgIGpzOiBbJ3NyYy9jb250ZW50U2NyaXB0L2luZGV4LmpzJ10sXG4gICAgICBcInJ1bl9hdFwiOiBcImRvY3VtZW50X2lkbGVcIlxuICAgIH0sXG4gIF0sXG4gIHNpZGVfcGFuZWw6IHtcbiAgICBkZWZhdWx0X3BhdGg6ICdzaWRlcGFuZWwuaHRtbCcsXG4gIH0sXG4gIHdlYl9hY2Nlc3NpYmxlX3Jlc291cmNlczogW1xuICAgIHtcbiAgICAgIHJlc291cmNlczogWydpbWcvbG9nby0xNi5wbmcnLCAnaW1nL2xvZ28tMzQucG5nJywgJ2ltZy9sb2dvLTQ4LnBuZycsICdpbWcvbG9nby0xMjgucG5nJ10sXG4gICAgICBtYXRjaGVzOiBbXSxcbiAgICB9LFxuICBdLFxuICBwZXJtaXNzaW9uczogWydzaWRlUGFuZWwnLCAnc3RvcmFnZScsIFwidGFic1wiLCBcInNjcmlwdGluZ1wiLCBcImh0dHBzOi8vd2ViLmZhY2Vib29rLmNvbS9wcm9maWxlLnBocD9pZD0xMDAwODU2NTQyNzIwOTcsIGh0dHBzOi8vd2ViLmZhY2Vib29rLmNvbS9wcm9maWxlLnBocD9pZD0xMDAwNzQzNDM1NzQyMjNcIl0sXG4gIGNocm9tZV91cmxfb3ZlcnJpZGVzOiB7XG4gICAgbmV3dGFiOiAnbmV3dGFiLmh0bWwnLFxuICB9LFxufSlcbiIsICJ7XG4gIFwibmFtZVwiOiBcImNob21lLWV4XCIsXG4gIFwiZGlzcGxheU5hbWVcIjogXCJjaG9tZS1leFwiLFxuICBcInZlcnNpb25cIjogXCIwLjAuMFwiLFxuICBcImF1dGhvclwiOiBcIioqXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcImNocm9tZS1leHRlbnNpb25cIixcbiAgICBcInJlYWN0XCIsXG4gICAgXCJ2aXRlXCIsXG4gICAgXCJjcmVhdGUtY2hyb21lLWV4dFwiXG4gIF0sXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiPj0xNC4xOC4wXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImJ1aWxkXCI6IFwidml0ZSBidWlsZFwiLFxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiLFxuICAgIFwiZm10XCI6IFwicHJldHRpZXIgLS13cml0ZSAnKiovKi57anN4LGpzLGpzb24sY3NzLHNjc3MsbWR9J1wiLFxuICAgIFwiemlwXCI6IFwibnBtIHJ1biBidWlsZCAmJiBub2RlIHNyYy96aXAuanNcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJyZWFjdFwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAY3J4anMvdml0ZS1wbHVnaW5cIjogXCJeMi4wLjAtYmV0YS4xOVwiLFxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjIuMjhcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMi4xM1wiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjogXCJeNC4xLjBcIixcbiAgICBcImdsb2JcIjogXCJeMTAuMy4xMFwiLFxuICAgIFwiZ3VscFwiOiBcIl40LjAuMlwiLFxuICAgIFwiZ3VscC16aXBcIjogXCJeNi4wLjBcIixcbiAgICBcInByZXR0aWVyXCI6IFwiXjMuMC4zXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjQuNC4xMVwiXG4gIH1cbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlSLFNBQVMsb0JBQW9CO0FBQ3RULFNBQVMsV0FBVztBQUNwQixPQUFPLFdBQVc7OztBQ0YrUSxTQUFTLHNCQUFzQjs7O0FDQWhVO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixhQUFlO0FBQUEsRUFDZixTQUFXO0FBQUEsRUFDWCxRQUFVO0FBQUEsRUFDVixhQUFlO0FBQUEsRUFDZixNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxVQUFZO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVc7QUFBQSxJQUNULE1BQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFXO0FBQUEsSUFDVCxLQUFPO0FBQUEsSUFDUCxPQUFTO0FBQUEsSUFDVCxTQUFXO0FBQUEsSUFDWCxLQUFPO0FBQUEsSUFDUCxLQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsY0FBZ0I7QUFBQSxJQUNkLE9BQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxFQUNmO0FBQUEsRUFDQSxpQkFBbUI7QUFBQSxJQUNqQixzQkFBc0I7QUFBQSxJQUN0QixnQkFBZ0I7QUFBQSxJQUNoQixvQkFBb0I7QUFBQSxJQUNwQix3QkFBd0I7QUFBQSxJQUN4QixNQUFRO0FBQUEsSUFDUixNQUFRO0FBQUEsSUFDUixZQUFZO0FBQUEsSUFDWixVQUFZO0FBQUEsSUFDWixNQUFRO0FBQUEsRUFDVjtBQUNGOzs7QURwQ0EsSUFBTSxRQUFRLFFBQVEsSUFBSSxZQUFZO0FBRXRDLElBQU8sbUJBQVEsZUFBZTtBQUFBLEVBQzVCLE1BQU0sR0FBRyxnQkFBWSxlQUFlLGdCQUFZLElBQUksR0FBRyxRQUFRLHNCQUFZLEVBQUU7QUFBQSxFQUM3RSxhQUFhLGdCQUFZO0FBQUEsRUFDekIsU0FBUyxnQkFBWTtBQUFBLEVBQ3JCLGtCQUFrQjtBQUFBLEVBQ2xCLE9BQU87QUFBQSxJQUNMLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLEtBQUs7QUFBQSxFQUNQO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixlQUFlO0FBQUEsSUFDZixjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLGNBQWM7QUFBQSxFQUNkLGVBQWU7QUFBQSxFQUNmLFlBQVk7QUFBQSxJQUNWLGdCQUFnQjtBQUFBLElBQ2hCLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxpQkFBaUI7QUFBQSxJQUNmO0FBQUEsTUFDRSxTQUFTLENBQUMsWUFBWTtBQUFBLE1BQ3RCLElBQUksQ0FBQyw0QkFBNEI7QUFBQSxNQUNqQyxVQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFlBQVk7QUFBQSxJQUNWLGNBQWM7QUFBQSxFQUNoQjtBQUFBLEVBQ0EsMEJBQTBCO0FBQUEsSUFDeEI7QUFBQSxNQUNFLFdBQVcsQ0FBQyxtQkFBbUIsbUJBQW1CLG1CQUFtQixrQkFBa0I7QUFBQSxNQUN2RixTQUFTLENBQUM7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUFBLEVBQ0EsYUFBYSxDQUFDLGFBQWEsV0FBVyxRQUFRLGFBQWEsa0hBQWtIO0FBQUEsRUFDN0ssc0JBQXNCO0FBQUEsSUFDcEIsUUFBUTtBQUFBLEVBQ1Y7QUFDRixDQUFDOzs7QUR4Q0QsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsU0FBTztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0wsYUFBYTtBQUFBLE1BQ2IsUUFBUTtBQUFBLE1BQ1IsZUFBZTtBQUFBLFFBQ2IsUUFBUTtBQUFBLFVBQ04sZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBRUEsU0FBUyxDQUFDLElBQUksRUFBRSwyQkFBUyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQUEsRUFDdEM7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
