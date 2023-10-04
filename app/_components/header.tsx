import styles from '@styles/components/header.module.scss';
import Image from 'next/image'

export default function comp() {
  return (
    <div className={styles.header_wrap}>
      <div className="logo_wrap">
        {/* <img src=""></img> */}
        {/* <Image
          src={""}
          width={30}
          height={30}
          alt="Logo"
        /> */}
        <h5>덕소고큐브</h5>
      </div>
    </div>
  )
}