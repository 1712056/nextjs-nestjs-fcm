import PushNotificationLayout from "../../components/PushNotificationLayout";
import styles from "../../styles/Home.module.css";

export default function Home() {
  return (
    <PushNotificationLayout>
      <div className={styles.container}>
        <main className={styles.main}>
          <h2>Home Page</h2>
        </main>
      </div>
    </PushNotificationLayout>
  );
}
