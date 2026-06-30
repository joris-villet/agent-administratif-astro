/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

/// <reference types="vite-plugin-pwa/client" />

declare namespace App {
  interface Locals {
    user: import("better-auth").User | null;
    session: import("better-auth").Session | null;
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
