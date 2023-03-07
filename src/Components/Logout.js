import React, {useEffect, useState} from 'react'
import { NavLink, useHistory } from 'react-router-dom';



const Logout= () => { 

    const history = useHistory()
 
    const [show, setShow] = useState(false)
 

    

    const adminLogout = async() =>{
        
        const token = localStorage.getItem('token')
        const res = await fetch('/logoutAdmin', {
            method: "POST", 
            headers: {
              'CONTENT-Type':'application.json'
            },
           "auth'":token
        
          })
        
        
        let data = res.json();
        
        
        if(res.status === 201) {
            setShow(true)
         localStorage.removeItem('token', data.token)
        
          window.alert('logout Successful')
          history.push('/login',{replace: true})
        }
        else {
        
          window.alert('Logout Failed')
        history('/')
        }



      }

    
  useEffect(() => {
    adminLogout()
  }, []) 
    return (


    <div> 
 <h1>{show?'Logout Auccessfully' :  '/processing...'}</h1>
        Logout
    </div>
  )
    
    }

export default Logout
