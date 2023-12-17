'use client'
import { Post as PostType } from "@app/_types";
import Post from "@components/post";
import { getSearch } from "@root/app/_api";
import { useCallback, useEffect, useState } from "react";
import styles from "@styles/pages/home.module.scss"

type Props = {
  params: {
    query: string;
  };
};

export default function Comp({ params: { query } }: Props) {
  const [posts, setPosts] = useState<PostType[]>();

  const fetchData = useCallback(async () => {

    getSearch({ keywords: query.split(" ") })
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
  }, [query]);

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return (
    <div className={styles.home_wrap}>
      {
        posts != undefined ?
          posts.length != 0 ?

            posts.map((post, index) => {
              return (
                <Post data={post} key={index} />
              )
            })

            :
            <span className={styles.noResult}>검색 결과가 없습니다.</span>
          :
          <Post data={null} skeleton />
      }
    </div>
  )
}