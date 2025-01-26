import { useState, createContext } from "react";

import PersonalInformation from "./components/PersonalInformation.jsx";
import Education from "./components/Education.jsx";
import CvDisplay from "./components/CvDisplay.jsx";
import example_CV_Database from "./components/exampleCV.jsx";

import { getNestedValue } from "./components/InputField.jsx";

/*
interimCV so that things are only saved when save button clicked?
it also helps revert?

so logic pseudo code:
everything gets the interim CV and displays it
OTHER THAN the CV Display, which shows the saved one

exclude unSaved changes from currentCV to lastSavedCV?


ADD
  adds an entry to currentCV as unSaved
  updates currentCV, not lastSavedCV
EDIT
  makes the selected entry unSaved
  updates currentCV, not lastSavedCV
DELETE
!!! NEEDS edit > what happens to differences between currentCV AND lastSavedCV
  deleted the selected entry
  updates currentCV AND lastSavedCV
SAVE
  makes the selected entry Saved

  if it is added entry(so last on index), that does not exist yet on lastSavedCV
  
  if it is edited entry(NOT last on index), u can simply override


  updates currentCV(make selected entry Saved) AND lastSavedCV(override with selected entry)
  exclude unSaved changes from currentCV to lastSavedCV?
CANCEL

  if it is added entry, that does not exist yet on lastSavedCV. Simply delete on currentCV
  >> how to differ added entry vs editing the last entry 
  >> currentInputIndex exists > so if pointerSavedCV[currentInputIndex] == null, entry is being added
  
  if it is edited entry, u can simply override currentCV with lastSavedCV entry


  makes the selected entry Saved

  take the selected entry from lastSavedCV and overwrite on currentCV
  updates currentCV(to override selected entry) AND lastSavedCV(to make entry saved)
  exclude unSaved changes from currentCV to lastSavedCV?
*/

function App() {
  const exampleCV = example_CV_Database;
  const [currentCV, setCurrentCV] = useState(exampleCV);
  const [lastSavedCV, setLastSavedCV] = useState(structuredClone(currentCV));

  // this may need editing after a second Education component, maybe a path?
  const [currentInputIndex, setCurrentInputIndex] = useState(0);

  function handleInput(updatedValue, pathToData, isSaved) {
    const updatedCV = { ...currentCV };
    let pointer = updatedCV;

    for (let i = 0; i < pathToData.length - 1; i++) {
      pointer = pointer[pathToData[i]];
    }

    pointer[pathToData[pathToData.length - 1]] = updatedValue;

    setCurrentCV(updatedCV);
  }

  // function reIndexEntries(arrayOfObjects) {
  //   for (let i = 0; i < arrayOfObjects.length; i++) {
  //     arrayOfObjects[i]["index"] = i;
  //   }

  //   setCurrentInputIndex(0);
  // }

  function toggleDisplayOn(elementSelector) {
    const element = document.querySelector(elementSelector);
    element.style.display = "flex"; // Show the element
  }
  function toggleDisplayOff(elementSelector) {
    const element = document.querySelector(elementSelector);
    element.style.display = "none"; // Hide the element
  }

  function toggleDisplay(elementSelector) {
    const element = document.querySelector(elementSelector);

    if (element.style.display === "none") {
      element.style.display = "flex"; // Show the element
    } else {
      element.style.display = "none"; // Hide the element
    }
  }

  function deleteEntryHandler(_pathToData) {
    const updatedCV = { ...currentCV };
    let pointer = updatedCV;

    // _pathToData is [1, index] for Education(input is adjusted)
    // this gets to the desired object
    for (let i = 0; i < _pathToData.length - 1; i++) {
      pointer = pointer[_pathToData[i]];
    }

    const updatedSavedCV = { ...lastSavedCV };
    let pointerSavedCV = updatedSavedCV;
    // _pathToData is [1, index] for Education(input is adjusted)
    // this gets to the desired object
    for (let i = 0; i < _pathToData.length - 1; i++) {
      pointerSavedCV = pointerSavedCV[_pathToData[i]];
    }

    const indexToDelete = _pathToData[_pathToData.length - 1];

    /*
    if it is added entry(not All last on index, could also be editing), that does not exist yet on lastSavedCV, so target is null. Delete only on currentCV
  
    if it is edited entry, u can simply delete both on currentCV and lastSavedCV
   */

    const objTarget = pointerSavedCV[currentInputIndex];
    if (objTarget !== undefined) {
      pointerSavedCV.splice(indexToDelete, 1);
      setLastSavedCV(updatedSavedCV);
    }

    pointer.splice(indexToDelete, 1);
    setCurrentCV(updatedCV);
  }

  function editButtonHandler(_pathToData, elementSelector) {
    /*
    toggle on the input fields 
    according to the given index(goes as input), get the selected Entry
    fill the input fields with the given entry's values
    */
    toggleDisplayOn(elementSelector);

    // fix it: editing a isSaved entry directly edits(without save)

    const updatedCV = { ...currentCV };
    let pointer = updatedCV;

    // _pathToData is [1, index] for Education
    // this gets to the desired object(input is adjusted)
    for (let i = 0; i < _pathToData.length; i++) {
      pointer = pointer[_pathToData[i]];
      // console.log(pointer);
    }

    const updatedSavedCV = { ...lastSavedCV };
    let pointerSavedCV = updatedSavedCV;

    // _pathToData is [1, index] for Education
    // this gets to the desired object(input is adjusted)
    for (let i = 0; i < _pathToData.length; i++) {
      pointerSavedCV = pointerSavedCV[_pathToData[i]];
    }

    // console.log(pointer);
    // console.log(pointerSavedCV);
    pointer["isSaved"] = false;
    // console.log(pointer);
    // console.log(pointerSavedCV);

    const indexOfObject = _pathToData[_pathToData.length - 1];

    setCurrentInputIndex(indexOfObject);
    setCurrentCV(updatedCV);
  }

  function addButtonHandler(_pathToData, elementSelector) {
    /* 
    toggle on the input fields 
    */
    /*
    this can use the existing pathToData for Education
    add to the end a new object with empty strings(isSaved=false), 
    -so that inputs can function
    set the setCurrentInputIndex() to that

    add an isSaved boolean to all entries
    check all entries if there isSaved=false, delete them(inc. the last one)


    ?? do we need to edit CV Display to exclude empty entries?
    
    grey out respective edit/delete buttons, enable when saved?
    maybe add a ... icon to show it is being edited?
    */

    toggleDisplayOn(elementSelector);

    const updatedCV = { ...currentCV };
    let pointer = updatedCV;

    // _pathToData is [1] for Education
    // this gets to the desired array of objects
    for (let i = 0; i < _pathToData.length; i++) {
      pointer = pointer[_pathToData[i]];
    }

    if (pointer[pointer.length - 1]["isSaved"] === false) {
      console.log("cant add more, there is already a pending one");
      return;
    }
    // add an animation for this, maybe a short red border?

    let newEntryIndex = pointer.length;
    let newEntry = {
      index: newEntryIndex,
      isSaved: false,

      schoolName: "x", // remove the x
      titleOfStudy: "",
      startDate: "",
      endDate: "",
    };

    pointer.push(newEntry);
    setCurrentInputIndex(newEntryIndex);
    setCurrentCV(updatedCV);
  }

  function saveButtonHandler(_pathToData, elementSelector) {
    /*
    toggle off the input fields 
     */
    /*
    this can use the existing pathToData for Education
    check last entry > if isSaved=false, make it true

    set the setCurrentInputIndex() to 0 ?
    */

    const updatedCV = { ...currentCV };
    let pointer = updatedCV;

    // _pathToData is [1] for Education
    // this gets to the desired array of objects
    for (let i = 0; i < _pathToData.length; i++) {
      pointer = pointer[_pathToData[i]];
    }

    const updatedSavedCV = { ...lastSavedCV };
    let pointerSavedCV = updatedSavedCV;
    // _pathToData is [1] for Education
    // this gets to the desired array of objects
    for (let i = 0; i < _pathToData.length; i++) {
      pointerSavedCV = pointerSavedCV[_pathToData[i]];
    }

    pointer[currentInputIndex]["isSaved"] = true;

    /*
    if it is added entry(so last on index), that does not exist yet on lastSavedCV, so target is null
  
    if it is edited entry(NOT last on index), u can simply override
   */

    const objTarget = pointerSavedCV[currentInputIndex];
    const objSource = structuredClone(pointer[currentInputIndex]);
    // console.log(objTarget);
    // console.log(objSource);

    if (objTarget == null) {
      pointerSavedCV.push(objSource);
    } else {
      Object.assign(objTarget, objSource);
    }

    setCurrentInputIndex(0);
    setCurrentCV(updatedCV);
    setLastSavedCV(updatedSavedCV);
    toggleDisplayOff(elementSelector);
  }

  function cancelButtonHandler(_pathToData, elementSelector) {
    /*
    toggle off the input fields 
     */
    /*
    this can use the existing pathToData for Education
    check last entry > if isSaved=false, delete it

    set the setCurrentInputIndex() to 0 ?
    */

    const updatedCV = { ...currentCV };
    let pointer = updatedCV;

    // _pathToData is [1] for Education
    // this gets to the desired array of objects
    for (let i = 0; i < _pathToData.length; i++) {
      pointer = pointer[_pathToData[i]];
    }

    pointer[currentInputIndex]["isSaved"] = true;

    const updatedSavedCV = { ...lastSavedCV };
    let pointerSavedCV = updatedSavedCV;
    // _pathToData is [1] for Education
    // this gets to the desired array of objects
    for (let i = 0; i < _pathToData.length; i++) {
      pointerSavedCV = pointerSavedCV[_pathToData[i]];
    }

    const objTarget = pointer[currentInputIndex];
    const objSource = structuredClone(pointerSavedCV[currentInputIndex]);
    // console.log(objTarget);
    // console.log(objSource);

    if (objSource == null) {
      pointer.pop();
    } else {
      Object.assign(objTarget, objSource);
    }

    setCurrentInputIndex(0);
    setCurrentCV(updatedCV);
    setLastSavedCV(updatedSavedCV);
    toggleDisplayOff(elementSelector);
  }

  return (
    <>
      <div className="main-container">
        <h1>CV GENERATOR </h1>
        {/* <div>unsaved status to be added</div> */}

        <div className="main-sidebar-container">
          <PersonalInformation
            currentCV={currentCV}
            pathToData={[0, 0]}
            onChangeHandler={handleInput}
            toggleDisplay={toggleDisplay}
          />
          <Education
            currentCV={currentCV}
            currentInputIndex={currentInputIndex}
            pathToData={[1]}
            onChangeHandler={handleInput}
            toggleDisplay={toggleDisplay}
            deleteEntryHandler={deleteEntryHandler}
            addButtonHandler={addButtonHandler}
            saveButtonHandler={saveButtonHandler}
            cancelButtonHandler={cancelButtonHandler}
            editButtonHandler={editButtonHandler}
          />
        </div>

        <div className="main-cv-display-container">
          <CvDisplay lastSavedCV={lastSavedCV} />
        </div>
      </div>
    </>
  );
}

export default App;
