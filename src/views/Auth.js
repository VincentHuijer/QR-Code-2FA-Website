import { useContext, useEffect, useState } from "react";
import { supabase } from "../lib/helper/supabaseClient";
import { SessionContext } from "./components/contexts/SessionContext";
import { EnrollMFA } from "./components/EnrollMFA";
import FitnessLogo from "../media/FitnessLogo.png" 

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { session, setSession } = useContext(SessionContext);


  // useEffect(() => {
  //   supabase.auth.mfa.enroll();
  // })

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      console.log(session)
    })


    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      console.log(session)
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
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center bg-[#1C1C1E]">
    <div className=" w-9/12">
    <img src={FitnessLogo} alt="FitnessLogo"/>
      <div className="text-4xl font-bold ">Login</div>
        <div>
          <label>Email:</label>
          <input
            className='border border-black w-full outline-none p-2'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            className='border border-black w-full outline-none p-2'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='bg-[#5BE432] w-full mt-10 rounded-md' onClick={signInWithEmail} disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        <div>
          <button onClick={() => supabase.auth.signOut()} disabled={loading}>
            logout  
          </button>
        </div>
        <div>
          {session ? 'authenticated ✔️ '  : 'not authenticated ❌'}
        </div>
        {session &&
          <EnrollMFA 
            onEnrolled={() => {}}
            onCancelled={() => {}}
          />
        }
        </div>
      </div>
  );
}

export default Auth;