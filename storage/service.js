import {
    AsyncStorage,
} from 'react-native';

import axios from 'axios';

export const validKeys = {
    breakouts: "breakouts",
    keynotes: "keynotes",
    schedule: "schedule",
    speakers: "speakers",
    date: "date",
    notifications: "notifications",
};

export const refetchSessionsEachDay = async () => {
    const fetchDate = await getItem("date");
    if (Date.now() > (+fetchDate || 0) + (1000 * 60 * 60 * 24)) {
        return fetchSessions();
    } else return false;
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

        const schedule = {
            ...Object.keys(breakouts)
                .reduce((all, key) => ({
                    ...all,
                    [key]: {},
                }), {}),
            ...JSON.parse(existingSessions || "{}"),
            ...keynotes
                .reduce((all, session) => ({
                    ...all,
                    [session.sessiontype.toUpperCase()]: session,
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
    if (!(key in validKeys)) {
        throw new Error(`Invalid key: ${key}. Please use one of: "${Object.keys(validKeys).join('," "')}"`);
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
        await axios.post('https://northstarconferenceadmin.herokuapp.com/api/review', review);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}
