'use client'
import { useCallback, useEffect, useState } from "react";
import Image from 'next/image'
import { Post as PostType, User } from '@root/app/_types'
import styles from "@styles/pages/profile.module.scss"
import { getSearch, getUser, postFollow, postUnfollow } from "@root/app/_api";
import { intToCompact, toStaticURL } from "@app/_utils";
import Post from "@root/app/_components/post";
import { useRouter } from "next/navigation";
import { useBearStore } from "@root/app/_utils/store";

type Props = {
  params: {
    userId: string;
  };
};

export default function Comp({ params: { userId } }: Props) {
  const [profile, setProfile] = useState<User>();
  const [posts, setPosts] = useState<PostType[]>();
  const [isFollowing, setIsFollowing] = useState(false);
  const isLoaded = profile !== undefined && posts !== undefined;
  const router = useRouter();
  const store = useBearStore();

  const submitFollow = () => {
    if (!isFollowing) {
      postFollow(parseInt(userId))
        .then(() => {
          setIsFollowing(true);
        })
        .catch(err => {

        });
    } else {
      postUnfollow(parseInt(userId))
        .then(() => {
          setIsFollowing(false);
        })
        .catch(err => {

        });
    }
  }

  const fetchData = useCallback(async () => {
    getSearch({ userId: parseInt(userId) })
      .then(res => setPosts(res))
      .catch(err => {
        switch (err.errorCode) {
          case 1: {
            alert("올바르지 않은 요청입니다")
            break
          }
          case 2: {
            alert("글을 찾을 수 없습니다")
            break
          }
        }
      })

    getUser(parseInt(userId))
      .then(res => setProfile(res))
      .catch(err => {
        switch (err.errorCode) {
          case 1: {
            alert("올바르지 않은 주소입니다")
            router.push("/");
          }
          case 2: {
            alert("유저를 찾을 수 없습니다")
            router.push("/");
          }
        }
      })
  }, [router, userId])

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
                    alt=""
                  />
                  : ""
              }
            </div>
            <div className={styles.user_name}>{isLoaded ? profile.userName : ""}</div>
          </div>

          {
            isLoaded && store.userId != profile.userId ?
              <div className={`${styles.profile_followBtn} ${isFollowing ? styles.active : ''}`} onClick={submitFollow}>
                {isFollowing ? '팔로우' : '언팔로우'}
              </div>
              : ""
          }

        </div>
        <div className={`${styles.profile_row}`}>
          <div className={styles.count}>
            <i>포스트 수</i>
            <div>{isLoaded ? intToCompact(profile.postCount) : ""}</div>
          </div>
          <div className={styles.count}>
            <i>팔로워 수</i>
            <div>{isLoaded ? intToCompact(profile.followerCount) : ""}</div>
          </div>
          <div className={styles.count}>
            <i>팔로잉 수</i>
            <div>{isLoaded ? intToCompact(profile.followingCount) : ""}</div>
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