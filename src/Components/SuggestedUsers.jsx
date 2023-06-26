import React from 'react'
import { usePosts } from '../contexts/post-context'
import { useAuth } from '../contexts/auth-context';

const SuggestedUsers = () => {
    const {postData,followUser} = usePosts();
    const { userData } = useAuth();
  return (
    <aside>
     <h3>Suggested for you</h3>
      <div className='suggestedUsers'>
        
          {postData.users.map(
            ({ _id, firstName, lastName, username,avatarURL }) =>
              username !== userData.username &&
              postData.userDetails?.following?.find(
                (post) => post.username === username
              ) === undefined && (
                <li key={_id} style={{ listStyle: "none" }}>
                  <img src={avatarURL} alt="pc" width={40} height={40} />
                  <h3>
                    {firstName} {lastName}
                  </h3>
                  <p>@{username}</p>
                  <button onClick={() => followUser(_id)} className='follow'>Follow</button>
                </li>
              )
          )}
          </div>
        </aside>
  )
}

export default SuggestedUsers