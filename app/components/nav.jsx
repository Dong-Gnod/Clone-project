import Image from 'next/image';
import logo from './images/logo.png'
import Profile  from './images/profile.png';
import { Search, Bell, Arrow } from './icons/icons'
import Link from 'next/link';


export default function Nav(){
  return (
    <div className='flex w-full justify-between items-center mt-4 px-14 fixed z-[100]'>
      <div className='flex mr-1.5 items-center'>
        <Link href="/main">
          <Image 
            src={logo} 
            alt='Netflix home' 
            className='w-20 h-20 mr-4'
          />
        </Link>

        {/* menu */}
        <div className='text-sm flex justify-between max-w-7xl text-sm font-medium'>
          <Link href="/main"><span className='ml-5 text-sm'>홈</span></Link>
          <span className='ml-5 text-sm'>시리즈</span>
          <span className='ml-5 text-sm'>영화</span>
        </div>
      </div>
    </div>
  );
}