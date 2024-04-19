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

    {session && (
      <EnrollMFA 
        onEnrolled={() => {}}
        onCancelled={() => {}}
      />
    )}
    {!session && (
    <div>
      <img src={FitnessLogo} alt="FitnessLogo" className="mt-10 rounded-full border-5 border-white w-50 h-50"/>
        <div className="text-4xl font-bold text-white text-center mt-5">MoggingFitness</div>
        <div className="text-3xl font-bold text-white text-center mt-3">Login</div>
          <div className="mt-5">
            <label className="text-[#9CA3AF] font-bold mt-2">Enter Email</label>
            <input
              className='w-full placeholder-[#9CA3AF] text-white bg-[#1C1C1E] mt-1'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
            <div className="border-b-2 border-[#9CA3AF] mt-1"/>
          </div>
          <div className="mt-5">
            <label className="text-[#9CA3AF] font-bold mt-2">Enter Password</label>
            <input
              className='w-full placeholder-[#9CA3AF] text-white bg-[#1C1C1E] '
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
            <div className="border-b-2 border-[#9CA3AF] mt-1">
            </div>
          </div>
          <button className='bg-[#2CB3FC] w-full mt-10 p-2 rounded-sm' onClick={signInWithEmail} disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
          <div className="mb-24">
            <button className='bg-[#2CB3FC] w-full mt-10 p-2 rounded-sm' onClick={() => supabase.auth.signOut()} disabled={loading}>
              logout  
            </button>
          </div>
          <div className="text-2xl text-white" >
            status:  {session ? 'authenticated ✔️ '  : 'not authenticated ❌'}
          </div>
          {/* {session &&
            <EnrollMFA 
              onEnrolled={() => {}}
              onCancelled={() => {}}
            />
          } */}
          </div>
      )}
      </div>
    </div>
  );
}

export default Auth;