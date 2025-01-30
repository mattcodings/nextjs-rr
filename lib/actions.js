"use server";

import { db } from "@/firebase";

import {
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";

export async function addUserInfoToRumble1(formData, rumbleNumber) {
  try {
    const uid = `RoyalRumble2025_${rumbleNumber}`;
    const userInfo = {
      uid,
      users: {}, // Object to store user data
    };

    // Loop through 20 users
    for (let i = 1; i <= 20; i++) {
      const userName = formData.get(`user${i}`);
      if (userName) {
        userInfo.users[userName] = {
          picks: [
            formData.get(`rumbleNum${i * 3 - 2}`), // First Number
            formData.get(`rumbleNum${i * 3 - 1}`), // Second Number
            formData.get(`rumbleNum${i * 3}`), // Third Number
          ],
          colors: {
            bg: formData.get(`bg-color-${i}`), // Background color
            text: formData.get(`text-color-${i}`), // Text color
          },
        };
      }
    }
    
    await setDoc(doc(db, `RoyalRumble`, uid), userInfo);
  } catch (error) {
    console.error("Error saving data:", error instanceof Error ? error.message : "Unknown error");
  }
}

export async function getUserInfoFromRumble1(retrieveRumbleNumber) {
  try {
    const docRef = doc(db, "RoyalRumble", `RoyalRumble2025_${retrieveRumbleNumber}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); // Return the stored object
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving data:", error instanceof Error ? error.message : "Unknown error");
    return null;
  }
}