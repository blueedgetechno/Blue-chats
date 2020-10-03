export const createProject = (project)=>{
  return (dispatch, getState)=>{
    // make async call to db
    dispatch({type: 'CREATE_PROJECT', project})
  }
}
