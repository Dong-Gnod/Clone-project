'use client';

import Image from 'next/legacy/image';
import logo from '../../public/logo.png';
import Link from 'next/link';
import { Search } from './Search';
import { motion, useScroll, useTransform } from 'framer-motion';
import clsx from 'clsx';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export function Nav() {
	const path = usePathname();
	const { scrollY } = useScroll();
	const backgroundColor = useTransform(scrollY, [0, 80], ['rgba(0,0,0,0)', 'rgba(0,0,0,1)']);
	console.log(path);
	return (
		<motion.nav
			style={{ backgroundColor }}
			className="flex w-full justify-between items-center fixed z-[100] font-RobotoMono  bg-black/40">
			<div className="flex items-center w-full px-5  bg-black/40">
				<Link href="/">
					<Image src={logo} alt="Netflix home" width={80} height={80} priority />
				</Link>
				<ul className="text-lg flex justify-start w-full font-black">
					<Link
						href="/"
						className={`${clsx({
							['text-red-600']: path === '/',
						})}`}>
						<li className="ml-5 text-sm hover:-translate-y-2 hover:text-red-600 duration-300 ">홈</li>
					</Link>
					<Link
						href="/moviePage"
						className={`${clsx({
							['text-red-600']: path === '/moviePage',
						})}`}>
						<li className="ml-5 text-sm hover:-translate-y-2 hover:text-red-600 duration-300 ">영화</li>
					</Link>
					<Link
						href="/seriesPage"
						className={`${clsx({
							['text-red-600']: path === '/seriesPage',
						})}`}>
						<li className="ml-5 text-sm hover:-translate-y-2 hover:text-red-600 duration-300 ">시리즈</li>
					</Link>
				</ul>
				<Search />
			</div>
		</motion.nav>
	);
}
