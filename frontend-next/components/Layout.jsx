import Head from 'next/head'
import { Header } from './Header'
import { Footer } from './Footer'

export default function Layout({ children }) {
  return (
    <div className='flex h-screen flex-col'>
      <Head>
        <title>🚗 CheckV.dev - Comprueba tu vehículo!</title>
      </Head>
      <Header />
      <main className='flex-grow'>{children}</main>
      <Footer />
    </div>
  )
}
