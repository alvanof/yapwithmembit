# 🚀 How to Deploy to Vercel

The easiest way to deploy **Let's Yap with Membit** is using Vercel's GitHub integration.

## Option 1: Deploy via GitHub (Recommended)

1.  **Push to GitHub**
    - Make sure your project is pushed to a GitHub repository.
    - If you haven't done this yet:
        ```bash
        git init
        git add .
        git commit -m "Initial commit"
        # Create a new repo on GitHub, then:
        git remote add origin https://github.com/YOUR_USERNAME/letsyapwithmembit.git
        git push -u origin main
        ```

2.  **Log in to Vercel**
    - Go to [vercel.com](https://vercel.com) and log in (or sign up) using your GitHub account.

3.  **Import Project**
    - Click **"Add New..."** -> **"Project"**.
    - Find your `letsyapwithmembit` repository in the list and click **"Import"**.

4.  **Configure Project**
    - **Framework Preset**: Vercel should automatically detect **Vite**.
    - **Root Directory**: Leave as `./`.
    - **Build Command**: `npm run build` (Default).
    - **Output Directory**: `dist` (Default).
    - **Environment Variables**:
        - If you want to hardcode a default Membit/Gemini key (not recommended for public repos), add them here. Otherwise, users will input them in the UI.

5.  **Deploy**
    - Click **"Deploy"**.
    - Vercel will build your site and give you a live URL (e.g., `letsyapwithmembit.vercel.app`).

## Option 2: Deploy via Vercel CLI

If you prefer the command line:

1.  **Install Vercel CLI**
    ```bash
    npm i -g vercel
    ```

2.  **Login**
    ```bash
    vercel login
    ```

3.  **Deploy**
    Run this command in your project folder:
    ```bash
    vercel
    ```
    - Follow the prompts (Say "Yes" to everything).
    - It will deploy a preview version.

4.  **Deploy to Production**
    ```bash
    vercel --prod
    ```

---

### ⚠️ Important Note on API Keys
Since this app allows users to input their own keys in the UI, you don't strictly *need* environment variables on Vercel unless you want to provide a default "demo" key.
