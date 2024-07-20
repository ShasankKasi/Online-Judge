import React, { useState } from "react";
import "./RunTest.css";
import { MdAccessTimeFilled } from "react-icons/md";

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
    <div className="boxx">
      <div className="buttons">
        <button
          className={`case ${!trigger ? "active" : ""}`}
          onClick={() => handleCase1(setTrigger)}
          disabled={!trigger}
        >
          Case1
        </button>
        <button
          className={`case ${trigger ? "active" : ""}`}
          onClick={() => handleCase2(setTrigger)}
          disabled={trigger}
        >
          Case2
        </button>
      </div>
      <div className="results">
        {accepted1 && !trigger && (
          <p style={{ color: "green" }}>
            Accepted &nbsp;
            <MdAccessTimeFilled /> &nbsp;{props.timeTaken} s
          </p>
        )}
        {accepted2 && trigger && (
          <p style={{ color: "green" }}>
            Accepted &nbsp;
            <MdAccessTimeFilled /> &nbsp;{props.timeTaken} s
          </p>
        )}
        {props.flag && !props.solve[0] && !trigger && (
          <p style={{ color: "red" }}>Wrong Answer</p>
        )}
        {props.flag && !props.solve[1] && trigger && (
          <p style={{ color: "red" }}>Wrong Answer</p>
        )}
        <div className="inputt">
          <p>
            <>Input :</>
            &nbsp;
            {!trigger
              ? `${props.testcases[0].input}`
              : `${props.testcases[1].input}`}
          </p>
        </div>
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
