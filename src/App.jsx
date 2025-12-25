import TaskBoard from "./features/tasks/TaskBoard";
import React from "react";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

export default function App() {
  return (
    <div className="app-container" style={{display:"flex", backgroundColor:'#f8f9fa'}}>
      <Sidebar/>
      <div className="main-wrapper" style={{flex:1, marginLeft:"260px"}}>
        <Navbar title="To-Do"/>
        <TaskBoard/>
      </div>
    </div>
  );
}