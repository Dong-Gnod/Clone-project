'use client';

import { useEffect, useState } from 'react';
import { Top } from '../assets/icons';

export const TopBtn = () => {
	const [showTop, setShowTop] = useState(false);

	useEffect(() => {
		const topButtonShow = () => {
			if (window.scrollY > 500) {
				setShowTop(true);
			} else {
				setShowTop(false);
			}
		};
		window.addEventListener('scroll', topButtonShow);
		return () => {
			window.removeEventListener('scroll', topButtonShow);
		};
	}, [showTop]);

	const MoveToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<>
			{showTop && (
				<button className="text-red-500 w-10 h-10 fixed bottom-16 right-6" onClick={MoveToTop}>
					<Top />
				</button>
			)}
		</>
	);
};
