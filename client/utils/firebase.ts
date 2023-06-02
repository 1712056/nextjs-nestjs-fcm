import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import localforage from "localforage";

const firebaseCloudMessaging = async () => {
  const firebaseConfig = {
    apiKey: "AIzaSyB3_tT1yJKTylUwBtyKC8rYI_WrJMDRjg4",
    authDomain: "push-notification-ea92e.firebaseapp.com",
    projectId: "push-notification-ea92e",
    storageBucket: "push-notification-ea92e.appspot.com",
    messagingSenderId: "308514400804",
    appId: "1:308514400804:web:2f6b0e2446873b34a146b1",
    measurementId: "G-B0SHBHLJDT",
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);
  const tokenInLocalForage = await localforage.getItem("fcm_token");
  // Return the token if it is alredy in our local storage
  if (tokenInLocalForage !== null) {
    return tokenInLocalForage;
  }
  // Request the push notification permission from browser
  const status = await Notification.requestPermission();
  if (status && status === "granted") {
    // Get new token from Firebase
    const fcm_token = await getToken(messaging, {
      vapidKey:
        "BPlw6Ad6Ht7KdvpJIGQA3SY5FbykFnxaHbjV0zmbMBXhAL6zb_SmGbeuQhPX8m3-ZjBcVmqdlbqoqt3kxNgDPqQ",
    });

    // Set token in our local storage
    if (fcm_token) {
      console.log(fcm_token)
      localforage.setItem("fcm_token", fcm_token);
      return fcm_token;
    }
  }
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
  });
};

export { firebaseCloudMessaging };
