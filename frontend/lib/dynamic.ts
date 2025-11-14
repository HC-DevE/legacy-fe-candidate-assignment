export const dynamicEnvironmentId = process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || "";

if (!dynamicEnvironmentId) {
  console.warn("NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID is not set");
}