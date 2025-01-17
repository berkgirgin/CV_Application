import { useState } from "react";
import InputField from "./InputField.jsx";

function PersonalInformation({
  currentCV,
  pathToData,
  onChangeHandler,
  toggleDisplay,
}) {
  let elementSelector =
    ".main-personalinformation-container > .inputs-container";

  return (
    <div className="main-personalinformation-container">
      <h3>Personal Info</h3>
      <button
        onClick={() => {
          toggleDisplay(elementSelector);
        }}
      >
        Toggle
      </button>

      <div className="inputs-container">
        <InputField
          label="Name"
          currentCV={currentCV}
          pathToData={[...pathToData, "name"]}
          onChangeHandler={onChangeHandler}
        />

        <InputField
          label="Email"
          currentCV={currentCV}
          pathToData={[...pathToData, "email"]}
          onChangeHandler={onChangeHandler}
        />

        <InputField
          label="Phone"
          currentCV={currentCV}
          pathToData={[...pathToData, "phone"]}
          onChangeHandler={onChangeHandler}
        />

        <InputField
          label="Location"
          currentCV={currentCV}
          pathToData={[...pathToData, "location"]}
          onChangeHandler={onChangeHandler}
        />
      </div>
    </div>
  );
}

export default PersonalInformation;
