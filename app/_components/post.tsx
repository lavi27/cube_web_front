'use client'
import { Post } from '@root/app/_types';
import styles from "@styles/components/post.module.scss"
import HeartFilledSVG from "@assets/icon/heart_filled.svg"
import HeartOutlineSVG from "@assets/icon/heart_outline.svg"

import { timestampFromNow, intToCompact, toStaticURL, bToI } from '@app/_utils';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { postLike, postUnlike } from '@app/_api';
import { useEffect, useState } from 'react';
import ImageWithFallback from '@components/imageWithFallback';

export default function Comp({ data, skeleton }: { data: Post | null, skeleton?: boolean }) {
  const isLoaded = data && !skeleton

  const [isLiked, setIsLiked] = useState(false);
  const [myLikeCount, setMyLikeCount] = useState(0);
  const [isLikeDisabled, setisLikeDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    setIsLiked(data.isLiked);

    if (data.isLiked) {
      setMyLikeCount(data.likeCount - 1);
    } else {
      setMyLikeCount(data.likeCount);
    }
  }, [data, isLoaded]);

  const submitLike = (e: MouseEvent) => {
    e.stopPropagation();
    if (!isLoaded || isLikeDisabled) return;

    setisLikeDisabled(true);

    if (!isLiked) {
      postLike(data.postId)
        .then(() => {
          setIsLiked(true);
          setisLikeDisabled(false);
        })
        .catch(err => {
        })
    } else {
      postUnlike(data.postId)
        .then(() => {
          setIsLiked(false);
          setisLikeDisabled(false);
        })
        .catch(err => {
        })
    }
  }

  return (
    <div className={`${styles.post} ${skeleton ? styles.skeleton : ""}`} onClick={(e) => {
      router.push(`/post/${data?.postId}`);
    }}>
      <div className={styles.post_header}>
        <Link href={`/profile/${isLoaded ? data.userId : ''}`} className={styles.user_wrap}>
          <div className={styles.user_icon_wrap}>
            {isLoaded ?
              <ImageWithFallback
                src={toStaticURL(`userIcon/${data.userId.toString()}.webp`)}
                fallbackSrc="/defaultIcon.webp"
                width={25}
                height={25}
                alt={''}
              />
              : ""}
          </div>
          <span className={styles.user_userName}>{isLoaded ? data.userNickname : ""}</span>
        </Link>
        <span className={styles.date}>{isLoaded ? timestampFromNow(data.createDate) : ""}</span>
      </div>
      <div className={styles.post_content}>{isLoaded ? data.content : ""}</div>
      <div className={styles.post_footer}>
        <div className={styles.like_wrap}>
          <div className={`${styles.like_icon_wrap} ${isLoaded && isLiked ? styles.highlight : ""}`} onClick={(e) => submitLike}>
            {isLoaded && isLiked ?
              <HeartFilledSVG />
              : <HeartOutlineSVG />
            }
          </div>
          <span className={styles.like_count}>{isLoaded ? intToCompact(myLikeCount + bToI(isLiked)) : ""}</span>
        </div>
      </div>
    </div>
  )
}