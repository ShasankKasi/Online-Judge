// import Navbar from "./Navbar";
import { useLocation, Link } from "react-router-dom";
import Homebar from "./Homebar";
import { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
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
      .get("/home")
      .then((res) => setQuestion(res.data));
  }, []);

  return (
    <div>
      <Homebar />
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Welcome {capitalizeFirstLetter(name)}
      </h1>
      <div>
        <ul>
          {question.map((item) => (
            <li key={item._id}>
              <div>
                <Link
                  to={`/Question/${item._id}`}
                  state={{ id:item._id,title:item.title,description:item.description,testcases:item.testcases}}
                  className="titles"
                >
                  <strong>{item.title}</strong>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
