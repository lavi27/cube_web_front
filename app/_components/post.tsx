'use client'
import { Post } from '@root/app/_types';
import styles from "@styles/components/post.module.scss"
import HeartFilledSVG from "@assets/icon/heart_filled.svg"
import HeartOutlineSVG from "@assets/icon/heart_outline.svg"

import { timestampFromNow, intToCompact, toStaticURL } from '@root/app/_utils';
import Link from 'next/link';
import { postLike, postUnlike } from '@app/_api';
import { useState } from 'react';
import ImageWithFallback from '@components/imageWithFallback';

export default function Comp({ data, skeleton }: { data: Post | null, skeleton?: boolean }) {
  const isLoaded = data && !skeleton
  const [isLiked, setIsLiked] = useState(false);

  const submitLike = () => {
    if (!isLoaded) return;

    if (!isLiked) {
      postLike(data.postId)
        .then(() => {
          setIsLiked(true);
        })
        .catch(err => {

        })
    } else {
      postUnlike(data.postId)
        .then(() => {
          setIsLiked(false);
        })
        .catch(err => {

        })
    }
  }

  return (
    <Link href={`/post/${data?.postId}`} className={`${styles.post} ${skeleton ? styles.skeleton : ""}`}>
      <div className={styles.post_header}>
        <div className={styles.user_wrap}>
          <div className={styles.user_icon_wrap}>
            {
              isLoaded ?
                <ImageWithFallback
                  src={toStaticURL(`userIcon/${data.userId.toString()}.webp`)}
                  fallbackSrc="/defaultIcon.webp"
                  width={25}
                  height={25}
                  alt={''}
                />
                : ""
            }
          </div>
          <span className={styles.user_userName}>{isLoaded ? data.userNickname : ""}</span>
        </div>
        <span className={styles.date}>{isLoaded ? timestampFromNow(data.createDate) : ""}</span>
      </div>
      <div className={styles.post_content}>{isLoaded ? data.content : ""}</div>
      <div className={styles.post_footer}>
        <div className={styles.like_wrap}>
          <div className={styles.like_icon_wrap} onClick={submitLike}>
            {
              false && isLoaded ?
                <HeartFilledSVG />
                : <HeartOutlineSVG />
            }
          </div>
          <span className={styles.like_count}>{isLoaded ? intToCompact(data.likeCount) : ""}</span>
        </div>
      </div>
    </Link>
  )
}