import React from "react";

export default function Compiler() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    const body = {
      language: "cpp",
      code,
    };

    try {
      const { data } = await axios.post("http://localhost:5000/Question1/run", body);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="container">
      <h1 className="heading">CodeIt - Online Code Compiler</h1>

      <textarea
        rows="20"
        cols="75"
        className="textarea"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>

      <br />

      <button className="submit-button" onClick={handleSubmit}>
        Submit
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
  );
}
