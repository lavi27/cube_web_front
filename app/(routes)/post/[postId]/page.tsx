'use client'
import { useCallback, useEffect, useState } from "react";
import Image from 'next/image'
import { Post } from '@app/_types'
import styles from "@styles/pages/post.module.scss"
import HeartFilledSVG from '@assets/icon/heart_filled.svg';
import HeartOutlineSVG from '@assets/icon/heart_outline.svg';
import { getPost } from "@app/_api";
import { toStaticURL } from "@app/_utils";

type Props = {
  params: {
    postId: string;
  };
};

export default function Comp({ params: { postId } }: Props) {
  const [post, setPost] = useState<Post>();
  const isLoaded = post !== undefined;

  const fetchData = useCallback(async () => {
    if (!postId) return;

    getPost(parseInt(postId))
      .then(data => setPost(data))
      .catch(err => {
        switch (err.errorType) {

        }
      })
  }, [postId])

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return (
    <div className={styles.post_wrap}>
      <div className={`${styles.post} ${!isLoaded ? styles.skeleton : ""}`}>
        <div className={styles.post_header}>
          <div className={styles.user_wrap}>
            <div className={styles.user_icon_wrap}>
              {isLoaded ?
                <Image
                  src={toStaticURL(`userIcon/${post.userId}.webp`)}
                  width={30}
                  height={30}
                  alt="UserIcon"
                />
                : ''}
            </div>
            <span className={styles.user_userName}>{isLoaded ? post.userName : ''}</span>
          </div>
          <span className={styles.date}>{isLoaded ? post.createDate : ''}</span>
        </div>
        <div className={styles.post_content}>{isLoaded ? post.content : ''}</div>
        <div className={styles.post_footer}>
          <div className={styles.like_wrap}>
            <div className={styles.likeIcon_wrap}>
              {
                true ? <HeartFilledSVG /> : <HeartOutlineSVG />
              }
            </div>
            <span>{isLoaded ? post.likeCount : ''}</span>
          </div>
        </div>
      </div>

    </div>
  )
}