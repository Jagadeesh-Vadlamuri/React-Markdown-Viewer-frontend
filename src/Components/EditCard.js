import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import { store } from "../App";

const EditCard = ({ formik }) => {
  const URL = "https://react-markdown-editor-app.herokuapp.com";

  const dump = async() => {
    try{
       await axios.put(`${URL}/updateTask/${formik.values._id}`, formik.values).then((res)=>{
        console.log(res.data)
      })
      alert("Data has been Updated Successfully.......Please Click Show all Tasks button to see the updated task")
      
    } catch(err){
      console.log(err)
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    dump();
    formik.values.title= ""
    formik.values.description = ""
    formik.values.markdown = ""
  };
  
  const [cone, setCone] = useContext(store);
  return (
    <div className="container">
      <form >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control border-dark"
            id="title"
            name="title"
            value={formik.values.title}
            placeholder="Please enter the title here"
            onChange={formik.handleChange}
          />
      
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control border-dark"
            id="description"
            cols="30"
            rows="5"
            placeholder="Please enter the description here"
            onChange={formik.handleChange}
            name="description"
            value={formik.values.description}
          ></textarea>
         
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Markdown
          </label>
          <textarea
            className="form-control border-dark"
            id="markdown"
            cols="30"
            rows="5"
            placeholder="Please enter the markdown text here"
            onChange={formik.handleChange}
            name="markdown"
            value={formik.values.markdown}
          ></textarea>
         
        </div>
        <button type="submit" className="btn btn-success" onClick={(e)=>handleUpdate(e)}>
          Update
        </button>
        <Link type="submit" className="btn btn-secondary mx-3" to="/getTasks">
          Show all Tasks
        </Link>
      </form>
    </div>
  );
};

export default EditCard;
