"use client"
import Image from 'next/image'
import Link from "next/link";
import styles from '@styles/components/navigater.module.scss';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getAccount } from '@app/_api';
import { useBearStore } from '@app/_utils/store';

export default function Comp() {
  const [navList, setNavList] = useState(
    [
      { dir: "/", dirName: "", name: "홈", iconSrc: "/icon/home" },
      { dir: `/signin`, dirName: "signin", name: "로그인", iconSrc: "/icon/profile" },
    ]
  );

  const router = usePathname();
  const { setUser } = useBearStore();
  const currentNav = router.split('/')[1];

  const fetchData = useCallback(() => {
    getAccount().then(res => {
      setUser(res);
      setNavList([
        { dir: "/", dirName: "", name: "홈", iconSrc: "/icon/home" },
        { dir: "/write", dirName: "write", name: "글쓰기", iconSrc: "/icon/write" },
        { dir: `/profile/${res.userId}`, dirName: "profile", name: "프로필", iconSrc: "/icon/profile" },
      ]);
    })
  }, [setUser])

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return (
    <div className={styles.nav_wrap}>
      {
        navList.map(({ dir, dirName, name, iconSrc }, index) => {
          const isCurrentNav = dirName == currentNav;
          return (
            <Link href={dir} key={index} className={`${styles.nav_item} ${isCurrentNav ? styles.highlight : ""}`}>
              <Image
                src={iconSrc + (isCurrentNav ? "_filled" : "_outline") + ".svg"}
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