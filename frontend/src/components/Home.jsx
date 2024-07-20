import React, { useState } from "react";
import Homebar from "./Homebar";
import "./Home.css";
import axios from "axios";
import Table from "../ui/Table";
import QuestionRow from "./QuestionRow";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";

export default function Home() {
  const [difficulty, setDifficulty] = useState("all");
  const queryClient = useQueryClient();

  const fetchQuestions = async (difficulty) => {
    const response = await axios.get("/api/home", {
      params: { difficulty },
    });
    return response.data;
  };

  const { data: questions = [], isLoading, error } = useQuery({
    queryKey: ["questions", difficulty],
    queryFn: () => fetchQuestions(difficulty),
    refetchOnWindowFocus: false,
  });

  const { data: cachedUser } = useQuery({
    queryKey: ["user"],
    queryFn: () => Promise.resolve({ name: "Guest" }),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const handleFilterChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    queryClient.invalidateQueries(["questions"]);
  };

  return (
    <div>
      <Homebar />
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          textTransform: "capitalize",
        }}
      >
        Welcome {cachedUser?.name}
      </h1>

      <div className="filter-container">
        <button
          className={`all ${difficulty === "all" ? "active all" : ""}`}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          className={`easy ${difficulty === "easy" ? "active easy" : ""}`}
          onClick={() => handleFilterChange("easy")}
        >
          Easy
        </button>
        <button
          className={`medium ${difficulty === "medium" ? "active medium" : ""}`}
          onClick={() => handleFilterChange("medium")}
        >
          Medium
        </button>
        <button
          className={`hard ${difficulty === "hard" ? "active hard" : ""}`}
          onClick={() => handleFilterChange("hard")}
        >
          Hard
        </button>
      </div>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Table columns="0.9fr 1.8fr 2.2fr 1fr 1fr 1fr 1fr">
          <Table.Body
            data={questions}
            render={(item) => <QuestionRow question={item} key={item.id} />}
          />
        </Table>
      )}
    </div>
  );
}
