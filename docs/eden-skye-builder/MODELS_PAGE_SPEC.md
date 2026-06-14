# Models Page Spec

## Route
`/models`

## Objective
Create the public-facing model gallery matching the supplied Eden Skye Studios mockup: dark luxury grid, left filters, model cards, status badges, favorite/send/view actions, and pagination.

## Required UI sections
1. Global Eden navigation.
2. Page hero: `OUR MODELS` with subtitle `Elite talent. Exceptional presence.`
3. Left filter panel:
   - Availability
   - Status
   - Category
   - Specialty
   - Location
   - Languages
   - Height range
   - Age range
   - Apply / reset filters
4. Toolbar:
   - Sort dropdown
   - Grid/list toggle
   - Clear all
5. Model card grid:
   - Image
   - status badge
   - online dot
   - name
   - height / measurements / age / location
   - view, favorite, message buttons
6. Pagination.

## Data contract
Use a local fixture first:

```ts
export type EdenModelCard = {
  id: string;
  name: string;
  status: 'elite' | 'verified' | 'rising';
  location: string;
  height: string;
  stats: string;
  age: number;
  image: string;
  available: boolean;
};
```

## Build rules
- No real profile claims until Supabase profile records are verified.
- Demo profile content must be visibly fixture-backed in code.
- Images should use approved source-image manifest entries once storage is connected.
- Do not wire real messaging, payments, or booking from this route.

## Acceptance checks
- Route renders at `/models`.
- Responsive grid collapses below tablet.
- Filters are visual/stateful only unless Supabase filter data is approved.
- No network write occurs from card actions.
