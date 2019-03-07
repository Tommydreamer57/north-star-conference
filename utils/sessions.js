
export const extractSessionType = ({ sessiontype = '' } = {}) => `${
    sessiontype.slice(0, 1).toUpperCase()
    }${
    sessiontype.slice(1).toLowerCase()
    }`;

export const isKeynote = ({ sessiontype = '' } = {}) => sessiontype.match(/keynote/i);

export const extractSessionDay = ({ sessiontype = '' } = {}) => isKeynote({ sessiontype }) ?
    sessiontype.replace(/\D/g, '') < 2.5 ?
        'Friday'
        :
        'Saturday'
    :
    sessiontype.replace(/\D/g, '') < 3.5 ?
        'Friday'
        :
        'Saturday';
