# Course Platform Deployment Guide (Render)

This guide walks you through deploying your Course Platform (NestJS backend and Next.js frontend) to Render using the pre-configured Blueprint (`render.yaml`).

---

## Prerequisites

1. Your project must be pushed to a public or private GitHub/GitLab repository.
2. You must have a free [Render account](https://render.com).

---

## Step-by-Step Deployment Instructions

### Step 1: Create a Blueprint Instance on Render
1. Log in to your **Render Dashboard** and click **New** (top right) -> **Blueprint**.
2. Connect your GitHub/GitLab account and select your repository containing this project.
3. Render will automatically read the `render.yaml` file in your root directory.
4. Name your Blueprint group (e.g. `course-platform`) and click **Approve**.
5. Render will prompt you for the initial environment variables:
   * **`FRONTEND_URL`**: Leave this empty or put a placeholder for now (we will update this once the frontend finishes deploying).
   * **`NEXT_PUBLIC_API_URL`**: Leave this empty or put a placeholder for now (we will update this once the backend finishes deploying).
6. Click **Deploy**.

---

### Step 2: Retrieve Live URLs and Link Services
Because the frontend needs to know the backend's URL, and the backend needs to know the frontend's URL (for CORS security), they have a circular dependency. Once both services are created, follow these steps to link them:

1. **Wait** for the deployment process to create the two services in your Render Dashboard:
   * `course-platform-backend`
   * `course-platform-frontend`
2. Copy the **live URL** of your **Backend Web Service** (e.g. `https://course-platform-backend.onrender.com`).
3. Copy the **live URL** of your **Frontend Web Service** (e.g. `https://course-platform-frontend.onrender.com`).

#### Link the Backend to the Frontend:
1. Open the **`course-platform-backend`** service in your Render Dashboard.
2. Go to the **Environment** tab.
3. Find the `FRONTEND_URL` environment variable and set its value to your **Frontend live URL** (e.g. `https://course-platform-frontend.onrender.com`).
4. Click **Save Changes**. (Render will automatically redeploy the backend).

#### Link the Frontend to the Backend:
1. Open the **`course-platform-frontend`** service in your Render Dashboard.
2. Go to the **Environment** tab.
3. Find the `NEXT_PUBLIC_API_URL` environment variable and set its value to your **Backend live URL** (e.g. `https://course-platform-backend.onrender.com`).
4. Click **Save Changes**. (Render will automatically redeploy the frontend).

---

## Troubleshooting & Important Notes

* **Neon Database**: The backend is pre-configured to connect to your existing Neon PostgreSQL database. There is **no need** to set up a new database on Render unless you want to.
* **CORS Errors**: If you encounter CORS errors (e.g. login/register requests failing in the console), make sure that the `FRONTEND_URL` variable on the backend has the exact URL of your frontend (with `https://` and without a trailing slash `/`).
* **Cold Starts**: On Render's Free Plan, the backend service spins down after 15 minutes of inactivity. When you visit the app after it spins down, the first API request might take 50–90 seconds to complete while the container boots back up.
