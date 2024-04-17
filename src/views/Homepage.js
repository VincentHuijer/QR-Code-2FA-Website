import { useContext, useEffect } from "react";
import { SessionContext } from "./components/contexts/SessionContext";
import { supabase } from "../lib/helper/supabaseClient";


const Homepage = () => {
  const { session, setSession } = useContext(SessionContext);


  //goal is to remove thise useEffect and use the useContext for session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
  })
  
  return (
  <div>
    <a href="/Auth">go to login</a>
    <div>
      {session ? 'authenticated' : 'not authenticated'}
    </div>
  </div>
  )
}

export default Homepage;