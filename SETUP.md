# TranscribeFlow Professional - Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm, yarn, or bun package manager
- Modern web browser

## Installation Steps

### 1. Extract Files
Extract the ZIP to your desired project directory.

### 2. Install Dependencies
```bash
cd TranscribeFlow-Professional
npm install
```

### 3. Environment Setup (Optional)
Create a `.env.local` file for any API keys:
```
NEXT_PUBLIC_API_KEY=your_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```

## Troubleshooting

### Port Already in Use
If port 3000 is busy, run on a different port:
```bash
npm run dev -- -p 3001
```

### Module Not Found Errors
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Permission Errors (Microphone)
- Ensure HTTPS or localhost
- Check browser permissions
- Allow microphone access when prompted

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Deploy with one click

### Other Platforms
- Netlify: Use Next.js adapter
- AWS: Deploy with Amplify
- Self-hosted: Use PM2 or Docker