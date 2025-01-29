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
function Experience({
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
  let elementSelector = ".main-experience-container > .inputs-container";
  let displayContainerSelector =
    ".main-experience-container > .display-container";

  const entriesToDisplay = currentCV[pathToData[0]].map((entry, _index) => {
    return (
      <div key={entry.index} className="experience-entry entry">
        <div className="experience-positionTitle-and-companyName sub-entry">
          <div>
            {entry.positionTitle} at {entry.companyName}
          </div>
        </div>

        {/* <div className="experience-companyName sub-entry">
          <div>Company Name: {entry.companyName}</div>
        </div>

        <div className="experience-positionTitle sub-entry">
          <div>Position Title: {entry.positionTitle}</div>
        </div> */}

        <div className="experience-responsibility sub-entry">
          <div>
            <span>Responsibilities: </span>
            {entry.responsibility}
          </div>
        </div>

        <div className="experience-dates sub-entry">
          <div>
            {entry.startDate} - {entry.endDate}
          </div>
        </div>

        {/* <div className="experience-startDate sub-entry">
          <div>Start Date: {entry.startDate}</div>
        </div>

        <div className="experience-endDate sub-entry">
          <div>End Date: {entry.endDate}</div>
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
      <div className="main-experience-container sidebar-container">
        <div className="title-container">
          <div className="subpage-title">Experience</div>
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
            label="Company Name"
            currentCV={currentCV}
            pathToData={[...pathToData, currentInputIndex, "companyName"]}
            onChangeHandler={onChangeHandler}
          />
          <InputField
            label="Position Title"
            currentCV={currentCV}
            pathToData={[...pathToData, currentInputIndex, "positionTitle"]}
            onChangeHandler={onChangeHandler}
          />
          <InputField
            label="Responsibility"
            currentCV={currentCV}
            pathToData={[...pathToData, currentInputIndex, "responsibility"]}
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

export default Experience;
