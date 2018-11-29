import { contactInfoConstants } from "../constants";

const parlinfo = require("../contactinfo/contactinfo.json")
const parlParseURL = "uk.org.publicwhip/person/"

export const contactInfoActions = {
    getContactInfo
};

function getContactInfoBegin() {
    return { type: contactInfoConstants.BEGIN };
}

function getContactInfoSuccess(payload) {
    return { type: contactInfoConstants.SUCCESS, payload }
};

function getContactInfoError(error) {
    return {
        type: contactInfoConstants.FAILURE,
        payload: { error }
    }
};

function getContactInfo(id) {
    return dispatch => {
        dispatch(getContactInfoBegin());
        console.log(parlinfo)
        console.log(parlParseURL + id)
        console.log(parlinfo.persons.find(person => (parlParseURL + id) === person.identifiers.identifier))
        return parlinfo.persons.find(person => (parlParseURL + id) === person.identifiers.identifier);
    }
}
            // .then(json => {
            //     console.log('hi from getContactinfo')
            //     dispatch(getContactInfoSuccess(json.person));
            //     return 
    //         })
    //         .catch(error => dispatch(getContactInfoError(error)));
    // };