import React, { useEffect } from 'react'
import './VisitCard.css'
import { useState } from 'react'

const VisitCard = ({visit}) => {
    const [visitor, setVisitor]= useState();
    const [Date, setDate]= useState();
    useEffect(()=>{
        console.log("Visit", visit)
        // setVisitor(visit.visitBy)
        // setDate(visit.visitDate)
    }, [])
  return (
    <div>
      <div className="visitCard">
        <h2>{visitor}</h2>
        <h3>{Date}</h3>
      </div>
    </div>
  )
}

export default VisitCard
