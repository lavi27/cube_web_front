"use client"
import Image from 'next/image'
import Link from "next/link";
import styles from '@styles/components/navigater.module.scss';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getAccount } from '@app/_api';

export default function Comp() {
  const [navList, setNavList] = useState(
    [
      { dir: "/", name: "홈", iconSrc: "/icon/home.svg" },
      { dir: `/signin`, name: "로그인", iconSrc: "/icon/profile.svg" },
    ]
  );

  const router = usePathname();

  const fetchData = useCallback(async () => {
    getAccount()
      .then(res => {
        const tmp = [...navList];
        tmp[1] = { dir: `/profile/${res}`, name: "프로필", iconSrc: "/icon/profile.svg" }

        setNavList(tmp);
      })
      .catch(err => {
        switch (err.errorType) {
          case 1: {
            break
          }
        }
      })
  }, [navList])

  useEffect(() => {
    fetchData();
  }, [fetchData])


  const currentNav = "/" + router.split('/')[1];

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