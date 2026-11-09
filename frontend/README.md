# Clinic Management System — Frontend

Dark-mode Next.js frontend for the existing Clinic API.

## Requirements
- Node.js 20.9 or newer
- Your Clinic API running at `http://localhost:3000`

## Run
1. Extract this ZIP.
2. Open the project folder in VS Code.
3. In a terminal run:

```bash
npm install
```

4. Copy `.env.example` to `.env.local`. Keep this value if your backend runs on port 3000:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

5. Start the frontend:

```bash
npm run dev
```

6. Open `http://localhost:3001`.

## API connection
The frontend calls your existing backend directly:
- `POST /auth/login`
- `GET /dashboard`
- `/doctors`
- `/patients`
- `/appointments`
- `/prescriptions`
- `/payments`

The login response is expected to contain `accessToken`. The token is stored in browser localStorage and sent as `Authorization: Bearer <token>`.

## Important backend notes
- Your Swagger screenshot showed `GET /doctors` requires both `city` and `specialty`. The Doctors page includes both filters and sends them as query parameters.
- Your browser must be allowed by backend CORS. Allow `http://localhost:3001` in the backend CORS configuration.
- The UI uses the request fields from the API examples supplied in the project conversation. If a backend DTO uses different field names or response wrappers, adjust `lib/api.ts` and the relevant page.
- Never deploy with the sample admin password. Change it and use HTTPS before real use.
- This is a frontend starter; verify role permissions, validation, and privacy/security rules before production.

## Build
```bash
npm run build
```
