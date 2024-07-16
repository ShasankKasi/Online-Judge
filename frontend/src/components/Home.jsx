// import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import Homebar from "./Homebar";
import { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import Table from "../ui/Table";
import QuestionRow from "./QuestionRow";
const capitalizeFirstLetter = (str) => {
  if (typeof str !== 'string' || str.length === 0) {
    return ''; 
  }

  return ", "+str.charAt(0).toUpperCase() + str.slice(1);
};

export default function Home() {
  const location = useLocation();
  // const navigate = useNavigate();
  const { email, name } = location.state || {};

  const [question, setQuestion] = useState([]);

  useEffect(() => {
    axios
      .get("/api/home")
      .then((res) => setQuestion(res.data));
  }, []);

  return (
    <div>
      <Homebar />
      <h1 style={{ textAlign: "center", marginBottom: "20px"}}>
        Welcome {capitalizeFirstLetter(name)}
      </h1>
      <>
        <Table columns="0.9fr 1.8fr 2.2fr 1fr 1fr 1fr 1fr">
           <Table.Body
          data={question}
          render={(item) => <QuestionRow question={item}/>}
        />
        </Table>
      </>
    </div>
  );
}
