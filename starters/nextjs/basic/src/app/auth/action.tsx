'use client';

import { useEffect, useState } from 'react';
import { getAuth, confirmPasswordReset } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyD1u3m5OblQZ5MVAAl6gGa5p_zV18q7H1I",
  authDomain: "api-418916.firebaseapp.com",
  projectId: "youtube-api-418916",
  storageBucket: "youtube-api-418916.firebasestorage.app",
  messagingSenderId: "48309806360",
  appId: "1:48309806360:web:48f79e2016f17443a8ea6d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function AuthActionPage() {
  const [state, setState] = useState({ loading: true, error: null, success: false });
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    const oobCode = params.get('oobCode');

    if (mode === 'resetPassword' && oobCode) {
      setState({ loading: false, error: null, success: false });
      // Wait for user to enter password and submit…
    } else {
      setState({ loading: false, error: 'Invalid request', success: false });
    }
  }, []);

  const handleSubmit = async () => {
    const params = new URLSearchParams(window.location.search);
    const oobCode = params.get('oobCode');
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setState({ loading: false, error: null, success: true });
    } catch (err) {
      setState({ loading: false, error: err.message, success: false });
    }
  };

  if (state.loading) return <p>Loading…</p>;
  if (state.success) return <p>Password has been reset successfully.</p>;
  if (state.error) return <p>Error: {state.error}</p>;

  return (
    <div>
      <h1>Reset password</h1>
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Set new password</button>
    </div>
  );
}
