import Image from 'next/image';

export default function Loading({ title }) {
	return (
		<div className="w-screen h-screen flex justify-center items-center bg-gray-400 opacity-40">
			<Image src={'/loading.gif'} alt="loading" width={200} height={200} unoptimized={true} priority />
			<h1>{title} Loading</h1>
		</div>
	);
}
