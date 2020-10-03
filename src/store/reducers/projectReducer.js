const initState={
  projects: [
    {id: '1', title: 'Now or never', content: 'Blah Blah Blah Blah'},
    {id: '2', title: 'NOBO DIES', content: 'Blah Blah Blah Blah'},
    {id: '3', title: 'The reality is fake', content: 'Blah Blah Blah Blah'}
  ]
}

const projectReducer = (state=initState, action)=>{
  switch(action.type){
    case 'CREATE_PROJECT':
      console.log('created project', action.project)

  }
  return state
}

export default projectReducer
