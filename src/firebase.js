import firebase from 'firebase/app'
import  "firebase/auth"
import  "firebase/firestore"
import  "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBwSuWvxNdUpwVp_e8reWSUN1HN2UtTjC0",
  authDomain: "gdrive-clone-abaf4.firebaseapp.com",
  projectId: "gdrive-clone-abaf4",
  storageBucket: "gdrive-clone-abaf4.appspot.com",
  messagingSenderId: "261707251603",
  appId: "1:261707251603:web:893abd1177237d58117266",
  measurementId: "G-7CQGZCF2ZJ"

  };
const app = firebase.initializeApp(firebaseConfig)
const firestore = app.firestore();
export const database = {
  folders : firestore.collection("folders"),
  files :  firestore.collection("files"),
  formatDoc : doc =>{
    return {
      id : doc.id,
      ...doc.data()
  }
  },
  getCurrentTimestamp : firebase.firestore.FieldValue.serverTimestamp
}
export const auth = app.auth();
export const storage  = app.storage();
export default  app;