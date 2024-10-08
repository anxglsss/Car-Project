import Container from '@/components/shared/container'
import Navbar from '@/components/shared/navbar'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import localFont from 'next/font/local'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

const outfit = Outfit({
	subsets: ['latin'],
	variable: '--font-outfit',
	weight: ['400', '700'],
})

export const metadata: Metadata = {
	title: 'Async Race',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<head></head>
			<body className={`${outfit.variable} antialiased`}>
				<Navbar></Navbar>
				<Container>{children}</Container>
				<Toaster /> 
			</body>
		</html>
	)
}
