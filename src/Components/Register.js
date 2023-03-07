import React, {useState} from 'react'
import { NavLink , useHistory } from 'react-router-dom'

const Register = () => {

  const history = useHistory()

const [user, setUser] = useState ({
  companyName: "", email:"", phone: "", password: "", cpassword: ""
})

const handleInputs= (e)=> {

  let name = e.target.name;
  let value = e.target.value;

  setUser({...user, [name]:value})

}

const postData = async (e)=> {
  e.preventDefault()

  const {companyName, email, phone, password, cpassword} = user

  const res = await fetch('/adminRegister', {
    method: "POST", 
    headers: {
      'CONTENT-Type':'application.json'
    },
    body:  JSON.stringify({
      companyName,email,phone, password, cpassword

  })
});

const data = await res.json();


if(res.status === 201) {
  localStorage.setItem('token', data.token)

  window.alert('Registration Successful')
  history.push('/')
}
else {

  window.alert('Registration Failed')

}


}
  return (
    <div className='container mt-5'>
      <div className= 'row'>
        <div className='col-12 col-md-7 col-sm-6'>
          <h1>Welcome!</h1>
        </div>
        <div className='col-12 col-md-5 col-sm-6'>
        <form method='POST'>
                                <div className="form-group">
                                    <label htmlFor="companyName">Company Name</label>
                                    <input type="text" className="form-control" id="companyName" name="companyName" 
                                        placeholder="Enter your name" value={user.companyName} onChange={handleInputs} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" 
                                        placeholder="Enter your Email" value={user.email} onChange={handleInputs} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone No.</label>
                                    <input type="tel" className="form-control" id="phone" name="phone" 
                                        placeholder="Enter your Phone No." value={user.phone} onChange={handleInputs}  />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" 
                                        placeholder="Enter your Password" value={user.password} onChange={handleInputs}  />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cpassword">Confirm password</label>
                                    <input type="password" className="form-control" id="cpassword" name="cpassword"
                                        placeholder="Confirm password" value={user.cpassword} onChange={handleInputs}  />
                                </div>
                                
                                <NavLink to='/login'>Already Registered, then Login here!</NavLink><br /><br />
                                <button type="submit" className="btn btn-primary" id='register' name='register'>
                                  onClick={postData}
                                  Register</button>

                            </form>
                        </div>
          
        </div>
      </div>

    
    
    
  )
}

export default Register