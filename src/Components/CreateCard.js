import React, {useState} from "react";
import {useFormik} from 'formik';
import axios from 'axios';
import {Link} from 'react-router-dom';

const CreateCard = () => {
    const URL = "https://react-markdown-editor-app.herokuapp.com";
    
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            markdown: ""
        },
        onSubmit: async(values) => {
            try{
                await axios.post(`${URL}/createTask`, values).then((res)=>{
                    console.log(res.data)
                })
            } catch(err){
                console.log(err)
            }
            alert('Data has been Created Successfully.......Please Click Show all Tasks button to see the created task')
            formik.values.title=""
            formik.values.description=""
            formik.values.markdown=""
        },
        validate: (values) => {
            let errors = {};
            if (!values.title) {
              errors.title = "Title is Required";
            }
            if (!values.description) {
              errors.description = "Description is Required";
            }
            if (!values.markdown) {
              errors.markdown = "Markdown text is Required";
            }
            return errors;
          }
        })
  return (
    <div className="container">
      
      <form onSubmit={formik.handleSubmit}>
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
          {formik.errors.title ? (
                <div style={{ color: "red" }}>{formik.errors.title}</div>
              ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
          Description
          </label>
          <textarea className="form-control border-dark" id="description" cols="30" rows="5" placeholder="Please enter the description here" onChange={formik.handleChange} name="description"
            value={formik.values.description}></textarea>
            {formik.errors.description ? (
                <div style={{ color: "red" }}>{formik.errors.description}</div>
              ) : null}
        </div>
        <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Markdown
          </label>
          <textarea className="form-control border-dark" id="markdown" cols="30" rows="5" placeholder="Please enter the markdown text here" onChange={formik.handleChange} name="markdown"
            value={formik.values.markdown}></textarea>
            {formik.errors.markdown ? (
                <div style={{ color: "red" }}>{formik.errors.markdown}</div>
              ) : null}
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <Link type="submit" className="btn btn-secondary mx-3" to="/getTasks">
          Show all Tasks
        </Link>
      </form>
    </div>
  );
};

export default CreateCard;
