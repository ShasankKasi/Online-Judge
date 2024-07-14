import React from "react";
import "./RunTest.css";
import { useState } from "react";

const handleCase1 = async (setTrigger) => {
  setTrigger(false);
};
const handleCase2 = async (setTrigger) => {
  setTrigger(true);
};

export default function RunTest(props) {
  const [trigger, setTrigger] = useState(false);
  let accepted1 = props.flag && props.solve[0];
  let accepted2 = props.flag && props.solve[1];
  return (
    <div>
      <div className="boxx">
        {/* <div> <h1>Input</h1></div>
        <div> <h2>{props.testcases[0].input}</h2></div>
        <div><h1>Output</h1></div>
        <div><h2>{props.testcases[0].output}</h2></div>
        <div> <h1>Required Output</h1></div>
        <div> {props.flag?props.verdict[0]:""}</div>  */}
        <div>
          {accepted1 && !trigger && (
            <p style={{ color: "green" }}>&nbsp;&nbsp;&nbsp;&nbsp;Accepted</p>
          )}
          {accepted2 && trigger && (
            <p style={{ color: "green" }}>&nbsp;&nbsp;&nbsp;&nbsp;Accepted</p>
          )}
          {props.flag && !props.solve[0] && !trigger && (
            <p style={{ color: "red" }}>&nbsp;Wrong Answer</p>
          )}
          {props.flag && !props.solve[1] && trigger && (
            <p style={{ color: "red" }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wrong Answer
            </p>
          )}

          <button
            className="case1"
            onClick={() => handleCase1(setTrigger)}
            style={{
              backgroundColor: !trigger ? "rgb(208, 205, 200)" : "white",
            }}
          >
            Case1
          </button>
          <button
            className="case2"
            onClick={() => handleCase2(setTrigger)}
            style={{
              backgroundColor: trigger ? "rgb(208, 205, 200)" : "white",
            }}
          >
            Case2
          </button>
        </div>
        <div className="inputt">
          <p>
            <>Input :</>
            &nbsp;
            {!trigger
              ? `${props.testcases[0].input}`
              : `${props.testcases[1].input}`}
          </p>
        </div>
        <br></br>
        {props.flag && (
          <div className="expected-output">
            <p>{`Output : ${
              !trigger ? props.verdict[0] : props.verdict[1]
            }`}</p>
          </div>
        )}

        <div className="expected-output">
          <p>
            <>Expected :</>
            &nbsp;
            {!trigger
              ? `${props.testcases[0].output}`
              : `${props.testcases[1].output}`}
          </p>
        </div>
      </div>
    </div>
  );
}
