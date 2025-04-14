# Polkadot UX Complaint Box

A web application for collecting UX feedback from Polkadot ecosystem users.

## Features

- Form for submitting UX complaints
- File upload functionality for screenshots
- Telegram integration for notifications
- Responsive design

## Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- Vercel account (for Blob storage)
- Telegram bot token (optional)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Vercel Blob Storage
# To get a valid token:
# 1. Go to https://vercel.com/dashboard
# 2. Select your project
# 3. Go to Storage > Blob
# 4. Create a new Blob store if you don't have one
# 5. Copy the token and paste it here
BLOB_READ_WRITE_TOKEN=your_blob_token_here

# Telegram Bot (optional)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Development Notes

- In development mode, if the Blob token is not set or is invalid, the application will use a placeholder image instead of failing.
- The form will still submit successfully even if file upload fails.
- For production deployment, make sure to set up the proper environment variables in your hosting platform.

## Deployment

This project is configured for deployment on Vercel. Simply connect your repository to Vercel and it will automatically deploy.

Make sure to set up the following environment variables in your Vercel project settings:
- `BLOB_READ_WRITE_TOKEN`
- `TELEGRAM_BOT_TOKEN` (optional)
- `TELEGRAM_CHAT_ID` (optional)

## License

MIT
