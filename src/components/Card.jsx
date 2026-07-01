import axios from "axios";
import React, { useState, useEffect } from "react";

const Card = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");



  const submitHandler = async(e)=>{
    e.preventDefault();

    try{
      if(updatedTitle==="" || updatedDescription===""){
        alert("Please fill this first")
        return;
      }

       const response = await axios.patch(`http://localhost:5000/api/notes/update-notes/${props.id}`,
        {
          updatedTitle,
          updatedDescription

        }

      )

      alert(response.data.message);

      setIsOpen(false)
      setUpdatedTitle("")
      setUpdatedDescription("")

    }
  
     
    catch(err){
      console.log(err);

    }

  }

useEffect(() => {
    props.noteData();
  },[]);




  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/delete-notes/${props.id}`);

       if (props.noteData) {
        props.noteData();
      }
      alert("Note deleted successfully");

     
    } catch (err) {
      console.log(err);
      alert("Failed to delete note");
    }
  };

  return (
    <div className="w-full min-h-[260px] bg-pink-100 rounded-3xl shadow-lg p-6 flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

      {/* Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          className="h-8 px-4 bg-red-200 rounded-xl text-sm hover:scale-105 transition"
          onClick={()=>{
            setIsOpen(
              (prev)=>!prev
            )
          }}
        >
          Edit
        </button>



        <button
          className="h-8 px-4 bg-red-400 rounded-xl text-sm hover:scale-105 transition"
          onClick={deleteHandler}
        >
          Delete
        </button>

       
      </div>

      {/* Title */}
      <h1 className="font-kristen text-2xl md:text-3xl break-words text-center mb-4">
        {props.title}
      </h1>

      {/* Description */}
      <div className="flex-1">
        <p className="font-kristen text-lg md:text-xl break-words whitespace-pre-wrap">
          {props.description}
        </p>
      </div>
      {isOpen && (
        <div className="h-full w-full gap-5 border-pink-200 border flex flex-col bg-purple-200">
          <div className="flex flex-col justify-around gap-5">
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              placeholder="Enter Your New Title"
              className="h-12 w-[80%] rounded-xl border border-pink-500/50 bg-white/10 px-4 text-purple-800 placeholder:text-purple-300/60 outline-none transition-all duration-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/40"
            />

            <textarea
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              placeholder="Enter Your New Description"
              className="min-h-32 w-[80%] resize-none rounded-xl border border-pink-500/50 bg-white/10 px-4 py-3 text-purple-800 placeholder:text-purple-300/60 outline-none transition-all duration-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/40"
            />
          </div>

          <button
            onClick={submitHandler}
            className="mt-6 h-12 w-[80%] rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-pink-500/40 active:scale-95"
          > 
            Update Note
          </button>
        </div>
      )}

    </div>
  );
};

export default Card;