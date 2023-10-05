'use client'
import { Post } from '@root/app/_types';
import Image from 'next/image'
import styles from "@styles/components/post.module.scss"
import HeartFilledSVG from "@assets/icon/heart_filled.svg"
import HeartOutlineSVG from "@assets/icon/heart_outline.svg"

import { timestampToStr, toStaticURL } from '@root/app/_utils';
import Link from 'next/link';

export default function Comp({ data, skeleton }: { data: Post | null, skeleton?: boolean }) {
  const isLoaded = data && !skeleton

  return (
    <Link href={`./post/${data?.postId}`} className={`${styles.post} ${skeleton ? styles.skeleton : ""}`}>
      <div className={styles.post_header}>
        <div className={styles.user_wrap}>
          <div className={styles.user_icon_wrap}>
            {
              isLoaded ?
                <Image
                  src={toStaticURL(data.userId.toString())}
                  width={30}
                  height={30}
                  alt="UserIcon"
                />
                : ""
            }
          </div>
          <span className={styles.user_userName}>{isLoaded ? data.userNickname : ""}</span>
        </div>
        <span className={styles.date}>{isLoaded ? timestampToStr(data.createDate) : ""}</span>
      </div>
      <div className={styles.post_content}>{isLoaded ? data.content : ""}</div>
      <div className={styles.post_footer}>
        <div className={styles.like_wrap}>
          <div className={styles.like_icon_wrap}>
            {
              true && isLoaded ?
                <HeartFilledSVG />
                : <HeartOutlineSVG />
            }
          </div>
          <span className={styles.like_count}>{isLoaded ? data.likeCount : ""}</span>
        </div>
      </div>
    </Link>
  )
}