"use client";
import { useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { firebaseCloudMessaging } from "../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const PushNotificationLayout = ({ children }: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  useEffect(() => {
    setToken();
    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
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
