import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AppShell from '@/components/layouts/AppShell'
import Navbar from '@/components/layouts/navbar'
import Footer from '@/components/layouts/footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
  );
}
