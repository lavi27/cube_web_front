import { getEnv } from "@root/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { Profile } from '@root/types'
import styles from "@styles/pages/profile"

export default function Comp() {
  const [profile, setProfile] = useState<Profile>();
  const [posts, setPosts] = useState<Post[]>();
  const [isFollowing, setIsFollowing] = useState(false);
  const isLoaded = profile !== undefined && posts !== undefined;

  const router = useRouter();
  const userId = router.qwe];

  const submitFollow = () => {
    
  }

  useEffect(() => {
    getSearch(10, userId, undefined)
      .then(res => setPosts(res))
      .catch(err => {
        if(err.status == 500) {
          return
        }

        switch(err.errorType) {
          case 1: {
            break
          }
        }
      })

    getProfile(userId)
      .then(res => setProfile(res))
      .catch(err => {
        if(err.status == 500) {
          return
        }

        switch(err.errorType) {
          case 1: {
            break 
          }
        }
      })
  }, [])

  return (
          <div className={styles.profile_wrap}>
            <div className={`${styles.profile} ${!isLoaded ? styles.skeleton : ""}`}>
              <div className={styles.profile_row}>
                <div className={styles.user}>
                  <div className={styles.user_icon_wrap}>
                  {
                    isLoaded ?
                    <Image
                      src={toStaticURL(`userIcon/${post.userId}.webp`)}
                      width={30}
                      height={30}
                      alt="UserIcon"
                    />
                    : ""
                  }
                  </div>
                  <div className={styles.user_name}>{isLoaded ? profile.username : ""}</div>
                </div>
                
                <div className={`${styles.profile_followBtn} ${isFollowing ? styles.active : ''}`} onClick={submitFollow}>
                  {isFollowing ? '팔로우' : '언팔로우'}
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
                posts.map((post, index) => {
                  return <Post data={post} key={index} />;
                })
              }
            </div>
          </div>
  )
}