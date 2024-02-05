'use client';

import Image from 'next/image';
import logo from '../../public/logo.png';
import Link from 'next/link';
import { Search } from './Search';

import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';

export default function Nav() {
	const x = useMotionValue(0);
	const input = [-200, 0, 200];
	const output = [0, 1, 0];
	const opacity = useTransform(x, input, output);
	const { scrollY } = useScroll();
	const backgroundColor = useTransform(scrollY, [0, 80], ['rgba(0,0,0,0)', 'rgba(0,0,0,1)']);

	return (
		<motion.nav
			style={{ backgroundColor }}
			className="flex w-full justify-between items-center fixed z-[100] font-RobotoMono">
			<div className="flex items-center w-full px-5">
				<Link href="/">
					<Image src={logo} alt="Netflix home" className="w-20 h-20" />
				</Link>
				{/* menu */}

				<ul className="text-sm flex justify-start w-full font-medium">
					<Link href="/">
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
			<div className="mr-8">
				<Search />
			</div>
		</motion.nav>
	);
}
