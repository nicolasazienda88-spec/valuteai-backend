// 🔥 FIREBASE CORE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// 🔐 AUTH
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🧠 FIRESTORE (DATABASE)
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// 🔥 CONFIG FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyAMcr6LQ4bNJH2RWN50rXOrNGBQfl8sJ7Q",
  authDomain: "valuteai.firebaseapp.com",
  projectId: "valuteai",
  storageBucket: "valuteai.firebasestorage.app",
  messagingSenderId: "1029185632410",
  appId: "1:1029185632410:web:548fa60c6d36c09e3e8723",
  measurementId: "G-83TP23MLCE"
};

// 🚀 INIT FIREBASE
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// 🔐 REGISTER
window.register = async function () {

  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Registrazione completata!");
  } catch (error) {
    alert(error.message);
  }
};


// 🔐 LOGIN
window.login = async function () {

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login effettuato!");

    document.getElementById("loginOverlay").style.display = "none";

  } catch (error) {
    alert(error.message);
  }
};


// 📦 SALVA OGGETTO SU FIRESTORE
window.saveItem = async function () {

  const title = document.querySelector("input[type='text']").value;
  const description = document.querySelector("textarea").value;
  const condition = document.querySelector("select").value;

  try {

    await addDoc(collection(db, "items"), {
      title: title,
      description: description,
      condition: condition,
      createdAt: new Date()
    });

    alert("Oggetto salvato nel database!");

  } catch (error) {
    alert(error.message);
  }
};
window.analyzePrice = function () {

  const title = document.querySelector("input[type='text']").value;
  const description = document.querySelector("textarea").value;
  const condition = document.querySelector("select").value;

  let basePrice = 50;

  // 🧠 LOGICA SEMPLICE AI

  if (condition === "Nuovo con cartellino") basePrice += 80;
  if (condition === "Nuovo senza cartellino") basePrice += 60;
  if (condition === "Ottime") basePrice += 30;
  if (condition === "Buone") basePrice += 10;
  if (condition === "Discrete") basePrice -= 15;

  if (title.length > 20) basePrice += 10;
  if (description.length > 100) basePrice += 15;

  // 🔥 variazione casuale “realistica”
  const min = Math.floor(basePrice * 0.8);
  const max = Math.floor(basePrice * 1.3);

  alert(
    "💰 Prezzo stimato: " +
    min + "€ - " + max + "€"
  );
};