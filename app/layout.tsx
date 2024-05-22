import './globals.css';
import RQProvider from './components/RQProvider';
import { Nav } from './components/Nav';
import InitialContents from './hooks/useHydrate';
import { ReactNode } from 'react';

export const metadata = {
	title: 'DFLIX',
	description: '영화와 시리즈 소개 페이지',
	icons: {
		icon: '/favicon.ico',
	},
};

export default async function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html>
			<body className="flex flex-col justify-between w-screen overflow-x-hidden">
				<RQProvider>
					<div className=" bg-black/40">
						<Nav />
					</div>

					<InitialContents>
						<main>{children}</main>
					</InitialContents>
				</RQProvider>
			</body>
		</html>
	);
}
