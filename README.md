# Hospital Management System (DBMS)

<div style="display:flex;">
<img src = "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/ba78912c-9d80-459e-9005-c7388688258f.png" heigth="400" width="200">
<img src = "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/78f31c17-ce32-48db-9bbc-9fa97ed96817.png" heigth="400" width="200">
<img src = "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/3ed25e56-181b-4872-be0c-5d9586d7854e.png" heigth="400" width="200">
<img src = "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/86b9efb7-1ec3-4294-8954-000b3d921d13.png" heigth="400" width="200">
</div>

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

1. Clone the repository:
   
```bash
git clone https://github.com/your-username/hospital-management-system.git
```

2. Navigate to the project folder:
   
```bash
cd hospital-management-system
```

4. Install dependencies:

```bash
npm install
```

4. Create environment file:

```bash
copy .env.example .env
```

5. Update `.env` values, especially `MONGO_URI` and `JWT_SECRET`.

6. Start app:

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
