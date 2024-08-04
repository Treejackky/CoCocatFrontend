import { useState, useEffect } from "react";
import Login from "./Login"
import Dashboard from "./Dashboard";
import Register from "./Register";
import Detail from "./Detail";
import History from "./History";

export default function App() {
  const [page, setPage] = useState(0);
  const [newdata, setNewdata] = useState(null);

  const handlePageChange=(e)=>{
    if(e.data){
      setPage(e.page);
      localStorage.setItem('nowpage', JSON.stringify(e.page));
      setNewdata(e.data);
      localStorage.setItem('data', JSON.stringify(e.data));
      // console.log(e.data)
      if(e.time){
        localStorage.setItem('time', JSON.stringify(e.time));
      }
    }else{
      setPage(e);
      localStorage.setItem('nowpage', JSON.stringify(e));
    }
  }

  useEffect(()=>{
    const tokens = JSON.parse(localStorage.getItem('login'));
    const nowpages = JSON.parse(localStorage.getItem('nowpage'));
    if(tokens){
      setPage(nowpages);
      console.log(page)
    }else{
      if(nowpages == 2){
        setPage(nowpages);
      }
    }
  },[]);

  let isPage=()=>{
    if(page == 0){
      return <Login handleChange={(e) => handlePageChange(e)} handleData={(newdata)} />
    }else if(page == 1){
      return <Dashboard  handleChange={(e) => handlePageChange(e)} handleData={(newdata)} />
    }else if(page == 2){
      return <Register  handleChange={(e) => handlePageChange(e)} handleData={(newdata)} />
    }else if(page == 3){
      return <Detail  handleChange={(e) => handlePageChange(e)} handleData={(newdata)} />
    }else if(page == 4){
      return <History  handleChange={(e) => handlePageChange(e)} handleData={(newdata)} />
    }
  }

  return (
    <>
    {isPage()}
    </>
  )
}