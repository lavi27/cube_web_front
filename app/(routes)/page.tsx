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
        if (err.status == 500) {
          return
        }

        switch (err.errorType) {
          case 1: {

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