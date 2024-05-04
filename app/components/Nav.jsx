'use client';

import Image from 'next/legacy/image';
import logo from '../../public/logo.png';
import Link from 'next/link';
import { Search } from './Search';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Suspense } from 'react';

export default function Nav() {
	const { scrollY } = useScroll();
	const backgroundColor = useTransform(scrollY, [0, 80], ['rgba(0,0,0,0)', 'rgba(0,0,0,1)']);

	return (
		<motion.nav
			style={{ backgroundColor }}
			className="flex w-full justify-between items-center fixed z-[100] font-RobotoMono  bg-black/40">
			<div className="flex items-center w-full px-5  bg-black/40">
				<Link href="/">
					<Image src={logo} alt="Netflix home" width={80} height={80} priority />
				</Link>

				<ul className="text-lg flex justify-start w-full font-black">
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
				<Suspense fallback={null}>
					<Search />
				</Suspense>
			</div>
		</motion.nav>
	);
}
