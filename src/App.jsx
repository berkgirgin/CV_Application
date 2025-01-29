import { useState, createContext } from "react";

import PersonalInformation from "./components/PersonalInformation.jsx";
import New_PersonalInformation from "./components/New_PersonalInformation.jsx";
import Education from "./components/Education.jsx";
import Experience from "./components/Experience.jsx";
import CvDisplay from "./components/CVDisplay.jsx";
import example_CV_Database from "./components/exampleCV.jsx";

// import { getNestedValue } from "./components/InputField.jsx";

function App() {
  const exampleCV = example_CV_Database;
  const [currentCV, setCurrentCV] = useState(exampleCV);
  const [lastSavedCV, setLastSavedCV] = useState(structuredClone(currentCV));

  // this may need editing after a second Education component, maybe a path?
  // const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [currentInputIndexes, setCurrentInputIndexes] = useState({
    personalInformation: 0,
    education: 0,
    experience: 0,
  });

  function handleInput(updatedValue, pathToData, isSaved) {
    const updatedCV = { ...currentCV };
    let pointer = updatedCV;

    for (let i = 0; i < pathToData.length - 1; i++) {
      pointer = pointer[pathToData[i]];
    }

    pointer[pathToData[pathToData.length - 1]] = updatedValue;

    setCurrentCV(updatedCV);
  }

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

    if (element.style.display !== "none") {
      element.style.display = "none"; // Show the element
    } else {
      element.style.display = "flex"; // Hide the element
    }
  }

  function deleteEntryHandler(componentKey, _pathToData) {
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

    const objTarget = pointerSavedCV[currentInputIndexes[componentKey]];
    if (objTarget !== undefined) {
      pointerSavedCV.splice(indexToDelete, 1);
      setLastSavedCV(updatedSavedCV);
    }

    pointer.splice(indexToDelete, 1);
    setCurrentCV(updatedCV);
  }

  function editButtonHandler(componentKey, _pathToData, elementSelector) {
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

    pointer["isSaved"] = false;

    const indexOfObject = _pathToData[_pathToData.length - 1];

    // setCurrentInputIndex(indexOfObject);
    setCurrentInputIndexes((prev) => {
      return {
        ...prev,
        [componentKey]: indexOfObject, // Update index for this component
      };
    });
    setCurrentCV(updatedCV);
  }

  function addButtonHandler(componentKey, _pathToData, elementSelector) {
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

      schoolName: "", // remove the x
      titleOfStudy: "",
      startDate: "",
      endDate: "",
    };

    pointer.push(newEntry);
    // setCurrentInputIndex(newEntryIndex);
    setCurrentInputIndexes((prev) => {
      return {
        ...prev,
        [componentKey]: newEntryIndex, // Update index for this component
      };
    });
    setCurrentCV(updatedCV);
  }

  function saveButtonHandler(componentKey, _pathToData, elementSelector) {
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

    pointer[currentInputIndexes[componentKey]]["isSaved"] = true;

    /*
    if it is added entry(so last on index), that does not exist yet on lastSavedCV, so target is null
  
    if it is edited entry(NOT last on index), u can simply override
   */

    const objTarget = pointerSavedCV[currentInputIndexes[componentKey]];
    const objSource = structuredClone(
      pointer[currentInputIndexes[componentKey]]
    );
    // console.log(objTarget);
    // console.log(objSource);

    if (objTarget == null) {
      pointerSavedCV.push(objSource);
    } else {
      Object.assign(objTarget, objSource);
    }

    // setCurrentInputIndex(0);
    setCurrentInputIndexes((prev) => {
      return {
        ...prev,
        [componentKey]: 0, // Update index for this component
      };
    });
    setCurrentCV(updatedCV);
    setLastSavedCV(updatedSavedCV);
    toggleDisplayOff(elementSelector);
  }

  function cancelButtonHandler(componentKey, _pathToData, elementSelector) {
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

    pointer[currentInputIndexes[componentKey]]["isSaved"] = true;

    const updatedSavedCV = { ...lastSavedCV };
    let pointerSavedCV = updatedSavedCV;
    // _pathToData is [1] for Education
    // this gets to the desired array of objects
    for (let i = 0; i < _pathToData.length; i++) {
      pointerSavedCV = pointerSavedCV[_pathToData[i]];
    }

    const objTarget = pointer[currentInputIndexes[componentKey]];
    const objSource = structuredClone(
      pointerSavedCV[currentInputIndexes[componentKey]]
    );
    // console.log(objTarget);
    // console.log(objSource);

    if (objSource == null) {
      pointer.pop();
    } else {
      Object.assign(objTarget, objSource);
    }

    // setCurrentInputIndex(0);
    setCurrentInputIndexes((prev) => {
      return {
        ...prev,
        [componentKey]: 0, // Update index for this component
      };
    });
    setCurrentCV(updatedCV);
    setLastSavedCV(updatedSavedCV);
    toggleDisplayOff(elementSelector);
  }

  return (
    <>
      <div className="main-container">
        <header className="main-header-container">
          <div className="page-title">CV GENERATOR</div>
        </header>
        {/* <div>unsaved status to be added</div> */}

        <div className="main-sidebar-container">
          <New_PersonalInformation
            currentCV={currentCV}
            currentInputIndex={currentInputIndexes["personalInformation"]}
            pathToData={[0]}
            onChangeHandler={handleInput}
            toggleDisplay={toggleDisplay}
            deleteEntryHandler={(...args) =>
              deleteEntryHandler("personalInformation", ...args)
            }
            addButtonHandler={(...args) =>
              addButtonHandler("personalInformation", ...args)
            }
            saveButtonHandler={(...args) =>
              saveButtonHandler("personalInformation", ...args)
            }
            cancelButtonHandler={(...args) =>
              cancelButtonHandler("personalInformation", ...args)
            }
            editButtonHandler={(...args) =>
              editButtonHandler("personalInformation", ...args)
            }
          />
          <Education
            currentCV={currentCV}
            currentInputIndex={currentInputIndexes["education"]}
            pathToData={[1]}
            onChangeHandler={handleInput}
            toggleDisplay={toggleDisplay}
            deleteEntryHandler={(...args) =>
              deleteEntryHandler("education", ...args)
            }
            addButtonHandler={(...args) =>
              addButtonHandler("education", ...args)
            }
            saveButtonHandler={(...args) =>
              saveButtonHandler("education", ...args)
            }
            cancelButtonHandler={(...args) =>
              cancelButtonHandler("education", ...args)
            }
            editButtonHandler={(...args) =>
              editButtonHandler("education", ...args)
            }
          />
          <Experience
            currentCV={currentCV}
            currentInputIndex={currentInputIndexes["experience"]}
            pathToData={[2]}
            onChangeHandler={handleInput}
            toggleDisplay={toggleDisplay}
            deleteEntryHandler={(...args) =>
              deleteEntryHandler("experience", ...args)
            }
            addButtonHandler={(...args) =>
              addButtonHandler("experience", ...args)
            }
            saveButtonHandler={(...args) =>
              saveButtonHandler("experience", ...args)
            }
            cancelButtonHandler={(...args) =>
              cancelButtonHandler("experience", ...args)
            }
            editButtonHandler={(...args) =>
              editButtonHandler("experience", ...args)
            }
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
