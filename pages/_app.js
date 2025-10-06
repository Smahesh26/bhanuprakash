import Head from 'next/head';
import { useEffect } from 'react';

function removeLayoutLinks() {
	document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
		try {
			const href = (link.getAttribute('href') || link.href || '').toLowerCase();
			if (href.includes('layout.css')) {
				if (link.parentNode) link.parentNode.removeChild(link);
				else link.disabled = true;
			}
		} catch (e) { /* noop */ }
	});
}

export default function MyApp({ Component, pageProps }) {
	useEffect(() => {
		let removed = false;
		const tryRemove = () => {
			removeLayoutLinks();
			removed = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
				.every(l => !((l.getAttribute('href') || l.href || '').toLowerCase().includes('layout.css')));
		};

		// run asap
		tryRemove();

		// observe DOM for late inserts
		let mo;
		try {
			mo = new MutationObserver(tryRemove);
			mo.observe(document.documentElement || document, { childList: true, subtree: true });
		} catch (e) { /* noop */ }

		// interval fallback for brief race conditions
		let attempts = 0;
		const int = setInterval(() => {
			tryRemove();
			attempts++;
			if (removed || attempts > 20) clearInterval(int);
		}, 250);

		const timeout = setTimeout(() => {
			if (mo && mo.disconnect) mo.disconnect();
			clearInterval(int);
		}, 8000);

		return () => {
			if (mo && mo.disconnect) mo.disconnect();
			clearInterval(int);
			clearTimeout(timeout);
		};
	}, []);

	return (
		<>
			<Head>
				{/* canonical stylesheet only (cache-busted) */}
				<link rel="stylesheet" href="/assets/css/main.css?v=20250924" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}
