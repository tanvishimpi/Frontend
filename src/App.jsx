import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import axios from "axios";

const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://backend-2-6oi4.onrender.com/api/notes/get-notes"
      );

      setNotes(response.data.notes);
    } catch (err) {
      console.log(err);
    }
  };

  const createHandler = async (e) => {
    e.preventDefault();

    try {
      if (title === "" || description === "") {
        alert("Please fill all the fields");
        return;
      }

      await axios.post(
        "https://backend-2-6oi4.onrender.com/api/notes/create-notes",
        {
          title,
          description,
        }
      );

      setTitle("");
      setDescription("");

     
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [createHandler]);

return (
  <div className="min-h-screen bg-gradient-to-br from-[#FFF9F8] via-pink-50 to-red-100 p-5">

    <div className="max-w-7xl mx-auto">

      {/* Heading */}

      <div className="text-center mb-10">

        <h1 className="font-kristen text-5xl">
          📎My Notes
        </h1>

        <p className="mt-4 text-gray-500 font-kristen text-lg">
          Write it. Save it. Remember it. 💕
        </p>

      </div>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* LEFT */}

        <div className="w-full lg:w-[35%]">

          <div className="bg-[#FFF9F8] rounded-[35px] shadow-2xl border border-pink-200 p-7">

            {/* Cute Greeting */}

            <div className="bg-pink-100 rounded-3xl p-5 mb-8 shadow">

              <h2 className="font-kristen text-2xl">
                🌸 Create a Note
              </h2>

              <p className="font-kristen text-sm text-gray-600 mt-2">
                Don't let your ideas fly away...
              </p>

            </div>

            <form
              onSubmit={createHandler}
              className="flex flex-col gap-5"
            >

              <h2 className="font-kristen text-3xl">
                ✏️ Title
              </h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full rounded-full border border-purple-300 bg-white p-4 font-kristen shadow-md outline-none transition-all duration-300 focus:shadow-xl focus:scale-[1.02]"
              />

              <h2 className="font-kristen text-3xl">
                📋 Description
              </h2>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write something beautiful..."
                className="w-full h-56 rounded-3xl border border-pink-300 bg-white p-5 font-kristen resize-none shadow-md outline-none transition-all duration-300 focus:shadow-xl focus:scale-[1.01]"
              />

              <button
                type="submit"
                className="bg-pink-300 text-white rounded-full py-4 font-kristen shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
              >
                💖 Save Note
              </button>

            </form>

          </div>

        </div>

        {/* RIGHT */}
<div className="flex-1">

  <div className="bg-red-100 rounded-[35px] shadow-2xl border border-pink-200 p-7 h-full">

    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">

      <h2 className="font-kristen text-4xl">
        📚 All Notes
      </h2>

      <span className="bg-white px-5 py-2 rounded-full shadow font-kristen">
        {notes.length} Notes ✨
      </span>

    </div>

    {notes.length === 0 ? (

      <div className="h-80 flex flex-col justify-center items-center">

        <h2 className="text-7xl">🌸</h2>

        <h2 className="font-kristen text-3xl mt-4">
          No Notes Yet
        </h2>

        <p className="font-kristen text-gray-500 mt-2">
          Create your first cute note!
        </p>

      </div>

    ) : (

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-6
          items-start
        "
      >



           

        {notes.map((elem, idx) => (
          <Card
            key={idx}
            title={elem.title}
            description={elem.description}
            id={elem._id}
            noteData ={getData}
            
          />
        ))}

      </div>

    )}

  </div>

</div>

      </div>

    </div>

  </div>
);
};

export default App;