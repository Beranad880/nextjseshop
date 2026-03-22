import type { AppProps } from 'next/app'
import '../app/globals.css'
import MainLayout from '@/components/MainLayout'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}
