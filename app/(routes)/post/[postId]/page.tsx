'use client'
import { useCallback, useEffect, useState } from "react";
import Image from 'next/image'
import { Post } from '@app/_types'
import styles from "@styles/pages/post.module.scss"
import HeartFilledSVG from '@assets/icon/heart_filled.svg';
import HeartOutlineSVG from '@assets/icon/heart_outline.svg';
import { getPost, postLike } from "@app/_api";
import { intToCompact, timestampFromNow, toStaticURL } from "@app/_utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ImageWithFallback from "@components/imageWithFallback";

type Props = {
  params: {
    postId: string;
  };
};

export default function Comp({ params: { postId } }: Props) {
  const [post, setPost] = useState<Post>();
  const isLoaded = post !== undefined;
  const router = useRouter();

  const fetchData = useCallback(async () => {
    if (!postId) return;

    getPost(parseInt(postId))
      .then(data => setPost(data))
      .catch(err => {
        switch (err.errorCode) {
          case 1: {
            alert("올바르지 않은 요청입니다")
            router.push("/");
          }
          case 2: {
            alert("글을 찾을 수 없습니다")
            router.push("/");
          }
        }
      })
  }, [postId, router])

  useEffect(() => {
    fetchData();
  }, [fetchData])

  const submitLike = () => {
    if (!isLoaded) return;

    postLike(post.postId)
      .then(() => {

      })
      .catch(err => {

      })
  }

  return (
    <div className={styles.post_wrap}>
      <div className={`${styles.post} ${!isLoaded ? styles.skeleton : ""}`}>
        <div className={styles.post_header}>
          <Link href={`/profile/${post?.userId}`}>
            <div className={styles.user_wrap}>
              <div className={styles.user_icon_wrap}>
                {isLoaded ?
                  <ImageWithFallback
                    src={toStaticURL(`userIcon/${post.userId}.webp`)}
                    fallbackSrc="/defaultIcon.webp"
                    width={25}
                    height={25}
                    alt=''
                  />
                  : ''}
              </div>
              <span className={styles.user_userName}>{isLoaded ? post.userName : ''}</span>
            </div>
          </Link>
          <span className={styles.date}>{isLoaded ? timestampFromNow(post.createDate) : ''}</span>
        </div>
        <div className={styles.post_content}>{isLoaded ? post.content : ''}</div>
        <div className={styles.post_footer}>
          <div className={styles.like_wrap}>
            <div className={styles.like_icon_wrap} onClick={submitLike}>
              {
                false ? <HeartFilledSVG /> : <HeartOutlineSVG />
              }
            </div>
            <span>{isLoaded ? intToCompact(post.likeCount) : ''}</span>
          </div>
        </div>
      </div>

    </div>
  )
}