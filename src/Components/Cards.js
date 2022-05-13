import React, { useState, useEffect, useContext } from "react";
import {store} from '../App';
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import Popup from './Popup';
import './Popup.css';
import LinesEllipsis from 'react-lines-ellipsis';
import Card from './Card';
import ReactMarkdown from 'react-markdown';

const Cards = () => {
  const URL = "https://react-markdown-editor-app.herokuapp.com";
  const [isOpen, setIsOpen] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      markdown: "",
      createdAt: new Date(),
    },
  });
  const [cone, setCone] = useContext(store)
  const [data, setData] = useState([formik.values]);
  const getTasks = async () => {
    await axios.get(`${URL}/getTasks`).then((res) => {
      setData(res.data);
    });
  };

  const togglePopup = (id) => {
    setIsOpen(!isOpen);
    for(let i=0; i<data.length; i++){
        if(data[i]._id==id){
            setData([data[i]])
        }
    }
  };
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    getTasks();
  }, [count]);

  const handleReadMore = async (id) => {
    for(let i=0; i<data.length; i++){
        if(data[i]._id==id){
            setCone([data[i]])
        }
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${URL}/deleteTask/${id}`, formik.values).then((res) => {
      setCount(count + 1);
      togglePopup()
    });
  };

  const handleCancel = () => {
    togglePopup();
    window.location.reload();
  }
  return (
    <div className="container">
        <div className="d-flex justify-content-end mb-3">
                <Link className="btn btn-primary" to="/createTask">Create Task</Link>
            </div>
      {data.length==0 ? 
      <div className="d-flex flex-column justify-content-center align-items-center">
          <h1>No data available</h1>
          <h2 className="mt-3">Please Create a task to view the data here</h2>
      </div> 
    : data.map((item) => {
        return (
            <>
          <div className="card h-100 mb-4 border-dark">
            <div className="card-body">
                <h5 className="card-index"></h5>
              <h5 className="card-title">Title : {item.title}</h5>
              <h5 className="card-text">Description: {item.description}</h5>
              <LinesEllipsis 
                text={item.markdown}
                maxLine='1'
                ellipsis='...........'
                trimRight
                basedOn='letters'
                className="mb-3">
              </LinesEllipsis>
  
              <div class="d-inline-block">
                <Link
                  className="btn btn-success mb-1"
                  to={`/getTask/${item._id}`}
                  onClick={() => handleReadMore(item._id)}
                >
                  Read More
                </Link>
                <button className="btn btn-danger mb-1 mx-3" onClick={()=>togglePopup(item._id)}>
                  Delete
                </button>
                {isOpen && (
                  <Popup
                    content={
                      <>
                        <h2>Do you really want to delete this Card ?</h2>
                        <h6 className="card-title mt-4"><b>Title</b>: {item.title}</h6>
                        <h6 className="card-text"><b>Description</b>: {item.description}</h6>
                        <h6 className="card-text"><b>Markdown</b>: {item.markdown}</h6>
                        <div className="mt-4">
                            <button className="btn btn-danger" onClick={()=>handleDelete(item._id)}>Confirm</button>
                            <button className="btn btn-secondary mx-3" onClick={handleCancel}>Cancel</button>
                        </div> 
                      </>
                    }
                    handleClose={togglePopup}
                  />
                )}
              </div>
            </div>
          </div>
          </>
        );
      })}
    </div>
  );
};

export default Cards;
