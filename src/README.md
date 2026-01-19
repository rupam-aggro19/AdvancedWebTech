# Course Platform - Setup Guide

## Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+)
- npm or yarn

---

## Step 1: Database Setup

1. **Install PostgreSQL** (if not installed):
   - Run `postgresql-18.1-1-windows-x64.exe` from Downloads folder

2. **Create Database**:
   ```sql
   CREATE DATABASE course_platform;
   ```

3. **Or restore backup** (if available):
   ```bash
   psql -U postgres -d course_platform -f coursera_backup.sql
   ```

---

## Step 2: Backend Setup (NestJS)

```bash
# Navigate to backend
cd C:\Users\RUPAN\Downloads\src1

# Install dependencies
npm install

# Start the server (development mode)
npm run start:dev
```

Backend runs on: **http://localhost:3000**

### Database Configuration

Edit `src/app.module.ts` to match your PostgreSQL credentials:

```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',      // your username
  password: 'your_password', // your password
  database: 'course_platform',
  autoLoadEntities: true,
  synchronize: true,  // auto-create tables
}),
```

---

## Step 3: Frontend Setup (Next.js)

```bash
# Open NEW terminal, navigate to frontend
cd C:\Users\RUPAN\Downloads\app1

# Install dependencies
npm install

# Start the dev server on port 3001
npm run dev -- -p 3001
```

Frontend runs on: **http://localhost:3001**

---

## Step 4: Test the Application

1. Open **http://localhost:3001/register**
2. Register as **INSTRUCTOR**
3. Login with your credentials
4. You'll be redirected to **/instructor/dashboard**

---

## API Endpoints (Instructor)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/courses/my` | Get my courses |
| POST | `/courses` | Create course |
| PATCH | `/courses/:id` | Update course |
| DELETE | `/courses/:id` | Delete course |
| GET | `/lessons/:courseId` | Get lessons |
| POST | `/lessons` | Create lesson |
| PATCH | `/lessons/:id` | Update lesson |
| DELETE | `/lessons/:id` | Delete lesson |

---

## Troubleshooting

**Error: Cannot connect to database**
- Make sure PostgreSQL is running
- Verify credentials in `app.module.ts`

**Error: CORS**
- Ensure frontend runs on port 3001
- Backend CORS is configured for `http://localhost:3001`
