# UpSkills Hub — Frontend

React (Vite) frontend for the UpSkills Hub LMS, wired to the
[Upskills_Web backend API](https://github.com/UpSkillHub/Upskills_Web).

## Tech stack

- React 18 + Vite
- React Router (routing)
- Tailwind CSS (styling)
- Axios (API calls, JWT + refresh-token handling)

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm
- The backend running locally (see below)

## 1. Install & run the frontend

```bash
cd D:\UpSkillsHub
npm install
npm run dev
```

The app runs at **http://localhost:3000** (this port is required — the backend's
CORS only allows `http://localhost:3000`).

## 2. Run the backend it connects to

In a separate folder:

```bash
git clone https://github.com/UpSkillHub/Upskills_Web.git
cd Upskills_Web
npm install
cp .env.example .env      # then edit .env
npm run migrate
npm run dev
```

You'll need **MySQL** installed and running, and a database created that matches
`DB_NAME` in the backend's `.env` (default `up_skills_hub`).

### Which port is the backend on?

Their `src/app.js` reads `process.env.DB_PORT` for the server port and falls back
to **5000**, even though `.env.example` says `PORT=4000`. So by default the API
serves on **http://localhost:5000**. Confirm the port in the backend's startup log
(`Server running on port ...`).

## 3. Point the frontend at the backend

The frontend talks to `/api`, which Vite proxies to the backend. If your backend
is **not** on port 5000, create a `.env` file here:

```bash
# D:\UpSkillsHub\.env
VITE_API_TARGET=http://localhost:5000
```

Change the port to match your backend, then restart `npm run dev`.

## Project structure

```
src/
├── api/            # Axios client + service modules per backend resource
│   ├── client.js       # baseURL /api, JWT header, auto refresh on 401
│   ├── auth.js         # /api/auth endpoints
│   └── resources.js    # courses, modules, lessons, enrollments, payments, reports, teams, users
├── components/     # Navbar, Footer, Layout, CourseCard, Section
├── context/        # AuthContext (login/register/logout, current user)
└── pages/          # Home, Courses, CourseDetail, CategoryCourses, Programs,
                    #   Pricing, Trainers, Contact, Faq, Login, Register, NotFound
```

## How the backend is mapped

| Frontend | Backend endpoint |
|----------|------------------|
| Register / Login | `POST /api/auth/register`, `POST /api/auth/login` |
| Session / current user | `POST /api/auth/refresh`, `GET /api/auth/me` |
| Courses list / detail | `GET /api/courses`, `GET /api/courses/:id` |
| Enroll | `POST /api/enrollments` |
| Trainers | `GET /api/users` (filtered by role) |

Modules, lessons, payments, reports and teams also have ready-to-use service
functions in `src/api/resources.js`.

## Notes / to refine

- Response shapes (e.g. `{ data: [...] }` vs a raw array) are handled defensively,
  but should be confirmed against the live API / Swagger (`/api-docs`) and tightened.
- Page layouts approximate the Figma prototype and are ready to be refined
  section-by-section against the design.
- There is no contact-form endpoint in the backend yet; the Contact page is UI-only
  until one exists.
```
