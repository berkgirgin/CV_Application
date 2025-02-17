import { useState } from "react";
import InputField from "./InputField.jsx";
import { getNestedValue } from "./InputField.jsx";
import addIcon from "../assets/icons/add_icon.png";
import circleArrowIcon from "../assets/icons/circle_arrow_icon.png";
/*
when save/cancel buttons are active or seen, disable other options?

as i can't NOT change the CV,
I can simply grey out currently edited fields in display CV?
*/
function Education({
  currentCV,
  currentInputIndex,
  pathToData,
  onChangeHandler,
  toggleDisplay,
  deleteEntryHandler,
  addButtonHandler,
  saveButtonHandler,
  cancelButtonHandler,
  editButtonHandler,
}) {
  // important for toggles
  let elementSelector = ".main-education-container > .inputs-container";
  let displayContainerSelector =
    ".main-education-container > .display-container";

  const entriesToDisplay = currentCV[pathToData[0]].map((entry, _index) => {
    return (
      <div key={entry.index} className="education-entry entry">
        <div className="education-schoolName sub-entry">
          <div>{entry.schoolName}</div>
        </div>

        <div className="education-titleOfStudy sub-entry">
          <div>{entry.titleOfStudy}</div>
        </div>
        <div className="education-dates sub-entry">
          <div>
            {entry.startDate} - {entry.endDate}
          </div>
        </div>

        {/* <div className="education-endDate sub-entry">
          <div>End Date: {entry.endDate}</div>
        </div>

        <div className="education-startDate sub-entry">
          <div>Start Date: {entry.startDate}</div>
        </div> */}

        {/* adding a status if not saved */}
        {(() => {
          if (!entry["isSaved"]) {
            return <div className="saved-status">NOT SAVED</div>;
          }
        })()}

        <div className="edit-delete-buttons-container buttons-container">
          <button
            onClick={() => {
              editButtonHandler([...pathToData, _index], elementSelector);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteEntryHandler([...pathToData, _index]);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="main-education-container sidebar-container">
        <div className="title-container">
          <div className="subpage-title">Education</div>
          <button
            className="add_button button"
            onClick={() => {
              addButtonHandler(pathToData, elementSelector);
            }}
          >
            <img src={addIcon} alt="" />
          </button>
          <button
            className="toggle_button button"
            onClick={() => {
              toggleDisplay(displayContainerSelector);
            }}
          >
            <img src={circleArrowIcon} alt="" />
          </button>
        </div>

        <div className="inputs-container">
          <InputField
            label="School Name"
            currentCV={currentCV}
            pathToData={[...pathToData, currentInputIndex, "schoolName"]}
            onChangeHandler={onChangeHandler}
          />
          <InputField
            label="Title of Study"
            currentCV={currentCV}
            pathToData={[...pathToData, currentInputIndex, "titleOfStudy"]}
            onChangeHandler={onChangeHandler}
          />
          <InputField
            label="Start Date"
            currentCV={currentCV}
            pathToData={[...pathToData, currentInputIndex, "startDate"]}
            onChangeHandler={onChangeHandler}
          />
          <InputField
            label="End Date"
            currentCV={currentCV}
            pathToData={[...pathToData, currentInputIndex, "endDate"]}
            onChangeHandler={onChangeHandler}
          />

          <div className="save-cancel-buttons-container buttons-container">
            <button
              onClick={() => {
                saveButtonHandler(pathToData, elementSelector);
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                cancelButtonHandler(pathToData, elementSelector);
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="display-container">{entriesToDisplay}</div>
      </div>
    </>
  );
}

export default Education;
