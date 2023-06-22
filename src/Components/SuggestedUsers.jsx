import React from 'react'
import { usePosts } from '../contexts/post-context'
import { useAuth } from '../contexts/auth-context';

const SuggestedUsers = () => {
    const {postData,followUser} = usePosts();
    const { userData } = useAuth();
  return (
    <aside>
     
      <div className='suggestedUsers'>
      <input type='text' placeholder='search user'/>
          {postData.users.map(
            ({ _id, firstName, lastName, username }) =>
              username !== userData.username &&
              postData.userDetails?.following?.find(
                (post) => post.username === username
              ) === undefined && (
                <li key={_id} style={{ listStyle: "none" }}>
                  <h3>
                    {firstName} {lastName}
                  </h3>
                  <p>@{username}</p>
                  <button onClick={() => followUser(_id)}>Follow</button>
                </li>
              )
          )}
          </div>
        </aside>
  )
}

export default SuggestedUsers