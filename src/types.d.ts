/// <reference types="vite/client" />

declare module '@twa-dev/sdk';
declare module '*.svg' {
  const content: string;
  export default content;
}
declare module '*.png' {
  const content: string;
  export default content;
}