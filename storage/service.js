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
        await axios.delete('http://192.168.1.105:4321/log');
    } catch (err) {
        console.error(err);
    }
})();

export const log = async body => {
    try {
        await axios.post('http://192.168.1.105:4321/log', body);
    } catch (err) {
        console.log(err);
    }
}



const allKeys = [
    "breakouts",
    "keynotes",
    "schedule",
    "speakers",
    "date",
];

const validKeys = allKeys.reduce((keys, key) => ({ ...keys, [key]: key }), {});

export const refetchSessionsEachDay = async () => {
    const fetchDate = await getItem("date");
    if (Date.now() > (+fetchDate || 0) + (1000 * 60 * 60 * 24)) {
        Alert.alert("Refetching Sessions");
        return fetchSessions();
    }
    else return false;
}

export const fetchSessions = async () => {
    try {

        const sessionPromise = axios.get('https://northstarconferenceadmin.herokuapp.com/api/sessions');

        const schedulePromise = AsyncStorage.getItem(validKeys.schedule);

        const [
            { data },
            existingSessions,
        ] = await Promise.all([
            sessionPromise,
            schedulePromise,
        ]);

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

        const breakouts = (data || [])
            .filter(({ sessiontype }) => sessiontype.match(/breakout/i))
            .reduce((all, breakout) => {
                const key = breakout.sessiontype.toUpperCase();
                return {
                    ...all,
                    [key]: [...(all[key] || []), breakout]
                };
            }, {});

        const schedule =
        // existingSessions ?
        // JSON.parse(existingSessions)
        //     :
        {
            friday: false,
            saturday: false,
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

        const date = `${Date.now()}`;

        await AsyncStorage.multiSet([
            [validKeys.breakouts, JSON.stringify(breakouts)],
            [validKeys.keynotes, JSON.stringify(keynotes)],
            [validKeys.schedule, JSON.stringify(schedule)],
            [validKeys.speakers, JSON.stringify(speakers)],
            [validKeys.date, JSON.stringify(date)],
        ]);

        return {
            keynotes,
            breakouts,
            schedule,
            speakers,
            date,
        };
    } catch (err) {
        console.error(err);
    }
}

export const getItem = async key => {
    if (!allKeys.includes(key)) {
        throw new Error(`Invalid key: ${key}. Please use one of: "${allKeys.join('," "')}"`);
    } else {
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
    }
}

export const getItems = (...keys) => {
    const invalidKey = !keys.every(key => key in validKeys);
    if (invalidKey) {
        console.error(`Key not found: "${invalidKey}"`);
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
        Alert.alert(`Submitted review: ${JSON.stringify(data)}`);
        return true;
    } catch (err) {
        console.error(err);
        Alert.alert("Something went wrong");
        return false;
    }
}
