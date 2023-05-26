import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function RedirectIfProtected({children}) {
    const navigate = useNavigate()

    const {user, isLoggedin} = useSelector(state => state.auth)

    useEffect(() => {
        if(isLoggedin || user){
            navigate('/')
        }
    }, [isLoggedin, user, navigate])

  return children
}

export default RedirectIfProtected