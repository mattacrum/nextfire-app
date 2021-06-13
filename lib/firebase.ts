import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD3nT3Dxdot844zQFOzVdgi97AFcbD8Nlg",
    authDomain: "nextfire-app-2ddfd.firebaseapp.com",
    projectId: "nextfire-app-2ddfd",
    storageBucket: "nextfire-app-2ddfd.appspot.com",
    messagingSenderId: "973506070899",
    appId: "1:973506070899:web:3deed51f7be9ab436f9d06",
    measurementId: "G-8XYK53VSR5"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

// Helper functions

/**
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
 export async function getUserWithUsername(username) {
    const usersRef = firestore.collection('users');
    const query = usersRef.where('username', '==', username).limit(1);
    const userDoc = (await query.get()).docs[0];
    return userDoc;
  }
  
  /**`
   * Converts a firestore document to JSON
   * @param  {DocumentSnapshot} doc
   */
  export function postToJSON(doc) {
    const data = doc.data();
    return {
      ...data,
      // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
      createdAt: data.createdAt.toMillis(),
      updatedAt: data.updatedAt.toMillis(),
    };
  }
