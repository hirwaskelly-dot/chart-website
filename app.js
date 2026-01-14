const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
  
    };
    
    
    firebase.initializeApp(firebaseConfig);

    const auth = firebase.auth();
    const db = firebase.firestore();
    
    
    function register() {
    const name = name.value;
    const level = level.value;
    const email = email.value;
    const password = password.value;
    
    
    if (!['L3','L4','L5','S4','S5','S6'].includes(level)) {
    alert('Invalid level'); return;
    }
    auth.createUserWithEmailAndPassword(email, password)
.then(user => {
db.collection('users').doc(user.user.uid).set({ name, level });
window.location = 'chat.html';
});
}


function sendMessage() {
const msg = message.value;
db.collection('messages').add({
text: msg,
time: Date.now()
});
message.value = '';
}
if (document.getElementById('messages')) {
    db.collection('messages').orderBy('time')
    .onSnapshot(snapshot => {
    messages.innerHTML = '';
    snapshot.forEach(doc => {
    messages.innerHTML += `<div class='message'>${doc.data().text}</div>`;
    });
    });

    }
function register() {
  const userName = document.getElementById('name').value;
  const userLevel = document.getElementById('level').value;
  const userEmail = document.getElementById('email').value;
  const userPassword = document.getElementById('password').value;

  // Check level
  if (!['L3','L4','L5','S4','S5','S6'].includes(userLevel)) {
    alert('Invalid level');
    return;
  }

  auth.createUserWithEmailAndPassword(userEmail, userPassword)
    .then(userCredential => {
      // Save name + level to Firestore
      db.collection('users').doc(userCredential.user.uid).set({
        name: userName,
        level: userLevel
      });
      // Redirect to chat
      window.location.href = 'chat.html';
    })
    .catch(error => {
      alert(error.message);
    });
}


