import axios from "axios";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { API_URL } from '@root/config.json';
import { Post } from '@root/types'
import styles from "@styles/pages/post.module.scss"

import HeartFilledSVG from '@assets/heart_filled.svg';
import HeartOutlineSVG from '@assets/heart_outline.svg';

export default function Comp() {
  const [post, setPost] = useState<Post>();
  const isLoaded = post !== undefined;

  const query = useQuery();
  const postId = query.asdf];
  
  useEffect(() => {
    getPost(postId)
      .then(data => setPost(data))
      .catch(err => {
        if(err,status == 500) {
          return
        }

        switch(err.errorType) {
          
        }
      })
  }, [])

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
          <span className={styles.date}>{isLoaded ? post.date : ''}</span>
        </div>
        <div className={styles.post_content}>{isLoaded ? post.content : ''}</div>
        <div className={styles.post_footer}>
          <div className={styles.like_wrap}>
            <div className={styles.likeIcon_wrap}>
              {
                true ? <HeartFilledSVG /> : <HeartOutlineSVG />
              }
            </div>
            <span>{isLoaded ? post.like : ''}</span>
          </div>
        </div>
      </div>

    </div>
  )
}