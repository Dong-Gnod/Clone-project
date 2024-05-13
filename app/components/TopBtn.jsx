'use client';
import { useEffect, useState } from 'react';
import { Top } from '../assets/icons';

export const TopBtn = () => {
	const [showTop, setShowTop] = useState(false);

	const topButtonShow = () => {
		if (window.scrollY > 250) {
			setShowTop(true);
		} else {
			setShowTop(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', topButtonShow);
		return () => {
			window.removeEventListener('scroll', topButtonShow);
		};
	}, []);

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
