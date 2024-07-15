import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [input, setInput] = useState([]);
  const [output, setOutput] = useState([]);
  // const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const testcases = [];
    for (let i = 0; i < 5; i++) {
      testcases.push({
        input: input[i],
        output: output[i],
      });
    }

    try {
      const response = await axios.post("/api/admin", {
        title,
        description,
        testcases,
      });
      if (response.data.status === "success") {
        window.location.reload();
        toast.success("Question Submitted Successfullly.\nPost Another Question");
      }
    } catch (e) {
      toast.error("Error occured");
    }
  }
  return (
    <div>
      <Navbar />
      <form action="POST" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title Of Question"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <textarea
          placeholder="Type the Question here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div>
          <div>
            <textarea
              placeholder="Enter the test case 1"
              value={input[0]}
              onChange={(e) => setInput([e.target.value, ...input.slice(1)])}
            ></textarea>
            <textarea
              placeholder="Enter the Output 1"
              value={output[0]}
              onChange={(e) => setOutput([e.target.value, ...output.slice(1)])}
            ></textarea>
          </div>
          <div>
            <textarea
              placeholder="Enter the test case 2"
              value={input[1]}
              onChange={(e) =>
                setInput([input[0], e.target.value, ...input.slice(2)])
              }
            ></textarea>
            <textarea
              placeholder="Enter the output2"
              value={output[1]}
              onChange={(e) =>
                setOutput([output[0], e.target.value, ...output.slice(2)])
              }
            ></textarea>
          </div>
          <div>
            <textarea
              placeholder="Enter the test case 3"
              value={input[2]}
              onChange={(e) =>
                setInput([
                  ...input.slice(0, 2),
                  e.target.value,
                  ...input.slice(3),
                ])
              }
            ></textarea>
            <textarea
              placeholder="Enter the Output3"
              value={output[2]}
              onChange={(e) =>
                setOutput([
                  ...output.slice(0, 2),
                  e.target.value,
                  ...output.slice(3),
                ])
              }
            ></textarea>
          </div>
          <div>
            <textarea
              placeholder="Enter the test case 4"
              value={input[3]}
              onChange={(e) =>
                setInput([...input.slice(0, 3), e.target.value, input[4]])
              }
            ></textarea>
            <textarea
              placeholder="Enter the Output 4"
              value={output[3]}
              onChange={(e) =>
                setOutput([...output.slice(0, 3), e.target.value, output[4]])
              }
            ></textarea>
          </div>
          <div>
            <textarea
              placeholder="Enter the test case 5"
              value={input[4]}
              onChange={(e) => setInput([...input.slice(0, 4), e.target.value])}
            ></textarea>
            <textarea
              placeholder="Enter the Output 5"
              value={output[4]}
              onChange={(e) =>
                setOutput([...output.slice(0, 4), e.target.value])
              }
            ></textarea>
          </div>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
