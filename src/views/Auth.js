import { useContext, useEffect, useState } from "react";
import { supabase } from "../lib/helper/supabaseClient";
import { SessionContext } from "./components/contexts/SessionContext";

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { session, setSession } = useContext(SessionContext);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })


    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

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
        <div>

        <button onClick={signInWithEmail} disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        </div>
        <div>
        <button onClick={() => supabase.auth.signOut()} disabled={loading}>
          logout  
        </button>

        </div>
        <div>
          {session ? 'authenticated' : 'not authenticated'}
        </div>
    </div>
  );
}

export default Auth;