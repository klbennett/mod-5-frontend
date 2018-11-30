import { contactInfoConstants } from "../constants";
import { alertActions } from ".";

const parlinfo = require("../parlinfo/parlinfo.json")

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
        dispatch(getContactInfoBegin())
        let foundSpeaker = parlinfo.persons.find(x => x.identifiers.some(y => y.identifier.includes('uk.org.publicwhip/person/' + id)))
                dispatch(getContactInfoSuccess(foundSpeaker))
            // error => {
            //     dispatch(alertActions.error('could not find contact information'));
            //     dispatch(getContactInfoError(error))
            //     }
    }
}
            // .then(json => {
            //     console.log('hi from getContactinfo')
            //     dispatch(getContactInfoSuccess(json.person));
            //     return 
    //         })
    //         .catch(error => dispatch(getContactInfoError(error)));
    // };