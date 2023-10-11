import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div>
        <Link to={'/frontend'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="13" viewBox="0 0 19 13" fill="none">
                <path d="M19 6.5L1 6.5M1 6.5L6.29412 12M1 6.5L6.29412 1" stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
        </Link>
    </div>
  )
}
