// 🔥 Replace with your Firebase config (copy from Firebase Console)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  let currentUserName = '';
  let currentUserLevel = '';
  
  // REGISTER FUNCTION
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
          window.location.href = 'chat.html';
        });
      })
      .catch(error => {
        alert(error.message);
      });
  }
  
  // LOAD CURRENT USER DATA
  auth.onAuthStateChanged(user => {
    if (user) {
      db.collection('users').doc(user.uid).get()
        .then(doc => {
          if (doc.exists) {
            currentUserName = doc.data().name;
            currentUserLevel = doc.data().level;
          }
        });
    } else {
      window.location.href = 'index.html';
    }
  });
  
  // SEND MESSAGE FUNCTION
  function sendMessage() {
    const msg = document.getElementById('message').value;
    if (!msg) return;
  
    db.collection('messages').add({
      text: msg,
      time: Date.now(),
      name: currentUserName,
      level: currentUserLevel
    });
  
    document.getElementById('message').value = '';
  }
  
  // DISPLAY MESSAGES IN REAL TIME
  if (document.getElementById('messages')) {
    db.collection('messages').orderBy('time')
      .onSnapshot(snapshot => {
        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = '';
        snapshot.forEach(doc => {
          const data = doc.data();
          messagesDiv.innerHTML += `
            <div class='message'>
              <strong>${data.name} (${data.level}):</strong> ${data.text}
            </div>
          `;
        });
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      });
  }
  