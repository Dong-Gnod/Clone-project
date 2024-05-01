import Image from 'next/image';

export default function Loading() {
	return (
		<div className="w-screen h-screen flex justify-center items-center bg-gray-400 opacity-40">
			<img src={'/loading.gif'} alt="loading" className="w-50 h-50" />
		</div>
	);
}
