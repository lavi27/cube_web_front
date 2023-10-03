import axios from "axios";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { API_URL } from '@root/config.json';
import { Post } from '@root/types'

import HeartFilledSVG from '@assets/heart_filled.svg';
import HeartOutlineSVG from '@assets/heart_outline.svg';

export default function Comp() {
  const [post, setPost] = useState<Post>();

  useEffect(() => {

  }, [])

  return (
    <div className="home_wrap">
      <div className={post ? "post" : "post_skeleton"}>
        <div className="post_header">
          <div className="user_wrap">
            <div className="user_icon_wrap">
              {post ?
                <Image
                  src={post.userIconSrc}
                  width={30}
                  height={30}
                  alt="UserIcon"
                />
                : ''}
            </div>
            <span className="user_userName">{post ? post.userName : ''}</span>
          </div>
          <span className="date">{post ? post.date : ''}</span>
        </div>
        <div className="post_content">{post ? post.content : ''}</div>
        <div className="post_footer">
          <div className="like_wrap">
            <div className="likeImg_wrap">
              {
                true ? <HeartFilledSVG /> : <HeartOutlineSVG />
              }
            </div>
            <span>{post ? post.like : ''}</span>
          </div>
        </div>
      </div>

    </div>
  )
}