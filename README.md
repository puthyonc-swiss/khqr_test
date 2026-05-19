# KHQR Payment Test — Vercel

## Project Structure
```
khqr-test/
├── api/
│   ├── generate-qr.js     ← generates KHQR QR code
│   └── check-payment.js   ← checks if Bakong received payment
├── public/
│   └── index.html         ← frontend UI
├── package.json
├── vercel.json
└── README.md
```

## How to Deploy to Vercel

### Step 1 — Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2 — Login to Vercel
```bash
vercel login
```

### Step 3 — Go into project folder
```bash
cd khqr-test
```

### Step 4 — Deploy
```bash
vercel
```
Follow the prompts:
- Set up and deploy? → Y
- Which scope? → your account
- Link to existing project? → N
- Project name? → khqr-payment-test
- In which directory is your code? → ./
- Override settings? → N

### Step 5 — Open your deployed URL
Vercel will give you a URL like:
https://khqr-payment-test.vercel.app

Open it in your browser and test!

## What to Check After Deploying

1. Open the URL in browser
2. Enter amount (e.g. 1.00 USD)
3. Click "Generate QR"
4. Check browser console (F12) for errors

### If QR generates but payment check fails:
- Open: https://your-app.vercel.app/api/check-payment?md5=test123
- You should see a JSON response (even if error from Bakong)
- This confirms Vercel CAN reach the Bakong API

### If QR does not generate:
- Open: https://your-app.vercel.app/api/generate-qr (POST)
- Check Vercel logs: vercel logs

## Bakong Account Used
- Account: puthyon_chandara@bkrt
- Currency: USD
