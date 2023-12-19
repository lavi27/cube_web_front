'use client'
import { useCallback, useEffect, useState } from "react";
import Image from 'next/image'
import { Post } from '@app/_types'
import styles from "@styles/pages/post.module.scss"
import HeartFilledSVG from '@assets/icon/heart_filled.svg';
import HeartOutlineSVG from '@assets/icon/heart_outline.svg';
import { getPost, postLike, postUnlike } from "@app/_api";
import { bToI, intToCompact, timestampFromNow, toStaticURL } from "@app/_utils";
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
  const [isLiked, setIsLiked] = useState(false);
  const [myLikeCount, setMyLikeCount] = useState(0);
  const [isLikeDisabled, setisLikeDisabled] = useState(false);

  const isLoaded = post !== undefined;
  const router = useRouter();

  const fetchData = useCallback(async () => {
    if (!postId) return;

    getPost(parseInt(postId))
      .then(data => {
        setPost(data);
        setIsLiked(data.isLiked);

        if (data.isLiked) {
          setMyLikeCount(data.likeCount - 1);
        } else {
          setMyLikeCount(data.likeCount);
        }
      })
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
    if (!isLoaded || isLikeDisabled) return;

    setisLikeDisabled(true);

    if (!isLiked) {
      postLike(post.postId)
        .then(() => {
          setIsLiked(true);
          setisLikeDisabled(false);
        })
        .catch(err => {
        })
    } else {
      postUnlike(post.postId)
        .then(() => {
          setIsLiked(false);
          setisLikeDisabled(false);
        })
    }
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
              <span className={styles.user_userName}>{isLoaded ? post.userNickname : ''}</span>
            </div>
          </Link>
          <span className={styles.date}>{isLoaded ? timestampFromNow(post.createDate) : ''}</span>
        </div>
        <div className={styles.post_content}>{isLoaded ? post.content : ''}</div>
        <div className={styles.post_footer}>
          <div className={styles.like_wrap}>
            <div className={`${styles.like_icon_wrap} ${isLoaded && isLiked ? styles.highlight : ''}`} onClick={submitLike}>
              {isLoaded && isLiked ?
                <HeartFilledSVG />
                : <HeartOutlineSVG />
              }
            </div>
            <span>{isLoaded ? intToCompact(myLikeCount + bToI(isLiked)) : ''}</span>
          </div>
        </div>
      </div>

    </div>
  )
}