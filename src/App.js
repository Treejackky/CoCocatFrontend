import { useState, useEffect } from "react";
import Login from "./Login"
import Dashboard from "./Dashboard";
import Register from "./Register";

export default function App() {
  const [page, setPage] = useState(0);
  const [newdata, setNewdata] = useState(null);

  const handlePageChange=(e)=>{
    if(e.data){
      setPage(e.page);
      setNewdata(e.data);
      // console.log(newdata)
    }else{
      setPage(e);
      // console.log(e);
    }
  }

  let isPage=()=>{
    if(page == 0){
      return <Login handleChange={(e) => handlePageChange(e)} handleData={(newdata)} />
    }else if(page == 1){
      return <Dashboard  handleChange={(e) => handlePageChange(e)} handleData={(newdata)} />
    }else if(page == 2){
      return <Register  handleChange={(e) => handlePageChange(e)} handleData={(newdata)} />
    }
  }

  return (
    <>
    {isPage()}
    </>
  )
}