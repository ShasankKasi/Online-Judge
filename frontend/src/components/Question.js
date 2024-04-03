import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Homebar from "./Homebar";
import "./Question.css";
import axios from "axios";
import Spinner from "./Spinner.gif";
import RunTest from "./RunTest";

const handleClick = async (
  testcases,
  code,
  id,
  limit,
  setPass,
  checking,
  setVerdict,
  setX,
  setY,
  setSolve,
  setCorrect,
  setError,
) => {
  try {
    console.log("1");
    setError(false);
    console.log("1");
    setCorrect(false);
    console.log("1");
    if (limit === 2) setY(false);
    console.log("1");
    checking(true);
    const body = { testcases, language: "cpp", code, limit };
    console.log("a");
    const response = await axios.post(
      `http://localhost:8000/Question/${id}`,
      body
    );
    console.log("2");
    checking(false);
    console.log("2");
    if (limit !== 2) setY(true);
    console.log("2");
    if (response.data.status === "NoOutput") {
      console.log("No output");
    } else if (response.data.status === "Success") {
      setX(true);
      setSolve(response.data.solve);
      console.log(`${response.data.count}Testcases ran successfully`);
      setPass(response.data.count);
      setCorrect(true);
    } else if (response.data.status === "Fail") {
      setX(true);
      setSolve(response.data.solve);
      console.log(response.data.count);
      setPass(response.data.count);
      console.log("testcases failed");
    } else if (response.data.status === "Compilation Error"){
      setError(true);
      setX(false);
      setY(false)
      console.log("Compilation Error", response.data.e);}
    setVerdict(response.data.results);
  } catch (e) {
    console.log(e);
    console.log("error occurred");
  }
};
export default function Question() {
  // const navigate=useNavigate();
  const [pass, setPass] = useState(0);
  const { id, title, description, testcases } = useParams();
  const [code, setCode] = useState(
    "// Enter the code here \n #include<bits/stdc++.h>\n using namespace std;\n \nint main()\n{\n\n return 0;\n}"
  );
  const [solve, setSolve] = useState([]);
  const [y, setY] = useState(false);
  const [question, setQuestion] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [verdict, setVerdict] = useState([]);
  const [present, setPresent] = useState(false);
  const [running, setRunning] = useState(false);
  const [x, setX] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [error,setError]=useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8000/question/${id}`)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div>
      <Homebar />
      {isLoading ? (
        <>"Loading. the Problem Page..."</>
      ) : (
        <>
          <div>
            <div className="box">
              <div className="container">
                <h1 className="titles">{question.title}</h1>
                <div className="description">
                  <pre>{question.description}</pre>
                </div>
                <ul className="unorderedlist">
                  {question.testcases.slice(0, 2).map((testcase, i) => (
                    <li key={i} className="List">
                      <div className="input">
                        <strong>Input</strong>
                        <pre className="pre">
                          <br></br>
                          {testcase.input}
                        </pre>
                      </div>
                      <div className="output">
                        <strong>Output</strong>
                        <pre>
                          <br></br>
                          {testcase.output}
                        </pre>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="compiler">
                <textarea
                  rows="20"
                  cols="75"
                  className="text"
                  value={code}
                  spellCheck="false"
                  style={{ minWidth: "300px", minHeight: "200px" }}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
          </div>
          <>
            <div className="buttons">
              <button
                type="submit"
                className="button"
                onClick={() =>
                  handleClick(
                    question.testcases,
                    code,
                    id,
                    2,
                    setPass,
                    setRunning,
                    setVerdict,
                    setX,
                    setY,
                    setSolve,
                    setCorrect,
                    setError,
                  )
                }
              >
                {running ? (
                  <img className="loading-image" src={Spinner} alt="spinner" />
                ) : (
                  "Run"
                )}
              </button>
              <button
                type="submit"
                className="button"
                onClick={() =>
                  handleClick(
                    question.testcases,
                    code,
                    id,
                    question.testcases.length,
                    setPass,
                    setSubmitting,
                    setVerdict,
                    setX,
                    setY,
                    setSolve,
                    setCorrect,
                    setError
                  )
                }
              >
                {submitting ? (
                  <img className="loading-image" src={Spinner} alt="spinner" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </>
          {error && (
            <div className="c-Error">
              <strong>Compilation Error :</strong>
              <p className="c-error2">Check the possible syntax errors  and try running it again</p>
            </div>
          )}
          {!error&&!y && (
            <div className="result">
              <h1>
                {!x ? (
                  <RunTest testcases={question.testcases} flag={false} />
                ) : (
                  <RunTest
                    testcases={question.testcases}
                    flag={true}
                    verdict={verdict}
                    solve={solve}
                  />
                )}
              </h1>
            </div>
          )}
          {!error&& y && (
            <div
              className="submitted"
              style={{ border: correct ? "4px solid green" : "4px solid red" }}
            >
              <div>
                <h1>Submission</h1>
                {correct && <div className="tick">&#9989;</div>}
                {!correct && <div className="wrong">&#10006;</div>}
              </div>
              <table className="verdict-table">
                <thead>

                <tr>
                  <th className="heading">No. of TestCases</th>
                  <th>Test Cases Passed </th>
                  <th>Verdict</th>
                </tr>
                </thead>
                <tbody>

                <tr>
                  <td className="heading">{question.testcases.length}</td>
                  <td>{pass}</td>
                  <td>
                    {correct ? (
                      <p
                      style={{
                        color: "white",
                        padding: "8px",
                        backgroundColor: "green",
                      }}
                      >
                        Submitted
                      </p>
                    ) : (
                      <p
                      style={{
                        color: "white",
                        padding: "8px",
                        backgroundColor: "red",
                      }}
                      >
                        Failed
                      </p>
                    )}
                  </td>
                </tr>
              </tbody>
              </table>
              {!correct && (
                <div className="info">
                  <p>
                    Your Program failed for <br></br>
                  </p>
                  <p>Input:</p>
                  <p className="failed-input">{question.testcases[1].input}</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
