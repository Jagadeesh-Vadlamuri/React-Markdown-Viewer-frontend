import React, {createContext, useState} from "react";
import { Routes, Route } from "react-router-dom";
import Cards from "./Components/Cards";
import Card from "./Components/Card";
import CreateCard from './Components/CreateCard';
import EditCard from './Components/EditCard';
import HomePage from './Components/HomePage';
import {useFormik} from 'formik';
import Navbar from './Components/Navbar';
import Popup from './Components/Popup';
import './Components/Popup.css';
import ReactMarkdown from 'react-markdown';

export const store = createContext()
const App = () => {
  const [cone, setCone] = useState({
    title:"",
    description: "",
    markdown: ""
  })
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      markdown: "",
      _id:""
    }
  })
  // const [details, setDetails] = useState({
  //   title:"",
  //   description: "",
  //   markdown: ""
  // })

  return (
    <store.Provider value= {[cone, setCone]}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/getTask/:id" element={<Card formik={formik}/>} />
        <Route path="/getTasks" element={<Cards />} />
        <Route path="/createTask" element={<CreateCard />} />
        <Route path="/updateTask/:id" element={<EditCard formik={formik}/>} />
      </Routes>
    </store.Provider>
  );
};

export default App;
