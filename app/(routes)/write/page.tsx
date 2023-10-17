'use client'
import { useState } from "react";
import Image from 'next/image'
import router from "next/router";
import styles from '@styles/pages/write.module.scss';
import { toStaticURL } from "@root/app/_utils";
import { useBearStore } from "@root/app/_utils/store";
import { postPost } from "@root/app/_api";

export default function Comp() {
  const [content, setContent] = useState("");
  const store = useBearStore();
  const isDisabled = content == "";

  const submitWrite = () => {
    if (isDisabled) return;

    postPost(content)
      .then(() => {
        router.push("/");
      })
      .catch(err => {
      })
  }

  return (
    <div className={styles.write_wrap}>
      <div className={styles.post_header}>
        <div className={styles.user_wrap}>
          <div className={styles.user_icon_wrap}>
            {store.userIsRoaded ?
              <Image
                src={toStaticURL(`userIcon/${store.userIconId}.webp`)}
                width={25}
                height={25}
                alt=""
              />
              : ''}
          </div>
          <span className={styles.user_userName}>{store.userIsRoaded ? store.userName : ''}</span>
        </div>
      </div>

      <textarea value={content} onChange={(e) => { setContent(e.currentTarget.value) }}></textarea>

      <div>
        <button disabled={isDisabled} onClick={submitWrite}>완료하기</button>
      </div>
    </div>
  )
}
