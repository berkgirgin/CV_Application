import { useState } from "react";

export { getNestedValue };

function getNestedValue(obj, path) {
  // Given the path = [0, 2, 0, "name"], this function will correctly map to currentCV[0][2][0]["name"].
  // it will return the value!!
  return path.reduce(
    (current, key) =>
      current && current[key] !== undefined ? current[key] : null,
    obj
  );
}

function InputField({ label, currentCV, pathToData, onChangeHandler }) {
  const fieldName = getNestedValue(currentCV, pathToData) || "";

  return (
    <>
      <label>
        {label} :&nbsp;
        <input
          type="text"
          value={fieldName}
          onChange={(e) => {
            onChangeHandler(e.target.value, pathToData);
          }}
        />
      </label>
    </>
  );
}

export default InputField;
