import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import axios from "axios";
import sass from "../styles/style.scss";
import dice from "../project_info/images/icon-dice.svg";

const App = () => {
  const [advice, setAdvice] = useState(null);
  const [adviceNumber, setAdviceNumber] = useState(null);

  const getData = async () => {
    const { data } = await axios.get("https://api.adviceslip.com/advice");
    setAdvice(data.slip.advice);
    setAdviceNumber(data.slip.id);
  };

  useEffect(() => {
    getData();
  }, []);

  let number;

  const parseNumber = () => {
    if (adviceNumber < 10) {
      return (number = `00${adviceNumber}`);
    } else if (adviceNumber > 10 && adviceNumber < 100) {
      return (number = `0${adviceNumber}`);
    } else return (number = adviceNumber);
  };

  return (
    <div className="container">
      <main className="advice__container">
        <h5 className="advice-title">
          Advice <span className="advice-number">#{parseNumber()}</span>
        </h5>
        <h1 className="advice-content">“{advice}”</h1>
        <div className="divider__container"></div>
        <a className="get-advice-btn" onClick={() => getData()}>
          <img src={dice} alt="dice" className="dice" />
        </a>
      </main>
      <Footer />
    </div>
  );
};

export default App;
