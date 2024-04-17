import { useContext, useEffect } from "react";
import { SessionContext } from "./components/contexts/SessionContext";
import { supabase } from "../lib/helper/supabaseClient";


const Homepage = () => {
  const { session, setSession } = useContext(SessionContext);

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