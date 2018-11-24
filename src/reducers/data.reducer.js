const initState = {}

const dataReducer = (state = initState, action) => {
switch (action.type) {
    case 'CREATE_PROJECT':
        console.log('create project', action.project);
        return state;
    default:
        return state;
};

export default dataReducer;