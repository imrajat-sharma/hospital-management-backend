# Hospital Management System (DBMS Demo)

This project demonstrates core DBMS concepts with a Hospital domain using Node.js, Express, MongoDB, Mongoose, and EJS.

## Modules

- Doctors CRUD
- Patients CRUD
- Appointments CRUD (doctor-patient relationship)
- Bills CRUD (patient-appointment relationship)
- Auth (register/login + JWT protected endpoint)
- Dashboard with aggregation queries

## DBMS Concepts Demonstrated

- Entity modeling: `Doctor`, `Patient`, `Appointment`, `Bill`, `User`
- Relationships: ObjectId refs (`Appointment -> Doctor/Patient`, `Bill -> Patient/Appointment`)
- CRUD operations across all entities
- Constraints:
  - Required fields
  - Enum validation (status, roles, gender, payment fields)
  - Unique key (`User.email`)
- Join-like operations: Mongoose `populate`
- Aggregation:
  - `GROUP BY` style counts (status/specialization/payment state)
  - Revenue sum (`total`, `paid`, `pending`)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
copy .env.example .env
```

3. Update `.env` values, especially `MONGO_URI` and `JWT_SECRET`.

4. Start app:

```bash
npm run dev
```

App URL: `http://localhost:5000`

## Important Routes

- `/` Home
- `/dashboard` DBMS analytics dashboard
- `/doctors`
- `/patients`
- `/appointments`
- `/bills`
- `/auth/register`
- `/auth/login`
- `/auth/me` (requires JWT in `Authorization: Bearer <token>`)
