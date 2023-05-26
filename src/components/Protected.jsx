import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children}) {

    const navigate = useNavigate()
    const {isLloggedin, token} = useSelector(state => state.auth)

    useEffect(() => {
        if(!token && !isLloggedin) {
            navigate('/')
            return
        }
    }, [isLloggedin, navigate, token])

  return children
}

export default Protected