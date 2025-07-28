# 🧠 Asana Clone

A full-stack project management application inspired by **Asana**, built with:

* **Frontend**: [Next.js](https://nextjs.org/) + [MUI](https://mui.com/)
* **Backend**: [NestJS](https://nestjs.com/) + [TypeORM](https://typeorm.io/)
* **Database**: [PostgreSQL](https://www.postgresql.org/)

## ✨ Features

### 👑 Admin

- 🔐 **Register/Login**
- ➕ **Add Teams** (CRUD)
- 👨‍💼 **Assign Team Leads** (1 Lead per team max)
- 👀 **View all Projects and Tasks** across the organization

---

### 🧑‍💼 Team Lead

- 🔐 **Register/Login**
- 📁 **Create, Update, Delete Projects** (Team-specific)
- 📝 **Add Tasks** inside a Project
- 👤 **Assign Tasks** to any Member in the Team
- ⏳ **Default Task Status** is `Pending`

---

### 👨‍🔧 Team Member

- 🔐 **Register/Login**
- 📂 **View Projects** (Only where task is assigned)
- ✅ **Update Status** of assigned tasks:
  - `Pending`
  - `On-Hold`
  - `Completed`

---

## 🖥️ UI Design

- 🎨 Intuitive and minimal layout using **Material UI (MUI)**
- ⚡ Seamless experience for Admin, Team Leads, and Members
- 🔐 Role-based UI rendering for restricted access



## 🛠️ Tech Stack

| Layer     | Tech Used                           |
| --------- | ----------------------------------- |
| Frontend  | Next.js, React, MUI, Axios          |
| Backend   | NestJS, TypeORM, JWT, bcrypt        |
| Database  | PostgreSQL                          |
| Dev Tools | ESLint, Prettier, Docker (optional) |



## 📁 Folder Structure

```
/asana-frontend   ← Next.js frontend
/asana-backend    ← NestJS backend (API, services, auth, etc.)
```

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/asana-clone.git
cd asana-clone
```

### 2. Setup Environment Variables

Create a `.env` file in both `asana-frontend/` and `asana-backend/` with the appropriate values:

#### `.env` for Backend

```env
DATABASE_URL=postgres://user:password@localhost:5432/asana
JWT_SECRET=your_jwt_secret
PORT=5000
```


### 3. Run the Backend

```bash
cd asana-backend
npm install
npm run start:dev
```

> Make sure PostgreSQL is running and the DB exists.

---

### 4. Run the Frontend

```bash
cd asana-frontend
npm install
npm run dev
```

---

### Backend

```bash
# Start dev server
npm run start:dev

# Run database migrations
npm run migration:run
```

### Frontend

```bash
# Start frontend dev server
npm run dev
```
