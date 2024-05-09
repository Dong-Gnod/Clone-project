import { useEffect } from 'react';
import { Top } from '../assets/icons';

export function TopBtn({ onShowTop }) {
	const topButtonShow = () => {
		if (window.scrollY > 250) {
			onShowTop(true);
		} else {
			onShowTop(false);
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
			<button className="text-red-500 w-10 h-10 fixed bottom-16 right-6" onClick={MoveToTop}>
				<Top />
			</button>
		</>
	);
}
