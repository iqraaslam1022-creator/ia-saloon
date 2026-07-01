# IA Saloon — Luxury Salon Landing Page

Ek luxury beauty salon ke liye landing page — dark ink/gold theme, services,
gallery, testimonials, aur ek booking form jo backend API ko hit karta hai.

## Kya shamil hai

- `index.html`, `styles.css`, `script.js` → Frontend (plain HTML/CSS/JS, koi build step nahi)
- `api/book.js` → Backend (Vercel Serverless Function) jo booking form ka data receive karta hai
- `server.js` → Local development ke liye Express server (frontend + backend dono ek sath chalane ke liye)
- `package.json` → Sirf local dev (Express) ke liye dependency

Frontend static hai (koi framework/build step nahi), isliye Vercel par woh
seedha serve hoga. `/api` folder Vercel par automatically serverless function
ban jata hai — is wajah se aapko frontend aur backend do alag deploy karne ki
zaroorat nahi, ek hi Vercel project sab handle kar leta hai.

## Local par chalane ka tareeqa

```bash
npm install
npm start
```

Phir browser mein `http://localhost:3000` kholein. Booking form `/api/book`
par POST request bhejta hai, jo terminal mein request print karta hai (abhi
kahin save nahi ho raha — neeche dekhein isko permanent banane ka tareeqa).

## GitHub par push karna

```bash
cd ia-saloon
git init
git add .
git commit -m "IA Saloon luxury landing page"
git branch -M main
git remote add origin https://github.com/<aapka-username>/ia-saloon.git
git push -u origin main
```

## Vercel par deploy karna

1. [vercel.com](https://vercel.com) par login karein (GitHub account se).
2. **Add New → Project** → apni `ia-saloon` GitHub repo select karein.
3. Framework Preset: **Other** rehne dein (koi build command zaroori nahi).
4. **Deploy** dabayein.

Bas itna hi — Vercel khud hi `index.html` ko static site ki tarah aur
`api/book.js` ko serverless function ki tarah deploy kar dega. Deploy hone ke
baad aapko ek live URL milega jo aap portfolio mein daal sakti hain.

## Booking data ko permanent save karna (agla step)

Abhi `api/book.js` sirf request ko log karta hai — Vercel ke serverless
functions requests ke darmiyan data yaad nahi rakhte. Real bookings save
karne ke liye in mein se koi ek add karein:

- **Email**: [Resend](https://resend.com) ya SendGrid se studio manager ko email bhejein
- **Database**: MongoDB Atlas, Supabase ya PlanetScale mein booking row save karein
- **Google Sheet**: Google Sheets API se seedha ek sheet mein likhein

`api/book.js` file ke andar `console.log('New booking request:', booking)`
wali line ke pass hi ye integration add hoga.

## Customize karna

- Rang/theme: `styles.css` ke `:root` section mein `--ink`, `--gold`,
  `--blush` waghera variables change karein.
- Copy/text: `index.html` mein seedha edit karein — services, pricing,
  testimonials, studio address, phone number sab yahin hain.
- Images: Abhi gallery aur hero mein CSS gradients use ho rahe hain (koi
  stock photo license issue nahi). Apni khud ki salon photos daalne ke liye
  `.hero-orb`, `.philosophy-frame`, aur `.gallery-tile` ki jagah `<img>` tags
  ya `background-image` use kar sakti hain.

---
Made for portfolio use — original design, no external assets used.
