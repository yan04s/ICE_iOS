// /pages/auth/action.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { initializeApp } from 'firebase/app';
import { getAuth, confirmPasswordReset, applyActionCode } from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1u3m5OblQZ5MVAAl6gGa5p_zV18q7H1I",
  authDomain: "api-418916.firebaseapp.com",
  projectId: "youtube-api-418916",
  storageBucket: "youtube-api-418916.firebasestorage.app",
  messagingSenderId: "48309806360",
  appId: "1:48309806360:web:48f79e2016f17443a8ea6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function ActionPage() {
  const router = useRouter();
  const { mode, oobCode, apiKey, lang } = router.query;
  const [message, setMessage] = useState('Loading…');
  const [newPassword, setNewPassword] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);

  useEffect(() => {
    if (!mode || !oobCode) {
      setMessage('Invalid action link.');
      return;
    }

    if (mode === 'resetPassword') {
      // show the form to input new password
      setShowResetForm(true);
      setMessage('');
    } else if (mode === 'verifyEmail') {
      // handle email verification if you want
      applyActionCode(auth, oobCode)
        .then(() => {
          setMessage('Your email has been verified. You may now sign in.');
        })
        .catch((error) => {
          setMessage(`Error verifying email: ${error.message}`);
        });
    } else {
      setMessage('Unsupported action.');
    }
  }, [mode, oobCode, auth]);

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage('Password has been reset. You may now sign in.');
      setShowResetForm(false);
    } catch (error) {
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
            <label>New Password:</label>
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
