// 1️⃣ Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 2️⃣ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// 3️⃣ Register function
function register() {
  const userName = document.getElementById('name').value;
  const userLevel = document.getElementById('level').value;
  const userEmail = document.getElementById('email').value;
  const userPassword = document.getElementById('password').value;

  if (!userName || !userLevel || !userEmail || !userPassword) {
    alert("Please fill all fields");
    return;
  }

  if (!['L3','L4','L5','S4','S5','S6'].includes(userLevel)) {
    alert("Invalid level");
    return;
  }

  auth.createUserWithEmailAndPassword(userEmail, userPassword)
    .then(userCredential => {
      db.collection('users').doc(userCredential.user.uid).set({
        name: userName,
        level: userLevel
      }).then(() => {
        window.location.href = 'chat.html'; // go to chat page
      });
    })
    .catch(error => {
      alert(error.message);
    });
}
