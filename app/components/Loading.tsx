import Image from 'next/image';

export default function Loading() {
	return (
		<div className="w-full h-full flex justify-center items-center bg-gray-400 opacity-40">
			<Image src={'/loading.gif'} width={150} height={150} alt="loading" />
		</div>
	);
}
