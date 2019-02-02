import {
    AsyncStorage,
    Alert,
} from 'react-native';

import axios from 'axios';

// REMOVE THIS LINE
// (async () => {
//     try {
//         // await AsyncStorage.clear();
//         const keys = await AsyncStorage.getAllKeys();
//         console.log("Removing all keys");
//         console.log(keys);
//         await AsyncStorage.multiRemove(keys);
//         console.log("Done removing keys");
//     } catch (err) {
//         console.error(err);
//     }
// })();

(async () => {
    try {
        await axios.delete('http://192.168.0.43:4321/log');
    } catch (err) {
        console.error(err);
    }
})();

export const log = async body => {
    try {
        await axios.post('http://192.168.0.43:4321/log', body);
    } catch (err) {
        console.log(err);
    }
}



const allKeys = [
    "breakouts",
    "keynotes",
    "schedule",
    "speakers",
];

const validKeys = allKeys.reduce((keys, key) => ({ ...keys, [key]: key }), {});

export const fetchSessions = async () => {
    try {
        const { data } = await axios.get('https://northstarconferenceadmin.herokuapp.com/api/sessions');

        const keynotes = (data || [])
            .filter(({ sessiontype }) => sessiontype.match(/keynote/i))
            .sort(({ sessiontype: a }, { sessiontype: b }) => (
                a.replace(/keynote /i, '') > b.replace(/keynote /i, '')
            ))
            .map(({
                sessiontype,
                ...item
            }) => ({
                ...item,
                sessiontype: sessiontype.toUpperCase()
            }));

        // log({ keynotes })
        // console.log({ keynotes });

        const breakouts = (data || [])
            .filter(({ sessiontype }) => sessiontype.match(/breakout/i))
            .reduce((all, breakout) => {
                const key = breakout.sessiontype.toUpperCase();
                return {
                    ...all,
                    [key]: [...(all[key] || []), breakout]
                };
            }, {});

        // log({ breakouts });
        // console.log({ breakouts });

        const schedule = {
            ...Object.keys(breakouts)
                .reduce((all, key) => ({
                    ...all,
                    [key]: {},
                }), {}),
            ...keynotes
                .reduce((all, { sessiontype, ...session }) => ({
                    ...all,
                    [sessiontype.toUpperCase()]: session,
                }), {}),
        };

        // log({ schedule });
        // console.log({ schedule });

        const speakers = data.reduce((all, { id, speakername, speakerbio, speakerphoto }) => ({
            ...all,
            [speakername]: {
                ...all[speakername],
                name: speakername,
                bio: speakerbio,
                photo: speakerphoto,
                sessions: ((all[speakername] || {}).sessions || []).concat(id)
            },
        }), {});

        await AsyncStorage.multiSet([
            [validKeys.breakouts, JSON.stringify(breakouts)],
            [validKeys.keynotes, JSON.stringify(keynotes)],
            [validKeys.schedule, JSON.stringify(schedule)],
            [validKeys.speakers, JSON.stringify(speakers)],
        ]);

        return {
            keynotes,
            breakouts,
            schedule,
        };
    } catch (err) {
        console.error(err);
    }
}

export const getItem = async key => {
    if (allKeys.includes(key)) {
        try {
            const data = await AsyncStorage.getItem(key);
            if (data) {
                return JSON.parse(data);
            } else {
                const storedData = await fetchSessions();
                return storedData[key];
            }
        } catch (err) {
            console.error(err);
        }
    } else {
        throw new Error(`Invalid key: ${key}. Please use one of: ${allKeys.join(', ')}`);
    }
}

export const getItems = async (...keys) => {
    const invalidKey = keys.find(key => !allKeys.includes(key));
    if (invalidKey) {
        console.error(`Key not found ${invalidKey}`);
    } else {
        try {
            return Promise.all(keys.map(getItem));
        } catch (err) {
            console.error(err);
        }
    }
}


export const submitReview = async review => {
    try {
        const { data } = await axios.post('https://northstarconferenceadmin.herokuapp.com/api/review', review);
        Alert.alert("Submitted review" + JSON.stringify(data));
        return true;
    } catch (err) {
        console.error(err);
        Alert.alert("Something went wrong");
        return false;
    }
}
