import {auth, db} from './setup.js';
import { collection, onSnapshot } from "firebase/firestore";

export function watchUserChange(callback){
const unsub = auth.onAuthStateChanged((user) => {
  if (user && !user.isAnonymous) {
    console.log('User is signed in:', user);
    callback(
        {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
        }
    );
  } else {
    console.log('No user is signed in.');
    callback(null);
  }
});
return unsub;
};

export function watchShopUser(callback) {
    const collectionRef = collection(db, 'usuarios');
    const unsub = onSnapshot(collectionRef, (snapshot) => {
      const shopUsers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(shopUsers);
    });
  
    return unsub;
  }


