import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import ParamRow from "./components/ParamRow";
import { Param } from "./types";

function App() {
  const [params, setParams] = useState<Param[]>([]);

  // Load params from localStorage when the app first loads
  useEffect(() => {
    const savedParams = localStorage.getItem("params");
    if (savedParams) {
      setParams(JSON.parse(savedParams));
    }
  }, []);

  // Save params to localStorage whenever params change
  useEffect(() => {
    localStorage.setItem("params", JSON.stringify(params));
  }, [params]);

  const handleInputChange = (id: string, field: "key" | "value", value: string) => {
    setParams((prevParams) =>
      prevParams.map((param) =>
        param.id === id ? { ...param, [field]: value } : param
      )
    );
  };

  const handleAddParam = () => {
    setParams((prevParams) => [
      ...prevParams,
      { id: uuidv4(), key: "", value: "", selected: false },
    ]);
  };

  const handleDeleteParam = (id: string) => {
    const param = params.find((param) => param.id === id);
    if (
      param &&
      window.confirm(
        `Are you sure you want to delete parameter with key: ${
          param.key !== "" ? param.key : "blank"
        } and value: ${param.value !== "" ? param.value : "blank"}?`
      )
    ) {
      setParams((prevParams) => prevParams.filter((param) => param.id !== id));
    }
  };

  const handleKeyPress = (id: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const param = params.find((param) => param.id === id);
      if (param && param.key && param.value) {
        setParams((prevParams) =>
          prevParams.map((param) =>
            param.id === id ? { ...param, selected: true } : param
          )
        );
      }
    }
  };

  const handleCheckboxChange = (id: string) => {
    setParams((prevParams) =>
      prevParams.map((param) =>
        param.id === id ? { ...param, selected: !param.selected } : param
      )
    );
  };

  return (
    <div>
      <h1>URL Parameters Manager</h1>
      <div className="params-container">
        {params.map((param) => (
          <ParamRow
            key={param.id}
            id={param.id}
            keyValue={param.key}
            value={param.value}
            selected={param.selected}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onCheckboxChange={handleCheckboxChange}
            onDelete={handleDeleteParam}
          />
        ))}
      </div>
      <button onClick={handleAddParam} className="add-button">
        Add Parameter
      </button>
    </div>
  );
}

export default App;
