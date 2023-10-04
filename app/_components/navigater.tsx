import Image from 'next/image'
import Link from "next/link";
import styles from '@styles/components/navigater.module.scss';

export default function comp() {
  const navList = [
    { dir: "/", name: "홈", iconSrc: "/next.svg" },
    { dir: "/", name: "프로필", iconSrc: "/next.svg" },
  ]

  return (
    <div className={styles.nav_wrap}>
      {
        navList.map(({ dir, name, iconSrc }, index) => {
          return (
            <div key={index}>
              <Link href={dir} className={styles.nav_item}>
                <Image
                  src={iconSrc}
                  width={30}
                  height={30}
                  alt="navIcon"
                />
                <div>{name}</div>
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}