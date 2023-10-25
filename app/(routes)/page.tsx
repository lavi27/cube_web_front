'use client'
import { useEffect, useRef, useState } from "react";
import styles from "@styles/pages/home.module.scss"
import { getSearch } from "@app/_api";
import { Post as PostType } from "@app/_types";
import Post from "@components/post";

export default function Comp() {
  const [posts, setPosts] = useState<PostType[]>();

  const [scrollTop, setScrollTop] = useState(0);
  const [mouseDownY, setMouseDownY] = useState(0);
  const [mousePullY, setMousePullY] = useState(0);

  const [firstPostTimestamp, setFirstPostTimestamp] = useState(0);
  const [lastPostTimestamp, setLastPosTimestamp] = useState(0);

  const postWrapRef = useRef<HTMLDivElement>(null);
  const isLoaded = posts !== undefined;

  const refreshContents = () => {
    getSearch({})
      .then((data) => {
        if (!posts) return;

        let tmp = [...data];
        const firstPostIndex = tmp.findIndex((post) => post.createDate == firstPostTimestamp);
        if (firstPostIndex != -1) {
          tmp = tmp.slice(0, firstPostIndex)
        }

        setPosts([...tmp, ...posts]);
        setFirstPostTimestamp(data[0].createDate)
      })
  }

  const loadNextContents = () => {
    getSearch({dateFrom: lastPostTimestamp - 1})
      .then((data) => {
        if (!posts) return;

        setPosts([...posts, ...data]);
        setLastPosTimestamp(data[data.length - 1].createDate)
      })
  }

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      setMouseDownY(e.pageY);
    })

    document.addEventListener("mousemove", (e) => {
      setMousePullY(e.pageY - mouseDownY);
    })

    document.addEventListener("mouseup", (e) => {
      if (Math.abs(mousePullY) <= 30) return;

      if (scrollTop == 0) {
        refreshContents()
      } else if (scrollTop == postWrapRef.current?.clientHeight) {
        loadNextContents()
      }
    })

    getSearch({})
      .then(data => {
        setPosts(data);
        setFirstPostTimestamp(data[0].createDate)
        setLastPosTimestamp(data[data.length - 1].createDate)
      })
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

  // mousePullY
  return (
    <div
      className={styles.home_wrap}
      onScroll={(e) => {setScrollTop(e.currentTarget.scrollTop)}}
      ref={postWrapRef}
    >
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