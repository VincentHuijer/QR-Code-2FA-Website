import { useEffect, useState } from "react";
import { supabase } from "../lib/helper/supabaseClient";


const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error.message);
    }
    console.log()
    setLoading(false);
  }

  return (
    <div>
      <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={signInWithEmail} disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>
    </div>
  );
}

export default Auth;