import { Post } from '@root/types';
import Image from 'next/image'
import styles from "@styles/components/post.module.scss"

import HeartFilledSVG from '@assets/heart_filled.svg';
import HeartOutlineSVG from '@assets/heart_outline.svg';

export default function comp(data: Post, isSkeleton: boolean) {
  return (
    <div className={styles.post}>
      <div className="post_header">
        <div className="user_wrap">
          <div className="user_icon_wrap">
            <Image
              src={userIconSrc}
              width={30}
              height={30}
              alt="navIcon"
            />
          </div>
          <span className="user_userName">{userName}</span>
        </div>
        <span className="date">{date}</span>
      </div>
      <div className="post_content">{content}</div>
      <div className="post_footer">
        <div className="like_wrap">
          <div className="likeImg_wrap">
            {
              true ? <HeartFilledSVG /> : <HeartOutlineSVG />

            }
          </div>
          <span>{like}</span>
        </div>
      </div>
    </div>
  )
}