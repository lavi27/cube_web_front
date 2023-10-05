import styles from '@styles/components/header.module.scss';
import Image from 'next/image'
import Link from 'next/link';

export default function Comp() {
  return (
    <div className={styles.header_wrap}>
      <h5>덕소고큐브</h5>
      <div className={styles.buttons}>
        <Link href="./search">
          <Image
            src={"/icon/search.svg"}
            width={22}
            height={22}
            alt="Logo"
          />
        </Link>
        <Link href="./setting">
          <Image
            src={"/icon/setting.svg"}
            width={22}
            height={22}
            alt="Logo"
          />
        </Link>
      </div>
    </div>
  )
}