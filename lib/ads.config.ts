// Configuration for the application

// Read the ads toggle directly from the environment variables at build/runtime.
// This is statically available and avoids the need for React Context or Client Components.
export const ENABLE_ADS = process.env.NEXT_PUBLIC_ENABLE_ADS === 'true';
