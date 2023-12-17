'use client'
import { useCallback, useEffect, useRef, useState, UIEvent } from "react";
import Image from 'next/image'
import styles from "@styles/pages/home.module.scss"
import { getSearch } from "@app/_api";
import { Post as PostType } from "@app/_types";
import Post from "@components/post";

export default function Comp() {
  const [posts, setPosts] = useState<PostType[]>();

  const [scrollTop, setScrollTop] = useState(0);
  const [mousePullStartY, setMousePullStartY] = useState(0);
  const [mousePullY, setMousePullY] = useState(0);
  const [pullDir, setPullDir] = useState(0);
  const [isCanPull, setIsCanPull] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [firstPostDate, setFirstPostDate] = useState(0);
  const [lastPostDate, setLastPostDate] = useState(0);

  const postWrapRef = useRef<HTMLDivElement>(null);

  //ANCHOR - Functions
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  const handleApiError = (err: any) => {
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
  }

  const initContents = useCallback(() => {
    getSearch({})
      .then(data => {
        setPosts(data);
        setFirstPostDate(data[0].createDate);
        setLastPostDate(data[data.length - 1].createDate);
      })
      .catch(handleApiError)
  }, [])

  const refreshContents = useCallback(() => {
    if (posts == undefined) return;

    getSearch({})
      .then((data) => {
        let tmp = [...data];
        const firstPostIndex = tmp.findIndex((post) => post.createDate == firstPostDate);
        if (firstPostIndex != -1) {
          tmp = tmp.slice(0, firstPostIndex)
        }
        setIsLoading(false);

        if (tmp.length == 0) return;

        setPosts([...tmp, ...posts]);
        setFirstPostDate(data[0].createDate);
      })
      .catch(handleApiError)
  }, [firstPostDate, posts]);

  const loadNextContents = useCallback(() => {
    if (posts == undefined) return;

    getSearch({ dateFrom: lastPostDate - 1 })
      .then((data) => {
        setIsLoading(false);

        if (data.length == 0) return;

        setPosts([...posts, ...data]);
        setLastPostDate(data[data.length - 1].createDate);
      })
      .catch(handleApiError)
  }, [lastPostDate, posts])

  //ANCHOR - Events
  const onUserInputMove = useCallback((mouseY: number) => {
    if (!postWrapRef.current) return;
    let pullY = 0;
    let isPullDir = false;

    if (pullDir == 1) {
      isPullDir = (mouseY - mousePullStartY) > 0;
    } else if (pullDir == 2) {
      isPullDir = (mouseY - mousePullStartY) < 0;
    }

    pullY = isPullDir ? mouseY - mousePullStartY : 0;

    setMousePullY(pullY);
    setIsPulling(Math.abs(pullY) >= 150);


    if (isCanPull) {
      if (isPullDir) {
        postWrapRef.current.scrollTop = scrollTop;
      } else {
        postWrapRef.current.scrollTop = scrollTop - (mouseY - mousePullStartY);
      }
    }
  }, [isCanPull, mousePullStartY, scrollTop, pullDir])
  const onMouseMove = useCallback((e: MouseEvent) => {
    onUserInputMove(e.clientY)
  }, [onUserInputMove])
  const onTouchMove = useCallback((e: TouchEvent) => {
    onUserInputMove(e.touches[0].clientY)
  }, [onUserInputMove])

  const onUserInputDown = useCallback((mouseY: number) => {
    if (!postWrapRef.current) return;

    const el = postWrapRef.current;

    if (scrollTop == 0) {
      setPullDir(1);
    } else if (scrollTop >= el.scrollHeight - el.clientHeight) {
      setPullDir(2);
    } else {
      setIsCanPull(false);
      return;
    }

    setMousePullStartY(mouseY);
    setMousePullY(0);
    setIsPulling(false);
    setIsCanPull(true);
  }, [scrollTop])
  const onMouseDown = useCallback((e: MouseEvent) => {
    onUserInputDown(e.clientY)
  }, [onUserInputDown])
  const onTouchDown = useCallback((e: TouchEvent) => {
    onUserInputDown(e.touches[0].clientY)
  }, [onUserInputDown])

  const onUserInputUp = useCallback(() => {
    if (
      !postWrapRef.current
      || !isCanPull
    ) return;

    setIsCanPull(false);
    setScrollTop(postWrapRef.current.scrollTop);

    if (!isPulling) return;

    setIsLoading(true);

    if (mousePullY > 0) {
      refreshContents()
    } else {
      loadNextContents()
    }
  }, [isCanPull, isPulling, mousePullY, refreshContents, loadNextContents])
  const onMouseUp = useCallback(() => {
    onUserInputUp()
  }, [onUserInputUp])
  const onTouchUp = useCallback(() => {
    onUserInputUp()
  }, [onUserInputUp])

  //ANCHOR - useEffects
  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onTouchMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, [onMouseMove, onTouchMove])

  useEffect(() => {
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("touchstart", onTouchDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("touchstart", onTouchDown);
    };
  }, [onMouseDown, onTouchDown])

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchend", onTouchUp);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchend", onTouchUp);
    };
  }, [onMouseUp, onTouchUp])

  useEffect(() => {
    initContents();
  }, [initContents])

  //ANCHOR - Elements
  return (
    <div
      className={styles.home_wrap}
      onScroll={(e) => { if (isCanPull) return; setScrollTop(e.currentTarget.scrollTop) }}
      ref={postWrapRef}
      style={{ top: isCanPull ? mousePullY / 3 : 0 }}
    >
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

      <div
        className={`
          ${styles.refreshIcon_wrap}
          ${isLoading ? styles.loading : ''}
          ${(isLoading || (isCanPull && isPulling)) ? styles.active : ""}
        `}
      >
        <Image src="/icon/refresh-outline.svg" width={70} height={70} alt="" />
      </div>
    </div>
  )
}