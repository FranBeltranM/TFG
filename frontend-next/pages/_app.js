import Router from 'next/router'

import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '../styles/globals.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

Router.events.on('routeChangeStart', () => nProgress.start())
Router.events.on('routeChangeComplete', () => nProgress.done())
Router.events.on('routeChangeError', () => nProgress.done())

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page)
  return getLayout(<Component {...pageProps} />)
}

export default MyApp
