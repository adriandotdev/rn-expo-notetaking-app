# Prayer workflow map

## Routes and navigation

| User flow | Route file | Current behavior |
| --- | --- | --- |
| List saved prayers | `src/app/(protected)/prayers/index.tsx` | Opens creation with `router.push("/prayers/create")`; local cards push `/prayers/[id]`. |
| Create a prayer | `src/app/(protected)/prayers/create/index.tsx` | Requires non-empty trimmed title and prayer text, saves through `useCreatePrayerMutation`, then replaces the route with `/prayers`. |
| View one prayer | `src/app/(protected)/prayers/[id].tsx` | Reads the route `id`, finds the matching local prayer, and returns to the list with history back when available or a route replacement otherwise. |

`src/app/(protected)/prayers/_layout.tsx` registers the list and detail routes without native headers. The create route is a sheet: `pageSheet` on Android and `formSheet` on iOS, with 80% and full-height detents on iOS.

## Current data behavior

`src/config/local-mode.ts` enables local mode only when `EXPO_PUBLIC_LOCAL_MODE=true` at bundle time. In this mode, sign-in is bypassed and prayers remain on the installation.

| Concern | Source of truth | Contract to preserve |
| --- | --- | --- |
| Local record | `src/repositories/local-prayers.ts` | `LocalPrayer` has `id`, `title`, `text`, and ISO `createdAt` strings. Data is stored under `prayer-haven.local-prayers.v1`. |
| Read local records | `getLocalPrayers` | Malformed, missing, or inaccessible storage returns an empty array so the app still opens. |
| Create local record | `createLocalPrayer` | Trims title and text, rejects either empty value, assigns an ID/timestamp, and prepends the record so newest prayers appear first. |
| UI data hooks | `src/mutations/prayers.ts` | `useLocalPrayersQuery` uses query key `["local-prayers"]` and is enabled only in local mode. Successful local creation invalidates that same key. |
| Remote create | `src/api/prayers.ts` | `createPrayer` POSTs `{ title, text }` to `${EXPO_PUBLIC_API_URL ?? "http://localhost:3000"}/api/v1/prayers` with a bearer access token. |

`useCreatePrayerMutation` selects local storage in local mode; otherwise it calls the remote create API. It returns a success message in local mode and forwards configured `onSuccess` after invalidating local data.

## Screen states and boundaries

- The local list shows loading, retrieval-error, empty, and populated states. Each populated card is accessible and opens its prayer by ID.
- In non-local mode, the list intentionally renders one static, non-interactive placeholder card; an API-backed list is not implemented.
- The detail screen shows loading while the local query resolves. A query error, absent ID, or unmatched record shows the unavailable state with a return action.
- The detail screen is local-data based today, even outside local mode. Do not add remote fetching merely as part of a visual or route change.

## Related guidance

- Use `$prayer-haven-ui-theme` for screen, component, form, card, or navigation styling so the established warm palette, typography, spacing, and accessibility conventions remain intact.
- Use `$expo-data-fetching` for changes involving the remote API, React Query, query invalidation, cache behavior, authentication, or environment-based API URLs.
