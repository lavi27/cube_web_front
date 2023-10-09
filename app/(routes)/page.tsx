'use client'
import { useEffect, useState } from "react";
import styles from "@styles/pages/home.module.scss"
import { getSearch } from "@app/_api";
import { Post as PostType } from "@app/_types";
import Post from "@components/post";

export default function Comp() {
  const [posts, setPosts] = useState<PostType[]>();
  const isLoaded = posts !== undefined;

  useEffect(() => {
    getSearch()
      .then(data => setPosts(data))
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
  }, [])

  return (
    <div className={styles.home_wrap}>
      {
        isLoaded ?
          posts.map((post, index) => {
            return (
              <Post data={post} key={index} />
            )
          })
          :
          <Post data={null} skeleton />
      }
    </div>
  )
}