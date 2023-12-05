import Image from "next/image";
import logo from "./images/logo.png";
import Link from "next/link";

export default function Nav() {
  return (
    <div className="flex w-[50%] justify-between items-center mt-4 px-14 fixed z-[100] font-RobotoMono">
      <div className="flex mr-1.5 items-center bg-gray-900/50 px-5 rounded-md">
        <Link href="/main">
          <Image src={logo} alt="Netflix home" className="w-20 h-20" />
        </Link>
        {/* menu */}
        <ul className="text-sm flex justify-between max-w-7xl text-sm font-medium">
          <Link href="/main">
            <li className="ml-5 text-sm">홈</li>
          </Link>
          <Link href="/moviePage">
            <li className="ml-5 text-sm">영화</li>
          </Link>
          <Link href="/seriesPage">
            <li className="ml-5 text-sm">시리즈</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
