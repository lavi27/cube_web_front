'use client'
import { useState } from "react";
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import styles from '@styles/pages/write.module.scss';
import { toStaticURL } from "@app/_utils";
import { useBearStore } from "@app/_utils/store";
import { postWrite } from "@app/_api";
import ImageWithFallback from "@components/imageWithFallback";

export default function Comp() {
  const [content, setContent] = useState("");
  const store = useBearStore();
  const isDisabled = content == "";
  const router = useRouter();

  const submitWrite = () => {
    if (isDisabled) return;

    postWrite(content)
      .then(() => {
        router.push("/");
      })
      .catch(err => {
      })
  }

  return (
    <div className={styles.write_wrap}>
      <div className={styles.write_top}>
        <div className={styles.user_icon_wrap}>
          {store.userIsRoaded ?
            <ImageWithFallback
              src={toStaticURL(`userIcon/${store.userIconId}.webp`)}
              fallbackSrc="/defaultIcon.webp"
              width={25}
              height={25}
              alt=""
            />
            : ''}
        </div>
        <span className={styles.user_userName}>{store.userIsRoaded ? store.userName : ''}</span>
      </div>

      <textarea value={content} onChange={(e) => { setContent(e.currentTarget.value) }}></textarea>

      <div className={styles.write_bottom}>
        <button className={isDisabled ? styles.disabled : ""} disabled={isDisabled} onClick={submitWrite}>완료하기</button>
      </div>
    </div>
  )
}
