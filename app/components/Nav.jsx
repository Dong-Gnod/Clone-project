import Image from 'next/image';
import logo from './imgs/netflix-logo.png'
import Profile  from './imgs/profile.png';
import { Search, Bell } from './icons/icons'

export const Nav = () => {
  return (
    <div className='flex w-full justify-between items-center'>
      <Image 
        src={logo} 
        alt='Netflix home' 
        className='w-24 h-8'
      />
      {/* menu */}
      <div className='text-sm flex'>
        <span>홈</span>
        <span>시리즈</span>
        <span>영화</span>
        <span>NEW! 요즘 대세 콘텐츠</span>
        <span>내가 찜한 리스트</span>
        <span>언어별로 찾아보기</span>
      </div>
      {/* icons */}
      <div className='flex'>
        <Search />
        <span>키즈</span>
        <Bell />
        <Image
          className='w-8'
          src={Profile} 
          alt='profile' 
        />
      </div>
    </div>
  );
}