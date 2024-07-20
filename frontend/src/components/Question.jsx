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
import AceEditor from "react-ace";

// Import a theme and mode (language) for the editor
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/ext-language_tools";

// Set the base path for ACE editor
window.ace.config.set(
  "basePath",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.23.1/src-noconflict/"
);

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
  setTimeTaken,
  language
) => {
  const startTime = Date.now();
  try {
    setError(false);
    setCorrect(false);
    if (limit === 2) setY(false);
    checking(true);
    const body = { testcases, language, code, limit };

    const response = await axios.post(`/api/Question/${id}`, body);
    checking(false);
    if (limit !== 2) setY(true);

    const endTime = Date.now();
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Calculate time in seconds
    setTimeTaken(timeTaken);
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
    "// Enter the code here \n#include<bits/stdc++.h>\nusing namespace std;\n\nint main()\n{\n\nreturn 0;\n}"
  );
  const [solve, setSolve] = useState([]);
  const [y, setY] = useState(false);
  const [language, setLanguage] = useState("cpp");
  const [running, setRunning] = useState(false);
  const [x, setX] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [error, setError] = useState(false);
  const [verdict, setVerdict] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);

  const modeMap = {
    cpp: "c_cpp",
    c: "c_cpp",
    py: "python",
    java: "java",
  };

  useEffect(() => {
    if (question) {
      setPass(0);
      setCode(
        "// Enter the code here \n#include<bits/stdc++.h>\nusing namespace std;\n\nint main()\n{\n\nreturn 0;\n}"
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
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="py">Python</option>
            <option value="java">Java</option>
          </select>
        </div>

        <div className="compiler">
          <AceEditor
            mode={modeMap[language]}
            theme="github" // specify the theme
            name="code-editor" // unique ID for the editor
            value={code}
            onChange={setCode}
            fontSize={14}
            width="100%"
            height="400px"
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </div>
      </div>
      <div className="buttons">
        <button
          type="button"
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
              setTimeTaken,
              language
            )
          }
        >
          {running ? <SpinnerMini /> : "Run"}
        </button>
        <button
          type="button"
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
              setTimeTaken,
              language
            )
          }
        >
          {submitting ? <SpinnerMini /> : "Submit"}
        </button>
      </div>
      {error && (
        <div className="c-Error">
          <strong>Compilation Error:</strong>
          <p className="c-error2">
            Check the possible syntax errors and try running it again.
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
            {correct && <div className="tick">✅</div>}
            {!correct && <div className="wrong">❌</div>}
          </div>
          <table className="verdict-table">
            <thead>
              <tr>
                <th className="heading">No. of Test Cases</th>
                <th>Test Cases Passed</th>
                <th>Verdict</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="heading">{question.testcases.length}</td>
                <td>{pass}</td>
                <td>
                  <strong>
                    {correct
                      ? "All Test Cases Passed ✅"
                      : "Test Cases Failed ❌ "}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
          {timeTaken && (
            <div className="time-taken">
              <p>
                <MdAccessTimeFilled /> Time Taken: {timeTaken} seconds
              </p>
            </div>
          )}
          {!correct && (
            <div className="info">
              <p>Your Program failed for 😔:</p>
              <p>Input:</p>
              <p className="failed-input">
              <pre>
          {question.testcases[
            solve.findIndex(item => item === false)
          ]?.input || "No failed test cases found"}
        </pre></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Question;
