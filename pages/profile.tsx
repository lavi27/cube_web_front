import { getEnv } from "@root/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { Profile } from '@root/types'


export default function Comp() {
  const [profile, setProfile] = useState<Profile>();
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const follow = () => {
    axios.post(getEnv().API_URL + '/api/breeds/list/all')
      .then(res => res.data)
      .then(data => {
        setIsFollowing(!isFollowing);
      })
      .catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    axios.get(getEnv().API_URL + '/api/breeds/list/all')
      .then(res => res.data)
      .then(data => {
        setProfile(data);
      })
      .catch(error => {
        console.log(error);
      })

    axios.get(getEnv().API_URL + '/api/home')
      .then(res => res.data)
      .then(data => {
        setPosts(data.post);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <div className="home_wrap">
      {
        profile ?
          <div className="profile_wrap">
            <div className="profile_header">
              <div className="profile_icon_wrap">
                <Image
                  src={profile.profileIconSrc}
                  width={30}
                  height={30}
                  alt="UserIcon"
                />
              </div>
              <div className="profile_name">{profile.username}</div>
              <div className={`profile_followBtn ${isFollowing ? 'active' : ''}`} onClick={follow}>
                {isFollowing ? '팔로우' : '언팔로우'}
              </div>
              <div className="profile_posts_wrap">
                <i>포스트 수</i>
                <div>{profile.postCount}</div>
              </div>
              <div className="profile_follower_wrap">
                <i>팔로워 수</i>
                <div>{profile.followerCount}</div>
              </div>
              <div className="profile_following_wrap">
                <i>팔로잉 수</i>
                <div>{profile.followingCount}</div>
              </div>
            </div>
            {
              posts.map((post) => {
                return (<></>);
              })
            }
          </div>
          :
          <div className="post_skeleton">
            <div className="post">
              <div className="post_header">
                <div className="user_wrap">
                  <div className="user_icon_wrap">
                  </div>
                  <span className="user_userName"></span>
                </div>
              </div>
              <div className="post_content"></div>
              <div className="post_footer">
                <div className="like_wrap">
                </div>
              </div>
            </div>
            <div className="post">
              <div className="post_header">
                <div className="user_wrap">
                  <div className="user_icon_wrap">
                  </div>
                  <span className="user_userName"></span>
                </div>
              </div>
              <div className="post_content"></div>
              <div className="post_footer">
                <div className="like_wrap">
                </div>
              </div>
            </div>
          </div>
      }
    </div>
  )
}