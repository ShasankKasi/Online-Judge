import styled from "styled-components";
import { Link } from "react-router-dom";

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Center content horizontally */
  padding: 1rem 2rem;
  background-color: #f9f9f9; /* Lighter background color */
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #e9ecef; /* Slightly darker background on hover */
    transform: translateY(-2px); /* Lift on hover */
  }
`;

const QuestionTitle = styled(Link)`
  font-size: 1.6rem;
  font-weight: bold;
  color: #333; /* Darker text color */
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #007bff; /* Blue color on hover */
  }
`;

export default function QuestionRow({ question }) {
  return (
    <Row>
      <QuestionTitle
        to={`/Question/${question._id}`}
        state={{
          id: question._id,
          title: question.title,
          description: question.description,
          testcases: question.testcases
        }}
        className="titles"
      >
        {question.title}
      </QuestionTitle>
    </Row>
  );
}
