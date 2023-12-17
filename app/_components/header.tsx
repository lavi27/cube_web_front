import styles from '@styles/components/header.module.scss';
import Image from 'next/image'
import Link from 'next/link';
import router from 'next/router';
import { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Comp() {
  const [isSearch, setIsSearch] = useState(false);
  const [queryInput, setQueryInput] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const router = usePathname();
  const pathArr = router.split('/');
  const isSearchPath = pathArr[1] == "search";
  const searchPathQuery = isSearchPath ? pathArr[2] : "";

  const onClickSearch = () => {
    setIsSearch(true);

    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100)
  }

  const onBreakSearch = () => {
    setIsSearch(false);

    setTimeout(() => {
      searchInputRef.current?.blur();
    }, 100)
  }

  const onSubmitSearch = () => {
    setIsSearch(false);
    setQueryInput("");

    setTimeout(() => {
      searchInputRef.current?.blur();
    }, 100)
  }

  return (
    <div className={styles.header_wrap}>
      <h5>
        {
          !isSearchPath ?
            "덕소라이프"
            : "검색: " + searchPathQuery
        }
      </h5>
      <div className={styles.buttons}>
        <div
          className={styles.searchBtn}
          onClick={onClickSearch}
        >
          <Image
            src={"/icon/search.svg"}
            width={20}
            height={20}
            alt="Logo"
          />
        </div>
        {
          !isSearchPath && false ?
            <Link href="./setting">
              <Image
                src={"/icon/setting.svg"}
                width={20}
                height={20}
                alt="Logo"
              />
            </Link>
            : ""
        }

      </div>

      <div className={`${styles.searchArea} ${isSearch ? styles.active : ""}`}>
        <input
          ref={searchInputRef}
          type='text'
          onChange={(e) => { setQueryInput(e.currentTarget.value) }}
          value={queryInput}
        ></input>

        <Link href={`./search/${queryInput}`} onClick={onSubmitSearch}>
          <Image
            src={"/icon/search.svg"}
            width={20}
            height={20}
            alt="Logo"
          />
        </Link>
      </div>
      <div
        className={`${styles.bgBlackEffect} ${isSearch ? styles.active : ""}`}
        onClick={onBreakSearch}
      ></div>
    </div>
  )
}