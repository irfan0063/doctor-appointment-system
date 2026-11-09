# Doctor Appointment / Clinic Management System

Full-stack clinic management application with a Next.js frontend and NestJS API.

## Project structure

- `frontend/` - Next.js 15 dashboard for authentication, doctors, patients, appointments, prescriptions, payments, and reporting.
- `backend/` - NestJS API with Prisma/PostgreSQL, JWT authentication, doctor and patient management, appointments, bookings, prescriptions, payments, reviews, and dashboard data.

## Run locally

### Backend

```bash
cd backend
npm install
copy .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

The API runs at `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
copy .env.example .env.local
npm run dev
```

The frontend runs at `http://localhost:3001` and uses `NEXT_PUBLIC_API_URL` to connect to the backend.

## Production builds

```bash
cd backend
npm run build

cd ..\frontend
npm run build
```

Set a strong `JWT_SECRET`, a production PostgreSQL `DATABASE_URL`, and non-default administrator credentials before deployment. Never commit `.env` files or real credentials.
