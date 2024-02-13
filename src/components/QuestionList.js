import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
  }, []);

  const onDeleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };


  const onUpdateCorrectAnswer = (id, newCorrectIndex) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => (question.id === id ? { ...question, correctIndex: newCorrectIndex } : question))
    );
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDeleteQuestion={onDeleteQuestion}
            onUpdateCorrectAnswer={onUpdateCorrectAnswer}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;