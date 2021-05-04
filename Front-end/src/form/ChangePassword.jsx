import React from 'react'
import axios from 'axios' 
import { useParams } from 'react-router-dom'

function ChangePassword(props) {
  const {id} = useParams()
  const initialState = {
    password:'',
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
      const res = await axios.post(`http://localhost:3001/api/update/${id}`,dataLogin)
      if(res){
        if(res.data.isAuth && res.data.role === 'Admin') props.history.push('/admin')
        if(res.data.isAuth && res.data.role === 'User') props.history.push('/user')
        if(res.data.isAuth && res.data.role === 'Tech') props.history.push('/tech')
      }
    } catch (error) {
      error && setError(error.response);
    }

  }
  return (
    <div>
      <h1>ChangePassword</h1>
       {
         error && <p>{error}</p>
       }
       <form onSubmit={handelSubmit}>
         <input type="password" name="password" className="form-control" id="" onChange={handelChange}/>
         <input type="submit" className="form-control" value="changePassword"/>
       </form>
    </div>
  )
}

export default ChangePassword