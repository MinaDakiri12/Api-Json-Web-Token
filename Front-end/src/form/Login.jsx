import React from 'react'
import Layout from './../core/Layout'
import axios from 'axios'

axios.defaults.withCredentials = true

function Login(props) {
  const initialState = {
    email: '',
    password:''
  }
  const [dataLogin,setDataLogin] = React.useState(initialState)
  const [error,setError] = React.useState('')
  const handelChange = (e)=>{
    const {name,value} = e.target
    setDataLogin({...dataLogin,[name]:value})
  }
  const handelSubmit= async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/login',dataLogin,{
        withCredentials:true
      })
      if(res){
        if(!res.data.enabled) props.history.push(`/changepassword/${res.data.id}`)
        if(res.data.isAuth && res.data.role === 'Admin') props.history.push('/admin')
        if(res.data.isAuth && res.data.role === 'User') props.history.push('/user')
        if(res.data.isAuth && res.data.role === 'Tech') props.history.push('/tech')
      }
    } catch (error) {
     
    }

  }

  const Login = () => (
    <form onSubmit={handelSubmit}>
         <div className="form-group">
             <label htmlFor="email" className="text-muted">Email</label>
             <input onChange={handelChange}  type="text" className="form-control" id="email"/>
         </div>
         <div className="form-group">
             <label htmlFor="password" className="text-muted">Password</label>
             <input onChange={handelChange}  type="password" className="form-control" id="password"/>
         </div>
         <button className="btn btn-lg btn-block btn-outline-info">Login</button>
        </form>
 )
 return (
     <div>
        <Layout title="Login">
            <div className="row">
                <div className="col-md-6 mx-auto">

                  { Login() }
                </div>
             </div>
            

        </Layout>
     </div>
 )
}

export default Login
