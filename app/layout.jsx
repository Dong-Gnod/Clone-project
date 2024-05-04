import './globals.css';
import RQProvider from './components/RQProvider';
import Nav from './components/Nav';
import { Suspense } from 'react';

export const metadata = {
	title: 'DFLIX',
	description: '영화와 시리즈 소개 페이지',
	icons: {
		icon: '/favicon.ico',
	},
};

export default function RootLayout({ children }) {
	const errorReload = () => {
		try {
			return;
		} catch (error) {
			window.location.reload('/');
		}
	};
	errorReload();
	return (
		<html>
			<body className="flex flex-col justify-between w-screen overflow-x-hidden">
				<div className=" bg-black/40">
					<Nav />
				</div>
				<RQProvider>
					<Suspense>
						<div>{children}</div>
					</Suspense>
				</RQProvider>
			</body>
		</html>
	);
}
