"use client";
import { useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import firebase from "firebase/app";
import { firebaseCloudMessaging } from "../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const PushNotificationLayout = ({ children }: any) => {
  const router = useRouter();

  useEffect(() => {
    setToken();
    // Event listener that listens for the push notification event in the background
  });
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      console.log(1);
      //   navigator.serviceWorker.addEventListener("message", (event) => {
      //     console.log(
      //       "event for the service worker",
      //       event
      //     )
      //   });
      const messaging = getMessaging();
      onMessage(messaging, (payload) => {
        console.log("Message received.1 ", payload);
      });
    }
  });

  // Calls the getMessage() function if the token is there
  async function setToken() {
    try {
      const token = await firebaseCloudMessaging();
      if (token) {
        console.log("token", token);
        getMessage();
      }
    } catch (error) {
      console.log(error);
    }
  }
  // Get the push notification message and triggers a toast to show it
  function getMessage() {
    const messaging = getMessaging();
    console.log(messaging);
    onMessage(messaging, (payload) => {
      console.log("mess: ", payload);
      toast(
        <div onClick={() => handleClickPushNotification(payload?.data?.url)}>
          <h5>{payload?.notification?.title}</h5>
          <h6>{payload?.notification?.body}</h6>
          <h6>1</h6>
        </div>,
        {
          closeOnClick: false,
        }
      );
    });
  }
  // Handles the click function on the toast showing push notification
  const handleClickPushNotification = (url: any) => {
    router.push(url);
  };
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default PushNotificationLayout;
