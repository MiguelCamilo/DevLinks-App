import Layout from '@/components/Layout';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import EditModal from '@/components/modals/EditModal';
import FollowersModal from '@/components/modals/FollowersModal';
import FollowingModal from '@/components/modals/FollowingModal';
import PostModal from '@/components/modals/PostModal';

import { Analytics } from '@vercel/analytics/react'

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<Toaster />
			<LoginModal />
			<RegisterModal />
			<EditModal />
			<FollowersModal />
			<FollowingModal />
			<PostModal />
			<Layout>
				<Component {...pageProps} />
				<Analytics />
			</Layout>
		</SessionProvider>
	);
}
