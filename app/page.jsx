import logo from './components/images/logo.png'
import Image from 'next/image';


export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col py-0 w-full bg-main font-RobotoMono">
      <div className='w-full m-0'>

        <Image 
          src={logo} 
          alt='Netflix home' 
          className='w-20 h-20 m-5'
        />

        <div className='relative items-center justify-center'>
          <div className='flex flex-col bg-gray-400/50 p-3 rounded-md w-80 mx-auto my-auto'>
            <h1 className='text-center'>로그인</h1>
            <input type="email" placeholder='이메일 주소' />
            <input type="password" placeholder='비밀번호' />
            <div>
              <button>로그인</button>
              <button>회원가입</button>
            </div>
          </div>
        </div>
        
      </div>
    </main>
  )
}
