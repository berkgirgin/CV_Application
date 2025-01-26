import { useState } from "react";
import InputField from "./InputField.jsx";
import { getNestedValue } from "./InputField.jsx";

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

  // currentCV[1] can be made with a variable, so that it can be used for "Experience"
  const entriesToDisplay = currentCV[1].map((entry, _index) => {
    return (
      <div key={entry.index} className="education-entry">
        <div className="education-schoolName">
          <div>School Name: {entry.schoolName}</div>
        </div>

        <div className="education-titleOfStudy">
          <div>Title of Study: {entry.titleOfStudy}</div>
        </div>

        <div className="education-endDate">
          <div>End Date: {entry.endDate}</div>
        </div>

        <div className="education-startDate">
          <div>Start Date: {entry.startDate}</div>
        </div>

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
      <div className="main-education-container">
        <div className="title-container">
          <h3>Education</h3>
          <button
            onClick={() => {
              addButtonHandler(pathToData, elementSelector);
            }}
          >
            Add
          </button>
          <button
            onClick={() => {
              toggleDisplay(elementSelector);
            }}
          >
            Toggle
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
