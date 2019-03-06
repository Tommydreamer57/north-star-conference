
export const extractSessionType = ({ sessiontype = '' } = {}) => `${
    sessiontype.slice(0, 1).toUpperCase()
    }${
    sessiontype.slice(1).toLowerCase()
    }`;

// export const 
