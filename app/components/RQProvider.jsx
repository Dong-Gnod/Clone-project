'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { Suspense, useEffect, useState, lazy } from 'react';

const ReactQueryDevtoolsProduction = lazy(() => {
	import('@tanstack/react-query-devtools/build/modern/production.js').then((d) => ({
		default: d.ReactQueryDevtools,
	}));
});

function RQProvider({ children }) {
	const [showDevtools, setShowDevtools] = useState(false);
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
					retryOnMount: true,
					refetchOnReconnect: false,
					retry: false,
				},
			},
		})
	);

	useEffect(() => {
		window.toggleDevtools = () => setShowDevtools((old) => !old);
	}, []);

	return (
		<QueryClientProvider client={client}>
			{children}
			<ReactQueryDevtools initialIsOpen={true} />
			{showDevtools && (
				<Suspense fallback={null}>
					<ReactQueryDevtoolsProduction />
				</Suspense>
			)}
		</QueryClientProvider>
	);
}

export default RQProvider;
