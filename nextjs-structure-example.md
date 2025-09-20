# Next.js App Structure Example

This document outlines a typical folder structure for a Next.js application similar to your current Vite React project.

```
/my-nextjs-app
  /public
    favicon.ico
    robots.txt
    placeholder.svg
  /src
    /app                # (if using Next.js 13+ app directory)
      layout.tsx
      page.tsx
      /admin
        layout.tsx
        page.tsx
      /auth
        login/page.tsx
        protected-route.tsx
      /profile
        page.tsx
      /apply
        page.tsx
      /participants
        page.tsx
      /events
        page.tsx
      /not-found
        page.tsx
    /components
      /admin
        AdminLayout.tsx
      /application
        AddressGroup.tsx
        ...
      /auth
        ProtectedRoute.tsx
      /layout
        Footer.tsx
        Header.tsx
        Layout.tsx
      /participants
        ParticipantCard.tsx
        ...
      /ui
        ... (UI components)
    /context
      AuthContext.tsx
    /hooks
      use-toast.ts
      use-mobile.tsx
    /lib
      supabaseClient.ts
      utils.ts
    /model
      AuthModel.ts
      AuthSessionModel.ts
    /schemas
      menteeSchema.ts
      mentorSchema.ts
    /service
      /authService
        api/
          authApi.ts
        authService.ts
    /types
      application.ts
      database.ts
      participant.ts
  .env.local
  next.config.js
  package.json
  tsconfig.json
  tailwind.config.ts
  postcss.config.js
  README.md
```

**Notes:**
- Pages and routes are defined in `/src/app` (or `/pages` for older Next.js).
- API routes (if needed) go in `/src/pages/api` or `/src/app/api`.
- No `index.html` (Next.js handles HTML generation).
- Uses `next.config.js` instead of `vite.config.ts`.
- Routing and layouts are file-based and handled by Next.js conventions.

This structure can be adapted to your specific needs and feature set.