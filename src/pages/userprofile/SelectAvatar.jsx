import React from 'react'

const SelectAvatar = ({userAvatar,setUserAvatar}) => {
  return (
    <div className='selectAvatar'>
            <div onClick={(e)=>setUserAvatar(e.target.src)}>
                <img src="https://res.cloudinary.com/dbiove79b/image/upload/v1688144277/glow-hub/drew-dizzy-graham-cTKGZJTMJQU-unsplash_mpyl62.jpg" alt='avatar1' loading="lazy" height={90} width={90}/>
            </div>
            <div onClick={(e)=>setUserAvatar(e.target.src)}>
                <img src="https://res.cloudinary.com/dbiove79b/image/upload/v1688144277/glow-hub/denys-nevozhai-z0nVqfrOqWA-unsplash_wvhwvo.jpg" alt='avatar2' loading="lazy" height={90} width={90}/>
            </div>
            <div onClick={(e)=>setUserAvatar(e.target.src)}>
                <img src="https://res.cloudinary.com/dbiove79b/image/upload/v1688144277/glow-hub/portrait-beautiful-authentic-scandinavian-woman_sxfeke.jpg" alt='avatar3' loading="lazy" height={90} width={90}/>
            </div>
            <div onClick={(e)=>setUserAvatar(e.target.src)}>
                <img src="https://res.cloudinary.com/dbiove79b/image/upload/v1688144276/glow-hub/jared-rice-NTyBbu66_SI-unsplash_tlxmdt.jpg" alt='avatar4' loading="lazy" height={90} width={90}/>
            </div>
        
    </div>
  )
}

export default SelectAvatar