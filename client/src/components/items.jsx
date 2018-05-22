import React from 'react';
import { Link, Redirect } from "react-router-dom";
function Items(props) {

  var containerElement = (props.isShared) ? "module-shared" : "module"
  
  if(props.errors.isNotLoggedIn){
    return <Redirect to='/login' />;
  }
  return (
    
    <div className={containerElement}>
      {props.items.map((post) =>
          <Link 
            key={post.id}
            className="btn btn-water btn-block"
            to={"/detail/" + post.id}>
            {post.title}
          </Link>
      )}
    </div>

  )
}

export default Items;