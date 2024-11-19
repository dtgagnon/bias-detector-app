/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
  // interface Error {}
  // interface Locals {}
  // interface PageData {}
  // interface Platform {}
}

declare interface Window {
  Readability: new (doc: Document) => import('@mozilla/readability').Readability;
}

declare module '@mozilla/readability' {
  export interface Readability {
    parse(): {
      title: string;
      content: string;
      textContent: string;
      length: number;
      excerpt: string;
    } | null;
  }
}
