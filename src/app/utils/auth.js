// lib/auth.js
import { auth, firestore } from '../../../firebase';

export const registerWithEmail = async (email, password, firstName, lastName) => {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await firestore.collection('users').doc(user.uid).set({
      email: email,
      firstName: firstName,
      lastName: lastName,
      grandTotal: 0,
      itemTrips: {},
      locationTotals: {},
      locationTrips: {},
      mostBoughtItem: -1,
      mostSpentLocation: 0,
      mostVisitedLocation: 0,
      password: password,
      stateTotals: {},
      stateTrips: {},
      stateUniques: {},
      totalLocations: 0,
      totalStates: 0,
      totalTrips: 0,
    });
    return user;
  };

export const loginWithEmail = async (email, password) => {
  const { user } = await auth.signInWithEmailAndPassword(email, password);
  return user;
};

export const logout = async () => {
  await auth.signOut();
};
