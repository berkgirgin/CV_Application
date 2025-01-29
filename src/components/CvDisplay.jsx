import { useState } from "react";

function CvDisplay({ lastSavedCV }) {
  const personalInformationArray = lastSavedCV[0];
  const educationArray = lastSavedCV[1];
  const experienceArray = lastSavedCV[2];

  const personalInformationElements = personalInformationArray.map(
    (entry, index) => {
      let isGreyedOut = !entry["isSaved"] ? true : false;

      return (
        <div
          key={entry.index}
          className={`personal-information-entry entry ${
            isGreyedOut ? "greyed-out" : ""
          }`}
        >
          <div>{entry["name"]}</div>
          <div>
            {entry["email"]} &nbsp;| &nbsp;{entry["phone"]} &nbsp;|&nbsp;
            {entry["location"]}
          </div>
          {/* <div>Email: {entry["email"]}</div>
          <div>Phone: {entry["phone"]}</div>
          <div>Location: {entry["location"]}</div> */}
        </div>
      );
    }
  );

  const educationElements = educationArray.map((entry, index) => {
    let isGreyedOut = !entry["isSaved"] ? true : false;

    return (
      <div
        key={entry.index}
        className={`education-entry entry ${isGreyedOut ? "greyed-out" : ""}`}
      >
        <div>{entry["schoolName"]}</div>
        <div>{entry["titleOfStudy"]}</div>
        <div>
          {entry["startDate"]} - {entry["endDate"]}
        </div>
      </div>
    );
  });

  const experienceElements = experienceArray.map((entry, index) => {
    let isGreyedOut = !entry["isSaved"] ? true : false;

    return (
      <div
        key={entry.index}
        className={`experience-entry entry ${isGreyedOut ? "greyed-out" : ""}`}
      >
        <div>
          {entry["positionTitle"]} at {entry["companyName"]}
        </div>
        <div>{entry["responsibility"]}</div>
        <div>
          {entry["startDate"]} - {entry["endDate"]}
        </div>
      </div>
    );
  });

  return (
    <>
      <header className="header cv-display-header">
        <div>
          your <span>saved</span> CV will be displayed below
        </div>

        {/* add print button? */}
      </header>

      <div className="cv-display">
        <div className="personal-information-info-container">
          {personalInformationElements}
        </div>
        <div className="education-info-container">
          <div className="subpage-title">Education</div>
          {educationElements}
        </div>

        <div className="experience-info-container">
          <div className="subpage-title">Experience</div>
          {experienceElements}
        </div>
      </div>
    </>
  );
}

export default CvDisplay;
