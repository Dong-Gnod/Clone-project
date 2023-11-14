import Image from 'next/image';
import logo from './images/netflix-logo.png'
import Profile  from './images/profile.png';
import { Search, Bell, Arrow } from './icons/icons'
import Link from 'next/link';


export default function Nav(){
  return (
    <div className='flex w-full justify-between items-center mt-4 px-14 fixed'>
      <div className='flex mr-1.5 items-center'>
        <Link href="/main">
          <img 
            src={logo} 
            alt='Netflix home' 
            className='w-20 h-8 mr-4'
          />
        </Link>

        {/* menu */}
        <div className='text-sm flex justify-between max-w-7xl text-sm font-medium'>
          <Link href="/main"><span className='ml-5 text-sm'>홈</span></Link>
          <span className='ml-5 text-sm'>시리즈</span>
          <span className='ml-5 text-sm'>영화</span>
          <span className='ml-5 text-sm'>NEW! 요즘 대세 콘텐츠</span>
          <span className='ml-5 text-sm'>내가 찜한 리스트</span>
          <span className='ml-5 text-sm'>언어별로 찾아보기</span>
        </div>
      </div>

      {/* icons */}
      <div className='flex justify-evenly w-52 items-center'>
        <Search />
        <span className='text-sm font-medium'>키즈</span>
        <Bell />
        <Image
          className='w-8'
          src={Profile} 
          alt='profile' 
        />
        <div className='hover:rotate-180 transition duration-300 ease-in-out'>
          <Arrow />
        </div>

      </div>
    </div>
  );
}