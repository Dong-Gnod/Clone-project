'use client'

import { addDoc, collection, where, getDocs, query } from 'firebase/firestore';
import logo from './components/images/logo.png'
import Image from 'next/image';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { auth, firestore } from "@/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from './store/useAuth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Home() {
  const [isLogin, setLogin] = useState(true);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const { signIn } = useAuth();
  const { user } = useAuth();
  const router = useRouter();

  const handleGoogleLoginButtonClick = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const { user } = result;
    const newUser = {
      id: user.uid,
      email: user.email.split('@')[0],
    }
    signIn(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    router.push('/main');
  }

  return (
    <main className="flex min-h-screen flex-col py-0 w-full bg-main font-RobotoMono">
      <div className='w-full m-0 min-h-screen'>

        <Image 
          src={logo} 
          alt='Netflix home' 
          className='w-20 h-20 m-5'
        />

        <div className='relative items-center justify-center text-black mx-auto translate-y-[55%]'>
          <div className='flex flex-col bg-gray-700/70 p-3 rounded-md w-80 mx-auto'>
            <h1 className='text-center m-5 text-white'>DFLIX</h1>
            <div className='text-center mb-3'>
              <input 
                type="text" 
                placeholder='ID' 
                value={id} 
                onChange={e => setId(e.target.value)}
                className='rounded-md p-2'
              />
            </div>
            <div className='text-center  mb-3'>
              <input 
                type="password" 
                placeholder='Password' 
                value={pw} 
                onChange={e => setPw(e.target.value)}
                className='rounded-md p-2'
              />
            </div>

            {!isLogin && (
              <div className='text-center mb-3'>
                <input 
                  type="password" 
                  placeholder='Password Check' 
                  value={pwConfirm} 
                  onChange={e => setPwConfirm(e.target.value)}
                  className='rounded-md p-2'
                />
              </div>
            )}
            
            <div className='flex justify-evenly mb-3'>
              <button
                onClick={async () => {
                  if (isLogin) {
                    const storedUser = await getDocs(
                      query(collection(firestore, "users"), where("name", "==", id))
                    );
                    const targetUsers = [];
                    storedUser.forEach((doc) => targetUsers.push(doc.data()));
                    if (targetUsers.length === 0) {
                      window.alert("해당 계정으로 가입된 정보가 없습니다");
                      return;
                    }
                    if (targetUsers.length > 1) {
                      console.error("데이터가 꼬인것 같아요");
                      return;
                    }
                    const targetUser = targetUsers[0];
                    if (targetUser.pw !== pw) {
                      window.alert("비밀번호가 다릅니다.");
                      return;
                    }
        
                    window.alert("로그인에 성공했습니다.");
                    signIn(targetUser);
                    // localStorage.setItem("user", JSON.stringify(targetUser));
                    router.push("/main");
                    return;
                  }
        
                  // 회원가입 모드
        
                  // validation
                  if (pw !== pwConfirm) {
                    window.alert("두개의 비밀번호가 다릅니다");
                    return;
                  }
        
                  const storedUser = await getDocs(
                    query(collection(firestore, "users"), where("name", "==", id))
                  );
                  const targetUsers = [];
                  storedUser.forEach((doc) => targetUsers.push(doc.data()));
                  if (targetUsers.length > 0) {
                    window.alert(
                      "중복된 계정 정보 이름이 있습니다. 이름을 변경해주세요."
                    );
                    return;
                  }
        
                  const newUser = {
                    id: uuidv4(),
                    name: id,
                    pw,
                  };
                  await addDoc(collection(firestore, "users"), newUser);
                  // localStorage.setItem("user", JSON.stringify(newUser));
                  signIn(newUser);
                  window.alert("회원가입에 완료했습니다");
                  router.push("/");

                  if (user) return router.push('/');
                  router.push('/');
                }}
                className='hover:border-solid hover:border-2 hover:text-red-600 hover:border-red-600 hover:rounded-md text-white p-2'
              >
                {isLogin ? '로그인' : '회원가입'}
              </button>
              <button 
              onClick={() => {setLogin(!isLogin)}}
              className='hover:border-solid hover:border-2 hover:text-red-600 hover:border-red-600 hover:rounded-md text-white p-2 text-center'
              >
                {isLogin ? '회원가입' : '로그인하러 가기'}
              </button>
            </div>
            <button 
              onClick={handleGoogleLoginButtonClick}
              className='hover:border-solid hover:border-2 hover:text-red-600 hover:border-red-600 hover:rounded-md text-white p-2'
            >
              구글 로그인
            </button>
          </div>
        </div>
        
      </div>
    </main>
  )
}
