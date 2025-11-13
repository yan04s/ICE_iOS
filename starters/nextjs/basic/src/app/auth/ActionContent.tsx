

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { initializeApp } from 'firebase/app';
import { getAuth, applyActionCode, confirmPasswordReset } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1u3m5OblQZ5MVAAl6gGa5p_zV18q7H1I",
  authDomain: "icetech.my",
  projectId: "youtube-api-418916",
  storageBucket: "youtube-api-418916.firebasestorage.app",
  messagingSenderId: "48309806360",
  appId: "1:48309806360:web:48f79e2016f17443a8ea6d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function ActionPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const oobCode = searchParams.get('oobCode');
  const [message, setMessage] = useState<string>('Loading…');
  const [newPassword, setNewPassword] = useState<string>('');
  const [showResetForm, setShowResetForm] = useState<boolean>(false);

  useEffect(() => {
    // ensure oobCode is valid string
    if (!mode || !oobCode) {
      setMessage('Invalid action link.');
      return;
    }

    if (mode === 'resetPassword') {
      setShowResetForm(true);
      setMessage('');
    } else if (mode === 'verifyEmail') {
      applyActionCode(auth, oobCode)
        .then(() => {
          setMessage('Email verified — you may now sign in.');
        })
        .catch((error) => {
          setMessage(`Error verifying email: ${error.message}`);
        });
    } else {
      setMessage('Unsupported action.');
    }
  }, [mode, oobCode]);  

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    if (!oobCode) {
      setMessage('Missing action code for reset.');
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage('Password has been reset — you may now sign in.');
      setShowResetForm(false);
    } catch (error: any) {
      setMessage(`Error resetting password: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Account Action</h1>
      {message && <p>{message}</p>}
      {showResetForm && (
        <form onSubmit={handleReset}>
          <div>
            <label>New Password:</label><br/>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
}
