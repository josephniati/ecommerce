import React, {useState} from 'react'
import { NavLink } from 'react'
import { useHistory } from 'react-router-dom'
const Login = () => {

  const history = useHistory()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const setData = async(e) => {
      

        e.preventDefault()


        const res = await fetch('/adminLogin', {
            method: "POST", 
            headers: {
              'Content-Type':'application/json'
            },
            body:  JSON.stringify({
            email, password      
          })
        });
        
        const data = await res.json();
        
        
        if(res.status === 201) {
          localStorage.setItem('token', data.token)
        
          window.alert('Login Successful')
           history.push('/')
        }

         else {
            // alert('Invalid Credentials')
            return "Invalid Credentials"
        }
     }

  return (
    <>
    
        <div className="container mt-5">
            <div className='row'>

                <div className="col-sm-6 offset-md-3 offset-sm-1 ">
                    <form method="POST">

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email"
                                
                                placeholder="Enter your Email"  value={email} onChange={e=>setEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" name="password" 
                                placeholder="Enter your Password"  value={password} onChange={e=>setPassword(e.target.value)} />
                        </div>

                        {/* <NavLink to='/register'>Didn't Register, then register here!</NavLink><br /><br /> */}
                        <button type="submit" className="btn btn-primary" id='login' name='login'
                         onClick={setData}
                        >Login</button>

                    </form>
                </div>

            </div>

        </div>
    
</>
  )
}

export default Login