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
