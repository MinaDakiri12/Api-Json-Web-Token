import React from 'react'
import Layout from './../core/Layout'
import axios from 'axios'


function Admin(){
  const initialState = {
    email: '',
    password:'',
    name:'',
    role:'User'
  }
  const [dataRegister,setDataRegister] = React.useState(initialState)
  const handelSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/register',dataRegister)
      res && console.log(res.data);
    } catch (error) {
      error && console.log(error.response)
    }
   
  }
  
  const handelChange = (e)=>{
    const {name,value} = e.target
    setDataRegister({...dataRegister,[name]:value})
  }
  const Admin = () => (
    <form onSubmit={handelSubmit}>
         <div className="form-group">
             <label htmlFor="name" className="text-muted">Name</label>
             <input onChange={handelChange}  type="text" className="form-control" id="name"/>
         </div>
         <div className="form-group">
             <label htmlFor="email" className="text-muted">Email</label>
             <input onChange={handelChange}  type="text" className="form-control" id="email"/>
         </div>
         <select class="custom-select" name="role" onChange={handelChange}>
            <option selected disabled value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Tech">Tech</option>
         </select>
         <div className="form-group">
             <label htmlFor="password" className="text-muted">Password</label>
             <input onChange={handelChange}  type="password" className="form-control" id="password"/>
         </div>
         <button className="btn btn-lg btn-block btn-outline-success">Register</button>
      
     </form>
 )
 return (
     <div>
        <Layout title="Register">
            <div className="row">
                <div className="col-md-6 mx-auto">

                  { Admin() }
                </div>
             </div>
            

        </Layout>
     </div>
 )
}

export default Admin
