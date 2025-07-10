// src/config.ts

// interface ImportMetaEnv {
//   readonly VITE_USE_MOCK: string;
//   // add other env variables here if needed
// }

// interface ImportMeta {
//   readonly env: ImportMetaEnv;
// }

export const isMock = process.env.REACT_APP_USE_MOCK  === 'true';
export const API_URL = process.env.REACT_APP_API_URL;