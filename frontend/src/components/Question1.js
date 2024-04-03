import React from 'react'
import Homebar from './Homebar'
import { useState } from 'react'
import axios from 'axios'
import './Question1.css'
export default function Question1() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    const body = {
      language: "cpp",
      code,
    };

    try {
      const { data } = await axios.post("http://localhost:8000/question1", body);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div>
        <Homebar/>
        <div style={{border:"2px solid #000",padding:"2px",backgroundColor:"aquamarine"}}>

        <p style={{fontSize:"26px",}}>1)Given an array A[] of n numbers and another number x, the task is to check
              whether or not there exist two elements in A[] whose sum is exactly x.
              </p>
        </div>
        <br></br>
        <div style={{border:"2px solid #000",padding:"15px",backgroundColor:"aquamarine"}}>
        <h3>Test Case 1</h3>
        <p>Input: nums = [2,7,11,15], target = 9
          <br></br>
Output: [0,1]
<br></br>
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
</p>
        </div>
        <br></br>
      <h1 className='p'>Type the Code below</h1>
      <br></br>
      <textarea
        rows="20"
        cols="75"
        className="textarea"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>

      
      <button className="submit-button" onClick={handleSubmit}>
        <h1>Submit</h1>
       
      </button>

      <div>
        <h1 className="heading">
          {" "}
          <strong>Output </strong>
        </h1>
        {
          <div className="outputbox">
            <p>{output}</p>
          </div>
        }
      </div>
     </div>
  )
}
