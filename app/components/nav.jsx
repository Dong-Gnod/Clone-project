import Image from 'next/image';
import logo from './images/logo.png'
import Link from 'next/link';


export default function Nav(){
  function navClick(e){
    const target = e.target;
    
  }

  return (
    <div className='flex w-full justify-between items-center mt-4 px-14 fixed z-[100] font-RobotoMono'>
      <div className='flex mr-1.5 items-center bg-gray-400/50 px-5 rounded-md'>
        <Link href="/main">
          <Image 
            src={logo} 
            alt='Netflix home' 
            className='w-20 h-20'
          />
        </Link>
        {/* menu */}
        <ul className='text-sm flex justify-between max-w-7xl text-sm font-medium' onClick={navClick}>
          <Link href="/main"><li className='ml-5 text-sm'>홈</li></Link>
          <li className='ml-5 text-sm'>시리즈</li>
          <li className='ml-5 text-sm mr-2.5'>영화</li>
        </ul>
      </div>
    </div>
    
  );
}