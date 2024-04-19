import { useEffect, useState } from "react"
import { supabase } from "../../lib/helper/supabaseClient"

/**
 * EnrollMFA shows a simple enrollment dialog. When shown on screen it calls
 * the `enroll` API. Each time a user clicks the Enable button it calls the
 * `challenge` and `verify` APIs to check if the code provided by the user is
 * valid.
 * When enrollment is successful, it calls `onEnrolled`. When the user clicks
 * Cancel the `onCancelled` callback is called.
 */
export function EnrollMFA({ onEnrolled, onCancelled }) {

  const [factorId, setFactorId] = useState('')
  const [qr, setQR] = useState('') // holds the QR code image SVG
  const [verifyCode, setVerifyCode] = useState('') // contains the code entered by the user
  const [error, setError] = useState('') // holds an error message

  const logOut = () => {
    console.log('pressed log out')
    supabase.auth.signOut()
  }

  const onEnableClicked = () => {
    setError('')
    ;(async () => {
      const challenge = await supabase.auth.mfa.challenge({ factorId })
      if (challenge.error) {
        setError(challenge.error.message)
        throw challenge.error
      }

      const challengeId = challenge.data.id

      const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId,
        code: verifyCode,
      })
      if (verify.error) {
        setError(verify.error.message)
        throw verify.error
      }

      onEnrolled()
    })()
  }

  useEffect(() => {
    ;(async () => {
     const response = await supabase.auth.mfa.enroll({
  factorType: 'totp',
});

if (response.error) {
  throw response.error;
}

const { data } = response;

      setFactorId(data.id)

      setQR(data.totp.qr_code)
    })()
  }, [])

  return (
    <>
      {error && <div className="error">{error}</div>}
      <img src={qr} alt="QR code" className="mx-auto mb-10 flex w-full"/>
      <input
        type="text"
        value={verifyCode}
        onChange={(e) => setVerifyCode(e.target.value.trim())}
        className='w-full placeholder-[#9CA3AF] text-white bg-[#1C1C1E]'
        placeholder="enter token"
      />
      <div>
        <div className="border-b-2 border-[#9CA3AF] mb-10"/>
        <input className="bg-[#2CB3FC] w-full p-2 rounded-sm" type="button" value="Enable" onClick={onEnableClicked} />
      </div>
      <div className="mt-5">
        <input className="bg-[#2CB3FC] w-full p-2 rounded-sm" type="button" value="Cancel" onClick={logOut} />
      </div>
    </>
  )
}
