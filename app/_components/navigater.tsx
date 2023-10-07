"use client"
import Image from 'next/image'
import Link from "next/link";
import styles from '@styles/components/navigater.module.scss';
import { usePathname } from 'next/navigation';

export default function Comp() {
  const router = usePathname();

  const currentNav = "/" + router.split('/')[1];

  const navList = [
    { dir: "/", name: "홈", iconSrc: "/icon/home.svg" },
    { dir: "/profile", name: "프로필", iconSrc: "/icon/profile.svg" },
  ]

  return (
    <div className={styles.nav_wrap}>
      {
        navList.map(({ dir, name, iconSrc }, index) => {
          return (
            <Link href={dir} key={index} className={`${styles.nav_item} ${dir == currentNav ? styles.highlight : ""}`}>
              <Image
                src={iconSrc}
                width={18}
                height={18}
                alt="navIcon"
              />
              <div>{name}</div>
            </Link>
          )
        })
      }
    </div>
  )
}