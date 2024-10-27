import { Button } from 'flowbite-react';
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { SignInStart, SignInSuccess, SignInFailure } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { DIVULGE } from "../serverUrl.js"

export default function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async () =>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
             //console.log(resultsFromGoogle.user.displayName)
             dispatch(SignInStart());
            const res = await fetch(`${DIVULGE}/blog/auth/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
                credentials: 'include',
                });
                //console.log(res)
            const data = await res.json()
            if (data.success === false) {
                dispatch(SignInFailure(data.message));
              }
        
            if (res.ok){
                dispatch(SignInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    } 

  return (
    <Button type='button' color='light' className='bg-transparent dark:bg-inherit'  onClick={handleGoogleClick}>
        <FcGoogle className='w-6 h-5 mr-2 '/>
        Sign in with Google
    </Button>
  )
}