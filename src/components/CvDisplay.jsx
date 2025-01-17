import { useState } from "react";

function CvDisplay({ currentCV }) {
  const educationArray = currentCV[1];
  const educationElements = educationArray.map((entry, index) => {
    // {
    //   //error statements
    //   if (entry["isSaved"] === null || entry["isSaved"] === undefined) {
    //     throw new Error("isSaved is null or undefined");
    //   }
    //   if (!entry["isSaved"]) {
    //     return;
    //   }
    // }

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
      <h3>your CV will be display below</h3>

      <div className="cv-display">
        <div className="personal-info">
          <div>Name: {currentCV[0][0]["name"]}</div>
          <div>Email: {currentCV[0][0]["email"]}</div>
          <div>Phone: {currentCV[0][0]["phone"]}</div>
          <div>Location: {currentCV[0][0]["location"]}</div>
        </div>

        <div className="education-info-container">
          {/* <div>School Name: {currentCV[1][0]["schoolName"]}</div>
          <div>Title of Study: {currentCV[1][0]["titleOfStudy"]}</div>
          <div>End Date: {currentCV[1][0]["endDate"]}</div>
          <div>Start Date: {currentCV[1][0]["startDate"]}</div> */}
          {educationElements}
        </div>
      </div>
    </>
  );
}

export default CvDisplay;
