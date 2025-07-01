import React, { useEffect } from 'react'
import './VisitCard.css'
import { useState } from 'react'

const VisitCard = ({visitor, date}) => {
  
  return (
    <div>
      <div className="visitCard">
        <h2>{visitor.firstName}</h2>
        <h3>{date}</h3>
      </div>
    </div>
  )
}

export default VisitCard
