// ============================================================
// FIREBASE CONFIG — TEMPLATE
// ============================================================
// 1. Copy this file to `firebase-config.js` in the same folder.
// 2. Create your own Firebase project (see README → Setup Guide).
// 3. Replace the placeholder values below with the config object
//    Firebase gives you under Project settings → Your apps → Web app.
//
// نسخ هذا الملف باسم firebase-config.js وتعبئته بقيم مشروعك الخاص —
// راجع README لخطوات إنشاء مشروع Firebase من الصفر.
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT.appspot.com",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
