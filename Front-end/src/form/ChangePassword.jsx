import React from 'react'
import axios from 'axios' 
import Layout from './../core/Layout'
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
      if(error) console.log(error.response);
    }

  }
  const changePassword = () =>  (
    
       <form onSubmit={handelSubmit}>
         <input type="password" name="password" className="form-control"  onChange={handelChange}/>
         <input type="submit" className="form-control" value="changePassword"/>
       </form>
    
  )
  return (
    <div>
       <Layout title="change Password">
           <div className="row">
               <div className="col-md-6 mx-auto">

                 { changePassword() }
               </div>
            </div>
           

       </Layout>
    </div>
)
}


export default ChangePassword