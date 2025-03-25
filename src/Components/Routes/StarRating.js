import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const StarRating = ({rating, size = 20, color = "#FFD700"}) => {
    const stars = Array.from({length:5},(_,i)=>{
        if(i < Math.floor(rating)) return <FaStar key = {i} size={size} color = {color} />
        if (i < (rating)) return <FaStarHalfAlt  key = {i} size={size} color = {color} />
        return <FaRegStar key = {i} size={size} color = {color}/>
    })
  return (
    <div>
      {stars}
    </div>
  )
}

export default StarRating
