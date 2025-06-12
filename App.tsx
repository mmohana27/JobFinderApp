import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import { initDB } from './utils/bookmarkDB.ts'; // Adjust if needed

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initDB().then(() => {
      console.log("✅ DB ready");
      setReady(true);
    }).catch(err => {
      console.error("❌ DB init failed", err);
    });
  }, []);

  if (!ready) return null; // or a splash/loading UI

  return <Slot />;
}
