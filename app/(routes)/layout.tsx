'use client'
import styles from '@styles/layout.module.scss';
import Header from '@components/header';
import Navigater from '@components/navigater';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body>
        <div className={styles.layout}>
          <Header />
          <main>
            {children}
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
            }
          `
              }
            </style>
          </main>
          <Navigater />
        </div>
      </body>
    </html>
  )
};