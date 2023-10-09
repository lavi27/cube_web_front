'use client'
import { postSignup } from "@app/_api";
import styles from "@styles/pages/form.module.scss";
import Link from "next/link";
import { useState } from "react";

export default function Comp() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [disabled, setDisabled] = useState(false);

  const submit = () => {
    if (disabled) return;
    setDisabled(true);

    postSignup(id, pw)
      .then(() => {
        window.location.href = "/"
      })
      .catch(err => {
        switch (err.errorCode) {
          case 1: {
            alert("이미 로그인되어 있습니다");
            window.location.href = "/"
          }
          case 2: {
            alert("올바르지 않은 요청입니다");
            break;
          }
          case 3: {
            alert("동일한 아이디가 이미 존재합니다");
            break;
          }
        }
      })
      .finally(() => {
        setDisabled(false);
      })
  }

  return (
    <div className={styles.form}>
      <h3>회원가입</h3>

      <div className={styles.form_inputs}>
        <input type="text" placeholder="아이디" value={id} onChange={(e) => { setId(e.currentTarget.value) }}></input>
        <input type="password" placeholder="비밀번호" value={pw} onChange={(e) => { setPw(e.currentTarget.value) }}></input>
      </div>

      <div className={styles.form_bottom}>
        <span>이미 계정이 있으시면 <Link href="./signin">로그인하세요</Link></span>
        <div className={styles.submitBtn} onClick={submit}>회원가입</div>
      </div>
    </div>
  )
}