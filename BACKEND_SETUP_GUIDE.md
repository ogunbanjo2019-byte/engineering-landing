# Backend Setup Guide (Node.js & Nodemailer)

This guide will help you set up and run the backend for your engineering landing page. This backend will send contact form messages directly to your Gmail account.

## Prerequisites

1.  **Node.js** installed on your computer.
2.  **A Gmail account** (yours for testing, then the company's).

## Step 1: Generate a Gmail App Password

Gmail does not allow apps to use your regular password for security reasons. You must create an **App Password**.

1.  Go to your [Google Account Settings](https://myaccount.google.com/).
2.  Navigate to **Security**.
3.  Enable **2-Step Verification** (if not already enabled).
4.  Search for **"App passwords"** in the search bar at the top.
5.  Select **"Other (Custom name)"** and name it "Website Backend".
6.  Click **Generate**.
7.  **Copy the 16-character code** (e.g., `xxxx xxxx xxxx xxxx`). **This is your `EMAIL_PASSWORD`**.

## Step 2: Configure the Environment

1.  In the project folder, find the file named `.env`.
2.  Open it and replace the placeholder values with your own:

```env
# Your Gmail address
EMAIL_USER=your-email@gmail.com

# The 16-character App Password you just generated
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

## Step 3: Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

## Step 4: Start the Server

To start the backend server, run:

```bash
npm start
```

You should see:
`✅ Server is running on http://localhost:3000`
`📧 Email configured: your-email@gmail.com`

## Step 5: Test the Form

1.  Keep the terminal running the server.
2.  Open `index.html` in your browser.
3.  Fill out the contact form and click **"Send Message"**.
4.  If successful, you will see a green success message.
5.  Check your Gmail inbox (the one set in `EMAIL_USER`). You should receive:
    *   A notification email with the message details.
    *   A confirmation email (sent to the "visitor's" email).

## Switching to Company Email

When you are ready to hand over the project:

1.  Ask the company to follow **Step 1** to generate an App Password for their Gmail.
2.  Update the `.env` file with their email and their new App Password.
3.  Restart the server.

## Files Created/Modified

*   `server.js`: The main backend logic.
*   `package.json`: Contains project dependencies.
*   `.env`: Stores your secret email credentials.
*   `eng.js`: Updated to talk to the new backend.
*   `index.html`: Updated with improved form fields.

## Troubleshooting

*   **Port 3000 already in use?** Change the `PORT` value in the `.env` file and restart.
*   **Authentication Error?** Double-check your App Password. Make sure there are no typos.
*   **Connection Error?** Ensure the backend server is actually running when you submit the form.

---
**Note:** For local testing, `http://localhost:3000` works perfectly. When you deploy the website to a live server, you will need to update the `API_ENDPOINT` in `eng.js` to match your live server's URL.
