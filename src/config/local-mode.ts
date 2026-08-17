/**
 * Local mode is decided when Expo bundles the app. Set
 * EXPO_PUBLIC_LOCAL_MODE=true before starting or building to bypass sign-in
 * and keep prayers on this installation only.
 */
export const isLocalMode = process.env.EXPO_PUBLIC_LOCAL_MODE === "true";
