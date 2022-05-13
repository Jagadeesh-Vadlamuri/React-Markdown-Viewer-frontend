import React, { useState, useEffect, useContext } from "react";
import { store } from "../App";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import ReactMarkdown from "react-markdown";
import DownloadIcon from '@mui/icons-material/Download';
import EditCard from "./EditCard";

const Card = ({formik}) => {
  const URL = "https://react-markdown-editor-app.herokuapp.com";

  const [cone, setCone] = useContext(store);

  const handleEdit = async(id) => {
        await axios.get(`${URL}/getTask/${id}`).then((res) =>
        formik.setValues(res.data)
    );
  };
  
  return (
    <div className="container">
      {cone.map((item) => {
        return (
            <div key={item._id}>
              <Link className="btn btn-secondary" to="/getTasks">
                Show all Tasks
              </Link>
              <Link
                className="btn btn-success mx-3"
                onClick={() => handleEdit(item._id)}
                to={`/updateTask/${item._id}`}
              >
                Edit
              </Link>
            <div className="mt-4 border-dark">
            <hr />
              <h2>
                <b className="bg-success text-light px-3 py-2" style={{marginRight: 15}}>Title :- </b> {item.title}
              </h2>
              <hr />
              <h2>
                <b className="bg-success text-light px-3 py-2" style={{marginRight: 15}}>Description :- </b>
                {item.description}
              </h2>
              <hr />  
              <h2 >
                <b className="bg-success text-light px-3 py-2"><DownloadIcon style={{fontSize: 38}}/> Converted Text :- </b><ReactMarkdown className="mt-3">{item.markdown}</ReactMarkdown>
              </h2>
              </div>
            </div>
        );
      })}
    </div>
  );
};

export default Card;
