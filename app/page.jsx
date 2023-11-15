import Link from 'next/link';
import logo from './components/images/netflix-logo.png'
import Image from 'next/image';


export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-0 w-80 bg-main">
      <div className='w-full m-0'>
        <Link href="/main">
          <Image 
            src={logo} 
            alt='Netflix home' 
            className='w-20 h-8 m-5'
          />
        </Link>
        
        <div className='flex flex-col'>
          <h1 className='text-center'>로그인</h1>
          <input type="email" placeholder='이메일 주소' />
          <input type="password" placeholder='비밀번호' />
          <div>
            <button>로그인</button>
            <button>회원가입</button>
          </div>
        </div>
      </div>
    </main>
  )
}
