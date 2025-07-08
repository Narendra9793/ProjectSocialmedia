import React, { useEffect } from 'react'

const UpdateDetails = ({user}) => {
  useEffect(()=>{
    if(!user)return ;
  }, [user])

  return (
    <div>
      
    </div>
  )
}

export default UpdateDetails
