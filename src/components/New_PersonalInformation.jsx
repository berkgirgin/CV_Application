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
function New_PersonalInformation({
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
  let elementSelector =
    ".main-personal-information-container > .inputs-container";

  let displayContainerSelector =
    ".main-personal-information-container > .display-container";

  const entriesToDisplay = currentCV[pathToData[0]].map((entry, _index) => {
    return (
      <div key={entry.index} className="personal-information-entry entry">
        <div className="personal-information-name sub-entry">
          <div>
            <span>Name: </span>
            {entry.name}
          </div>
        </div>

        <div className="personal-information-email sub-entry">
          <div>
            <span>Email: </span>
            {entry.email}
          </div>
        </div>

        <div className="personal-information-phone sub-entry">
          <div>
            <span>Phone: </span>
            {entry.phone}
          </div>
        </div>

        <div className="personal-information-location sub-entry">
          <div>
            <span>Location: </span>
            {entry.location}
          </div>
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
          {/* <button
            onClick={() => {
              deleteEntryHandler([...pathToData, _index]);
            }}
          >
            Delete
          </button> */}
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="main-personal-information-container sidebar-container">
        <div className="title-container">
          <div className="subpage-title">Personal Information</div>
          {/* <button
            onClick={() => {
              addButtonHandler(pathToData, elementSelector);
            }}
          >
            Add
          </button> */}
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
            label="Name"
            currentCV={currentCV}
            pathToData={[...pathToData, currentInputIndex, "name"]}
            onChangeHandler={onChangeHandler}
          />
          <InputField
            label="Email"
            currentCV={currentCV}
            pathToData={[...pathToData, currentInputIndex, "email"]}
            onChangeHandler={onChangeHandler}
          />
          <InputField
            label="Phone"
            currentCV={currentCV}
            pathToData={[...pathToData, currentInputIndex, "phone"]}
            onChangeHandler={onChangeHandler}
          />
          <InputField
            label="Location"
            currentCV={currentCV}
            pathToData={[...pathToData, currentInputIndex, "location"]}
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

export default New_PersonalInformation;
