# 📋 Coop Training Tracker

**A free, open-source, bilingual (AR/EN) tracker for logging daily cooperative-training
tasks and generating weekly, monthly, and final reports — built for a 3-phase
cybersecurity track (GRC → Blue Team → Red Team) but easy to adapt to any program.**

No backend to maintain, no build step, no framework — plain HTML/CSS/JS + Firebase
(free tier). Deploys on GitHub Pages in minutes.

> بالعربي: أداة مجانية ومفتوحة المصدر لتسجيل مهامك اليومية خلال التدريب التعاوني
> وتوليد تقارير أسبوعية وشهرية وختامية ثنائية اللغة. التفاصيل الكاملة بالعربي بالأسفل 👇

---

## ✨ Features

- 📊 **Analytics dashboard** — KPI cards, hours trend chart, phase distribution donut, top tools/skills chart, week-over-week comparison, GitHub-style activity heatmap
- ✅ **Kanban task planner** — plan work before you do it (To do / In progress / Done), with priorities and deadlines; completing a card auto-logs it as today's daily entry
- 📅 **Multi-day tasks** — log a task once with a start/end date; it appears in every week/month it spans
- 🗓️ **Auto-computed training phase** — set your start date once, the app tags every entry GRC / Blue Team / Red Team automatically
- 📄 **Bilingual reports** — weekly, monthly, and final reports with an official letterhead (university logo, name, ID, department...), print-to-PDF ready
- 🎨 **Two visual themes** — dark SOC/terminal theme and a light formal academic theme, one click to switch
- 🔒 **Private by default** — Firebase Authentication + Firestore rules mean only you can read or write your own data
- 💾 **JSON backup export** — one click, no vendor lock-in

---

## 🚀 Quick Start

```
1. Fork / clone this repo
2. Create a free Firebase project → copy js/firebase-config.example.js to js/firebase-config.js → fill in your keys
3. Set the Firestore Security Rules below
4. Push to GitHub → enable GitHub Pages
5. Open the site → "Create account" → start logging
```

Full step-by-step walkthrough is in the
**[دليل الإعداد بالعربي](#-دليل-الإعداد-الكامل-بالعربي)** section below —
follow it even if you don't read Arabic, the commands and UI labels are universal.

---

## 🔒 Security notes

- **Your data is isolated per Firebase project.** This is a template, not a shared
  multi-tenant service — everyone who deploys it gets their own private Firebase
  project and their own data. No two deployments share anything.
- **Firestore Security Rules (required)** restrict every read/write to the signed-in
  user's own document tree (`users/{uid}/...`). Without publishing these rules,
  your database defaults to locked-down/no access — the app simply won't work, so
  you can't accidentally skip this step. The exact rules to publish are in the setup guide.
- **The Firebase `apiKey` is not a secret.** Firebase web config values are designed
  to be public — they identify your project, they don't authenticate anyone. Real
  protection comes entirely from the Security Rules above. This repo still keeps
  `js/firebase-config.js` out of git via `.gitignore` (see `js/firebase-config.example.js`)
  so that forks don't accidentally point at the original deployer's project.
- **Authentication is required** for every read/write — there is no public/anonymous
  access path in this template.
- **No AI keys ship in the client.** Report summaries are generated locally from your
  data (no external API calls), so there's no key to leak. If you want AI-generated
  summaries later, do it via a server-side Cloud Function — never call an AI API
  directly from this front-end code.
- **Recommended hardening (optional):** enable [Firebase App Check](https://firebase.google.com/docs/app-check)
  once you have a live domain, and keep Firestore on the free Spark plan unless you
  have a specific reason to upgrade — the free tier is far more than one person needs.

---

## 🗂️ Project structure

```
coop-training-log/
├── index.html                    # single-page app shell (all views)
├── css/
│   └── style.css                 # design tokens + all component styles
├── js/
│   ├── app.js                    # all app logic (auth, Firestore CRUD, rendering)
│   ├── firebase-config.example.js  # ← copy this to firebase-config.js
│   └── firebase-config.js        # your real keys — gitignored, not committed
├── assets/
│   ├── uqu-letterhead.png        # official report letterhead image (replace with your own)
│   └── report-template.docx      # official university form, pre-tagged for auto-fill (replace with your own)
├── .gitignore
├── LICENSE                       # MIT
└── README.md
```

No `node_modules`, no bundler, no build step. Every dependency (Firebase SDK, Chart.js,
Google Fonts) loads from a CDN via `<script>`/`import` tags — open `index.html` in a
browser (or GitHub Pages) and it just runs.

---

## 🎨 Customizing for your own program

- **Phases / colors**: edit the `PHASE_LABELS` object and the `--grc` / `--blue` / `--red`
  CSS variables in `css/style.css` if your program isn't GRC/Blue/Red.
- **Theme colors**: `body[data-theme="terminal"]` and `body[data-theme="university"]`
  blocks at the top of `css/style.css` — swap in your institution's brand colors.
- **Letterhead**: replace `assets/uqu-letterhead.png` with your own institution's banner,
  and adjust the field labels in `docHeader()` inside `js/app.js` to match your form.
- **Phase durations**: adjustable per-user from the in-app Settings page (no code change needed).

---

## 🤝 Contributing

Issues and pull requests are welcome — this started as a personal tool for a single
training program, so generalizing it further (configurable phase names/colors from
the UI instead of code, more languages, etc.) is a natural next step if others find
it useful.

## 📄 License

MIT — do whatever you want with it, including for your own training/report tracking.
See [LICENSE](./LICENSE).

---
---

# 📖 دليل الإعداد الكامل بالعربي

موقع مجاني ومفتوح المصدر لتسجيل مهامك اليومية خلال التدريب التعاوني (٦ أشهر:
GRC → Blue Team → Red Team) وتوليد تقارير أسبوعية وشهرية وتقرير ختامي ثنائي اللغة
(عربي/إنجليزي). بدون سيرفر تديره أنت، بدون خطوة بناء (build) — HTML/CSS/JS عادي
+ Firebase (الباقة المجانية). ينشر على GitHub Pages خلال دقائق.

## الخطوة ١: إنشاء مشروع Firebase (مجاني)

1. روح لـ https://console.firebase.google.com
2. سجّل دخول بحساب Google → **Add project** → اكتب اسم لمشروعك
3. عطّل Google Analytics (مو ضروري) → **Create project**

### تفعيل تسجيل الدخول
4. من القائمة الجانبية: **Build → Authentication → Get started**
5. فعّل **Email/Password** كطريقة دخول → **Save**

### تفعيل قاعدة البيانات
6. من القائمة الجانبية: **Build → Firestore Database → Create database**
7. اختر **Start in production mode** → اختر أقرب موقع سيرفر (مثل `eur3` أو
   `me-central1` إذا متاح) → **Enable**

### تحديث قواعد الحماية (Security Rules) — خطوة إلزامية
8. من تبويب **Rules** داخل Firestore، استبدل المحتوى بالتالي، ثم **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

هذا يضمن إن بياناتك تُقرأ وتُكتب فقط من حسابك أنت. بدون هالخطوة، القاعدة الافتراضية
مقفلة بالكامل والموقع ما بيشتغل — يعني ما فيه احتمال تنسى تحميها بالخطأ.

### الحصول على مفاتيح الربط
9. من ⚙️ **Project settings** → انزل لـ **Your apps** → اضغط أيقونة الويب `</>`
10. اكتب اسم للتطبيق → **Register app**
11. بيظهر لك كائن `firebaseConfig` فيه القيم — انسخها

---

## الخطوة ٢: تعبئة المفاتيح في المشروع

1. انسخ الملف `js/firebase-config.example.js` وسمّه `js/firebase-config.js`
2. افتحه واستبدل القيم بالقيم اللي نسختها من Firebase:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

> **ملاحظة أمنية**: مفاتيح Firebase هذي مصممة تكون ظاهرة في كود الواجهة الأمامية —
> ما هي سر. الحماية الفعلية موجودة في Security Rules اللي ضبطناها بالخطوة السابقة.
> الملف `js/firebase-config.js` مستثنى من Git (`.gitignore`) حتى لو نسخ أحد المشروع
> ما يشتغل بالخطأ على مشروعك أنت.

---

## الخطوة ٣: النشر على GitHub Pages

1. روح لحسابك على GitHub → **New repository** → اختر اسم → Public → Create
2. ارفع كل الملفات للـ repo (تأكد إن `js/firebase-config.js` انرفع أيضًا رغم
   الـ `.gitignore` — GitHub Pages محتاجه ليشتغل الموقع؛ الـ gitignore يمنع رفعه
   بالخطأ إذا ما كنت ناوي، بس أنت فعليًا تبيه مرفوع لأنه مشروعك الشخصي):
   - سحب وإفلات من واجهة GitHub (Add file → Upload files)، أو:
     ```
     git init
     git add -A
     git add -f js/firebase-config.js
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/USERNAME/REPO_NAME.git
     git push -u origin main
     ```
3. من الـ repo: **Settings → Pages**
4. تحت **Source** اختر branch `main` والمجلد `/ (root)` → **Save**
5. بعد دقيقة أو دقيقتين، موقعك متاح على:
   `https://USERNAME.github.io/REPO_NAME/`

---

## الخطوة ٤: أول استخدام

1. افتح الرابط → **إنشاء حساب لأول مرة** بأي بريد وكلمة مرور تختارها
2. روح لصفحة **الإعدادات** واملأ بياناتك (الاسم، الرقم الجامعي، الجامعة/الكلية،
   الهاتف، البريد، القسم، التخصص، تاريخ بداية التدريب)
3. ابدأ تسجيل مهامك اليومية من صفحة **تسجيل مهمة**

من أي جهاز ثاني (جوال، لابتوب) — افتح نفس الرابط وسجّل دخول بنفس البريد وكلمة
المرور، وبتلقى نفس بياناتك.

---

## ميزات الموقع

- **الرئيسية (Dashboard)**: بطاقات KPI، رسم خطي لاتجاه ساعات العمل آخر ١٢ أسبوع،
  رسم دائري لتوزيع المراحل، رسم أعمدة لأكثر الأدوات استخدامًا، مقارنة أسبوعية،
  وشبكة أيام التسجيل بأسلوب GitHub.
- **المهام الممتدة لعدة أيام**: حقل "تاريخ الانتهاء" اختياري — المهمة تظهر تلقائيًا
  في كل تقرير أسبوعي/شهري تتقاطع معه فترتها.
- **الترويسة الرسمية**: كل تقرير يبدأ بترويسة رسمية (شعار، اسمك، رقمك الجامعي،
  الجامعة/الكلية، تاريخ الإصدار) — استبدل `assets/uqu-letterhead.png` بشعار جامعتك.
- **المهام والمواعيد**: كانبان (لم أبدأ / قيد التنفيذ / منجزة) + قائمة مرتبة حسب
  الموعد والأولوية + تقويم شهري. نقل مهمة لعمود "منجزة" يحوّلها تلقائيًا لسجل يومي
  بتاريخ اليوم، بدون ما يمس أي مهام فعلية مسجلة بنفس اليوم.
- **تصدير التقارير**: كل تقرير (أسبوعي/شهري/ختامي) فيه أزرار:
  - **Word (تصميم الموقع)**: يحوّل نفس تصميم التقرير المعروض على الشاشة لملف `.docx` قابل للتعديل
  - **PDF (تصميم الموقع)**: نفس التصميم، ملف PDF جاهز مباشرة (بدون المرور بنافذة طباعة المتصفح)
  - **Excel**: جدول بكل بيانات المهام لتلك الفترة، صالح للتحليل أو الأرشفة
  - **Word (قالب الجامعة الرسمي بالمليمتر)** — فقط في التقرير الشهري: يملأ نموذج (2.1) الرسمي
    نفسه (نفس الألوان، الخطوط، الجدول، الشعار) ببياناتك ومهام كل أسبوع تلقائيًا، ويصدّره
    كملف Word مطابق تمامًا للقالب اللي ترفعه الجامعة — مبني من ملف `assets/report-template.docx`
    (نسخة من نموذج الجامعة الأصلي معبأة بحقول ديناميكية تلقائية)
- **النسخة الاحتياطية**: من صفحة الإعدادات، زر "تصدير نسخة احتياطية (JSON)".
- **الطباعة/PDF**: زر "طباعة / حفظ PDF" في كل صفحة تقرير.
- **الهوية البصرية**: زر يبدّل بين ثيم تقني غامق وثيم أكاديمي رسمي.

## ملاحظة حول الملخص التنفيذي

التقارير تُبنى تلقائيًا من بياناتك (إحصائيات + جداول + فقرة ملخص) بدون استدعاء أي
نموذج ذكاء اصطناعي — لأن أي مفتاح API لخدمة AI يظهر في كود الواجهة الأمامية يكون
غير آمن على موقع عام ومفتوح المصدر. لو حبيت لاحقًا ملخص تنفيذي عبر AI، الحل الآمن
هو Firebase Cloud Function تستدعي الـ API من السيرفر — ما يظهر أي مفتاح للمستخدم.
