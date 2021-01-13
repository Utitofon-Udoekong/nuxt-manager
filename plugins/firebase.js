import firebase from 'firebase/app'
import 'firebase/firestore'

export default ({ env, store }, inject) => {
  const firebaseConfig = {
    apiKey: "AIzaSyAzJ68YsFmoG5wgREkMFOIoi9KadW_nAR4",
      authDomain: "jinder-5fac5.firebaseapp.com",
      projectId: "jinder-5fac5",
      storageBucket: "jinder-5fac5.appspot.com",
      messagingSenderId: "107422233979",
      appId: "1:107422233979:web:c2db1bf16a43e2708f39de"
  }

  if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
  }

  inject('firebase', firebase)
}