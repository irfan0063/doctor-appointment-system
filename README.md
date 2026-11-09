# Doctor Appointment & Clinic Management System

Full-stack system with:
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Axios, Recharts, Lucide React
- **Backend**: NestJS, REST API, Prisma ORM, PostgreSQL, JWT auth, Swagger

## Apps
- `/frontend` - patient/doctor/admin UI with responsive dashboards, doctor search, and booking form
- `/backend` - role-based API for auth, doctors, patients, appointments, prescriptions, and payments

## Backend quick start
```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npm run start:dev
```
Swagger: `http://localhost:3000/api/docs`

## Frontend quick start
```bash
cd frontend
npm install
npm run dev
```
Set `NEXT_PUBLIC_API_URL` to your backend URL if needed.
