import Image from 'next/image';

export default function Loading() {
	return (
		<div className="w-dvw h-dvh bg-gray-400 opacity-40">
			<Image src={'/loading.gif'} width={100} height={100} alt="loading" />
		</div>
	);
}
