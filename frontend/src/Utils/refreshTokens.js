import React from 'react'
import axios from './axios_main'
import AuthSession from './AuthSession'
const refreshTokens = () => {
    const{setAuth} = AuthSession();
    
    const refresh = async () => {
        const response = await axios.get('/refresh');

        setAuth(prev => {
            console.log(JSON.stringify(prev));
            return {}
        })
    }

  return (
    <div>refreshTokens</div>
  )
}

export default refreshTokens