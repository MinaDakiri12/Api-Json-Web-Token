import React, {Fragment} from 'react'
import { Link, withRouter} from 'react-router-dom'


const isActive = (history, path) =>{
    if(history.location.pathname === path){
        return{ color: '#0040ff'}
    }
    else{
        return { color : '#fff'}
    }
}

const Menu = (props) =>{

    return (
        <div>
   <nav className="navbar navbar-expand-lg navbar-dark bg-info">
   <Link className="navbar-brand" to="/">JWT </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
        <Fragment>  
      <li className="nav-item active">
        <Link style={isActive(props.history,'/')} className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link >
      </li>
       
      </Fragment>
    
    </ul>
    <ul className="navbar-nav ml-auto">
   
       <Fragment>
      <li className="nav-item">
        <Link style={isActive(props.history, '/login')} className="nav-link" to="/login">Connection</Link >
      </li>
      </Fragment>  
    </ul>
    
  </div>
</nav>      
        </div>
    )
}

export default withRouter(Menu)
