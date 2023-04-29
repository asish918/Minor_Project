import '@/styles/globals.scss'
import { SessionProvider } from "next-auth/react"
import { Layout } from 'components'
import { Provider } from 'react-redux'

import { store } from 'services/store'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Layout>
    </SessionProvider>
  )
}