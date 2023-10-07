'use client'
import { postSignin } from "@app/_api";
import styles from "@styles/pages/form.module.scss";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Comp() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [disabled, setDisabled] = useState(false);


  const submit = () => {
    if (disabled) {
      return
    }

    setDisabled(true);

    postSignin(id, pw).then(() => {
      redirect(".")
    })
      .catch(err => {
        switch (err.errorType) {
          case 1: {
            break;
          }
          case 2: {
            break;

          }
          case 3: {
            alert("아이디 또는 비밀번호가 일치하지 않습니다.");
            break;
          }
          case 4: {
            break;

          }
        }
      })
      .finally(() => { setDisabled(false); })
  }

  return (
    <div className={styles.form}>
      <h3>로그인</h3>

      <div className={styles.form_inputs}>
        <input type="text" placeholder="아이디" value={id} onChange={(e) => { setId(e.currentTarget.value) }}></input>
        <input type="text" placeholder="비밀번호" value={pw} onChange={(e) => { setPw(e.currentTarget.value) }}></input>
      </div>

      <div className={styles.form_bottom}>
        <span>계정이 없으시면 <Link href="./signup">회원가입 하세요</Link></span>
        <div className={styles.submitBtn} onClick={submit}>로그인</div>
      </div>
    </div>
  )
}