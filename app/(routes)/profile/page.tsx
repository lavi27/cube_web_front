'use client'
import { useCallback, useEffect, useState } from "react";
import Image from 'next/image'
import { Post as PostType, User } from '@root/app/_types'
import styles from "@styles/pages/profile.module.scss"
import { getSearch, getUser } from "@root/app/_api";
import { toStaticURL } from "@app/_utils";
import Post from "@root/app/_components/post";

export default function Comp() {
  const [profile, setProfile] = useState<User>();
  const [posts, setPosts] = useState<PostType[]>();
  const [isFollowing, setIsFollowing] = useState(false);
  const isLoaded = profile !== undefined && posts !== undefined;

  const userId = "1";

  const submitFollow = () => {

  }

  const fetchData = useCallback(async () => {
    getSearch(10, parseInt(userId), undefined)
      .then(res => setPosts(res))
      .catch(err => {
        switch (err.errorType) {
          case 1: {
            break
          }
        }
      })

    getUser(parseInt(userId))
      .then(res => setProfile(res))
      .catch(err => {
        switch (err.errorType) {
          case 1: {
            break
          }
        }
      })
  }, [userId])

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return (
    <div className={styles.profile_wrap}>
      <div className={`${styles.profile} ${!isLoaded ? styles.skeleton : ""}`}>
        <div className={styles.profile_row}>
          <div className={styles.user}>
            <div className={styles.user_icon_wrap}>
              {
                isLoaded ?
                  <Image
                    src={toStaticURL(`userIcon/${profile.userId}.webp`)}
                    width={30}
                    height={30}
                    alt="UserIcon"
                  />
                  : ""
              }
            </div>
            <div className={styles.user_name}>{isLoaded ? profile.userName : ""}</div>
          </div>
        </div>
        <div className={styles.profile_row}>
          <div className={styles.count}>
            <i>포스트 수</i>
            <div>{isLoaded ? profile.postCount : ""}</div>
          </div>
          <div className={styles.count}>
            <i>팔로워 수</i>
            <div>{isLoaded ? profile.followerCount : ""}</div>
          </div>
          <div className={styles.count}>
            <i>팔로잉 수</i>
            <div>{isLoaded ? profile.followingCount : ""}</div>
          </div>
        </div>
      </div>
      <div className={styles.posts}>
        {
          isLoaded ?
            posts.map((post, index) => {
              return <Post data={post} key={index} />;
            })
            : <Post data={null} skeleton />
        }
      </div>
    </div>
  )
}