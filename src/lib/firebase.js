// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
// el taller considera una funcion donde estan todos los servicios de firebase y la importa, nosotras no.
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
//1 importar firestore
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDG0CfYFCo1QM8MFTFUJdhVPZSUkmDU958',
  authDomain: 'reda-d08aa.firebaseapp.com',
  projectId: 'reda-d08aa',
  storageBucket: 'reda-d08aa.appspot.com',
  messagingSenderId: '761765204956',
  appId: '1:761765204956:web:50f457c05bf2988ec17519',
};

// Initialize Firebase
// tutorial utiliza export, taller lo une todo en una sola funcion y la exporta. 
//2se inicializa
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// functiòn crear post que reciba los paràmetros y exportarla e importarla a el fedd
// a qui pondrìa los parametros internos consultar
// export const createPost = (titulo, descripcion) => { ... addDoc
export const saveUsers = (name, email, password, nationality, Bdate, ocupation, redaRol) => addDoc(collection(db, 'users'), {
  name, email, password, nationality, Bdate, ocupation, redaRol,
});
export const createpost = (titulo, descripcion) => {
  const colRef = addDoc(collection(db, 'post'), {
    titulo, descripcion,
  });
};
const colRef = collection(db, 'post');

export const getPost = () => {
  getDocs(colRef)
    .then((snapshot) => {
      let post =[]
      snapshot.docs.forEach((doc) => {
        post.push({ ...doc.data(), id: doc.id });
      });
      console.log(post)
    })
    .catch (err => {
console.log(err.message);
  })
  
};

/*
export const getPost = () => {
  getDocs(collection(db, 'post'));
  .then((snapshot) =>{
    let post =  []
    snapshot.docs.forEach((doc) => {
      post.push({...doc.data(),id:doc.id})
      
    });
console.log(post)
  })
  .catch (err => {
console.log(err.message)
  })
  
};
*/


// // Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);
