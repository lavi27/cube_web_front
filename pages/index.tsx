import { useEffect, useState } from "react";
import Image from 'next/image'
import styles from "@styles/pages/home.module.scss"
import HeartFilledSVG from '@assets/heart_filled.svg';
import HeartOutlineSVG from '@assets/heart_outline.svg';
import { getSearch } from "@root/utils/api";
import { Post } from "@root/types";
import { timestampToStr, toSaticURL } from "@root/utils";

export default function Comp() {
  const [posts, setPosts] = useState<Post[]>();
  const isLoad = posts !== undefined;

  useEffect(() => {
    getSearch().then(data => setPosts(data))
  }, [])

  return (
    <div className={styles.home_wrap}>
      {
        isLoad ?
          posts.map((post, index) => {
            return (
              <div className={styles.post} key={index}>
                <div className={styles.post_header}>
                  <div className={styles.user_wrap}>
                    <div className={styles.user_icon_wrap}>
                      {/* <Image
                        src={toSaticURL(post.userId.toString())}
                        width={30}
                        height={30}
                        alt="UserIcon"
                      /> */}
                    </div>
                    <span className={styles.user_userName}>{post.userNickname}</span>
                  </div>
                  <span className={styles.date}>{timestampToStr(post.createDate)}</span>
                </div>
                <div className={styles.post_content}>{post.content}</div>
                <div className={styles.post_footer}>
                  <div className={styles.like_wrap}>
                    <div className={styles.like_icon_wrap}>
                      {
                        true ? <HeartFilledSVG /> : <HeartOutlineSVG />
                      }
                    </div>
                    <span className={styles.like_count}>{post.likeCount}</span>
                  </div>
                </div>
              </div>
            )
          })
          :
          <div className={styles.post_skeleton}>
            <div className={styles.post}>
              <div className={styles.post_header}>
                <div className={styles.user_wrap}>
                  <div className={styles.user_icon_wrap}></div>
                  <span className={styles.user_userName}></span>
                </div>
                <span className={styles.date}></span>
              </div>
              <div className={styles.post_content}></div>
              <div className={styles.post_footer}>
                <div className={styles.like_wrap}>
                  <div className={styles.like_icon_wrap}>
                    <HeartOutlineSVG />
                  </div>
                  <span className={styles.like_count}></span>
                </div>
              </div>
            </div>
          </div>
      }
    </div>
  )
}