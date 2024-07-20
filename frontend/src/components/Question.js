import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Homebar from "./Homebar";
import "./Question.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import RunTest from "./RunTest";
import toast from "react-hot-toast";
import SpinnerMini from "../ui/SpinnerMini";
import Spinner from "../ui/Spinner";
import PageNotFound from "./PageNotFound";
import { MdAccessTimeFilled } from "react-icons/md";

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
  setTimeTaken,language,
  setComp,
) => {
  const startTime = Date.now(); // Capture start time
  try {
    setError(false);
    setCorrect(false);
    if (limit === 2) setY(false);
    checking(true);
    console.log(language);
    const body = { testcases, language, code, limit };

    const response = await axios.post(
      `/api/Question/${id}`,
      body
    );
    checking(false);
    if (limit !== 2) setY(true);

    const endTime = Date.now(); // Capture end time
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Calculate time in seconds
    setTimeTaken(timeTaken); // Update state with time taken

    if (response.data.status === "NoOutput") {
      toast.error("No output");
    } else if (response.data.status === "Success") {
      setX(true);
      setSolve(response.data.solve);
      toast.success("Test cases ran successfully");
      setPass(response.data.count);
      setCorrect(true);
    } else if (response.data.status === "Fail") {
      setX(true);
      setSolve(response.data.solve);
      setPass(response.data.count);
    } else if (response.data.status === "Compilation Error") {
      setError(true);
      setX(false);
      setComp(response.data.err);
      setY(false);
      toast.error("Compilation error");
    }
    setVerdict(response.data.results);
  } catch (e) {
    toast.error("Unknown error occurred");
  }
};

const fetchQuestion = async (id) => {
  const { data } = await axios.get(`/api/question/${id}`);
  return data;
};

const Question = () => {
  const { id } = useParams();

  const {
    data: question,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["question", id],
    queryFn: () => fetchQuestion(id),
  });
  const [pass, setPass] = useState(0);
  const [code, setCode] = useState(
    "// Enter the code here \n #include<bits/stdc++.h>\n using namespace std;\n \nint main()\n{\n\n return 0;\n}"
  );
  const [solve, setSolve] = useState([]);
  const [y, setY] = useState(false);
  const [language, setLanguage] = useState("cpp");
  const [running, setRunning] = useState(false);
  const [x, setX] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [comp,setComp]=useState("");
  const [error, setError] = useState(false);
  const [verdict, setVerdict] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null); // State to store the time taken

  useEffect(() => {
    if (question) {
      setPass(0);
      setCode(
        "// Enter the code here \n #include<bits/stdc++.h>\n using namespace std;\n \nint main()\n{\n\n return 0;\n}"
      );
      setSolve([]);
      setY(false);
      setRunning(false);
      setSubmitting(false);
      setCorrect(false);
      setError(false);
      setVerdict([]);
      setTimeTaken(null); // Reset time taken
    }
  }, [question]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch question data");
    }
  }, [isError]);

  if (isLoading) return <Spinner />;

  if (!question) return <PageNotFound />;

  return (
    <div>
      <Homebar />
      <div className="box">
        <div className="container">
          <h1 className="titles">{question.title}</h1>
          <pre className="description">{question.description}</pre>
          <ul className="unorderedlist">
            {question.testcases.slice(0, 2).map((testcase, i) => (
              <li key={i} className="List">
                <div className="input">
                  <strong>Input</strong>
                  <pre className="pre">
                    <br />
                    {testcase.input}
                  </pre>
                </div>
                <div className="output">
                  <strong>Output</strong>
                  <pre>
                    <br />
                    {testcase.output}
                  </pre>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="language-selector">
      <label>Select language</label>
      <select value={language} onChange={(e)=>setLanguage(e.target.value)}>
        <option value="cpp">C++</option>
        <option value="cpp">C</option>
        <option value="py">Python</option>
        <option value="java">Java</option>
      </select>
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
              setTimeTaken ,
              language,
              setComp,
            )
          }
        >
          {running ? <SpinnerMini /> : "Run"}
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
              setError,
              setTimeTaken ,
              language,
              setComp,
            )
          }
        >
          {submitting ? <SpinnerMini /> : "Submit"}
        </button>
      </div>
      {error && (
        <div className="c-Error">
          <strong>Compilation Error :</strong>
          <p className="c-error2">
            Check the possible syntax errors and try running it again.
            {comp}
          </p>
        </div>
      )}
      {!error && !y && (
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
                timeTaken={timeTaken}
              />
            )}
          </h1>
        </div>
      )}
      {!error && y && (
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
                <td>{correct ? "Accepted" : "Wrong Answer"}</td>
              </tr>
            </tbody>
          </table>
          {timeTaken && (
            <div className="info">
              <p>
                Time Taken <MdAccessTimeFilled /> : {timeTaken} seconds
              </p>
            </div>
          )}
          {!correct && (
            <div className="info">
              <p>
                Your Program failed for <br />
              </p>
              <p>Input:</p>
              <p className="failed-input">{question.testcases[1].input}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
