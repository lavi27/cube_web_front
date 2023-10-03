import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import Layout from '@components/layout'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <Layout>
      <Component {...pageProps} />
      <style jsx global>
        {
          `
            @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

            * {
              font-family: Pretendard,
                'Noto Sans KR',
                sans-serif;
            }

            body {
              margin: 0px;
              padding: 0px;
              background: #777;
            }
          `
        }
      </style>
    </Layout>
  )
}