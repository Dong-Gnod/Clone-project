'use client';

import Image from 'next/legacy/image';
import logo from '../../public/logo.png';
import Link from 'next/link';
import { Search } from './Search';
import { motion, useScroll, useTransform } from 'framer-motion';
import clsx from 'clsx';
import { Suspense, useState } from 'react';
import Loading from './Loading';

export function Nav() {
	const [active, isActive] = useState('');
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
						<li
							className={`ml-5 text-sm hover:-translate-y-2 hover:text-red-600 duration-300 ${clsx({
								['text-red-600']: active === 'home',
							})}`}
							onClick={() => isActive('home')}>
							홈
						</li>
					</Link>
					<Link href="/moviePage">
						<li
							className={`ml-5 text-sm hover:-translate-y-2 hover:text-red-600 duration-300 ${clsx({
								['text-red-600']: active === 'movie',
							})}`}
							onClick={() => isActive('movie')}>
							영화
						</li>
					</Link>
					<Link href="/seriesPage">
						<li
							className={`ml-5 text-sm hover:-translate-y-2 hover:text-red-600 duration-300 ${clsx({
								['text-red-600']: active === 'series',
							})}`}
							onClick={() => isActive('series')}>
							시리즈
						</li>
					</Link>
				</ul>
				<Suspense fallback={<Loading />}>
					<Search />
				</Suspense>
			</div>
		</motion.nav>
	);
}
