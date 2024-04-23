'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { Suspense, useState, lazy } from 'react';
import Loading from './Loading';

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

	return (
		<QueryClientProvider client={client}>
			<Suspense fallback={<Loading />}>
				{children}
				<ReactQueryDevtools initialIsOpen={true} />
				{showDevtools && <ReactQueryDevtoolsProduction />}
			</Suspense>
		</QueryClientProvider>
	);
}

export default RQProvider;
