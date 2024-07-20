import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between title and difficulty box */
  padding: 1rem 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
  }
`;

const QuestionTitle = styled(Link)`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
`;

const DifficultyBox = styled.div`
  display: inline-block;
  width: 60px;
  height: 20px;
  border-radius: 5px;
  color: white;
  font-size: 0.9rem;
  text-align: center;
  line-height: 20px;
  background-color: ${(props) => {
    switch (props.$level) {
      case "easy":
        return "#28a745";
      case "medium":
        return "#ffc107";
      case "hard":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  }};
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
`;

export default function QuestionRow({ question }) {
  return (
    <Row>
      <ContentWrapper>
        <QuestionTitle
          to={`/Question/${question._id}`}
          state={{
            id: question._id,
            title: question.title,
            description: question.description,
            testcases: question.testcases,
          }}
        >
          {question.title}
        </QuestionTitle>
      </ContentWrapper>
      <DifficultyBox $level={question.difficulty}>
        {question.difficulty.charAt(0).toUpperCase() +
          question.difficulty.slice(1)}
      </DifficultyBox>
    </Row>
  );
}
