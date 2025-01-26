import { useState } from "react";

function CvDisplay({ lastSavedCV }) {
  const personalInfoArray = lastSavedCV[0][0];
  const educationArray = lastSavedCV[1];
  const educationElements = educationArray.map((entry, index) => {
    let isGreyedOut = !entry["isSaved"] ? true : false;

    return (
      <div
        key={entry.index}
        className={`education-entry ${isGreyedOut ? "greyed-out" : ""}`}
      >
        <div>School Name: {entry["schoolName"]}</div>
        <div>Title of Study: {entry["titleOfStudy"]}</div>
        <div>End Date: {entry["endDate"]}</div>
        <div>Start Date: {entry["startDate"]}</div>
      </div>
    );
  });

  return (
    <>
      <h3>your CV will be displayed below</h3>

      {/* add print button? */}

      <div className="cv-display">
        <div className="personal-info">
          <div>Name: {personalInfoArray["name"]}</div>
          <div>Email: {personalInfoArray["email"]}</div>
          <div>Phone: {personalInfoArray["phone"]}</div>
          <div>Location: {personalInfoArray["location"]}</div>
        </div>

        <div className="education-info-container">{educationElements}</div>
      </div>
    </>
  );
}

export default CvDisplay;
