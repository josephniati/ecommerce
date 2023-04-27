import React, {useEffect, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';



const Logout= () => { 
const [show, setShow] = useState(false)

    const history = useNavigate()
 
 

    

    const adminLogout = async() =>{
        
        const token = localStorage.getItem('token')
        const res = await fetch('/logoutAdmin', {
            method: "POST", 
            headers: {
              'CONTENT-Type':'application.json'
            },
           "auth'":token
        
          });
        
        
        let data = await res.json();
        
        
        if(res.status === 201) {
          setShow(true)
           
        await  localStorage.removeItem('token', data.token)
        
          window.alert('Logout Successful')
          history.push('/login', {replace: true})
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
 <h1>{show?'Logout Successfully' :  'Processing...'}</h1>
        Logout
    </div>
  )
    
    }

export default Logout
