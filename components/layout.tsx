import styles from '@styles/components/layout.module.scss';
import Header from '@components/header';
import Navigater from '@components/navigater';

interface layoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: layoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <main>
        {children}
      </main>
      <Navigater />
    </div>
  )
};