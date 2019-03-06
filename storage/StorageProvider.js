import React, {
    Component,
    createContext,
} from 'react';

import {
    log,
    getItems,
    submitReview,
    refetchSessionsEachDay,
} from './service';

import {
    AsyncStorage,
} from 'react-native';

export const StorageContext = createContext();

const { Provider, Consumer } = StorageContext;

export const StorageConsumer = Consumer;

const transformSchedule = schedule => [
    "KEYNOTE 1",
    "BREAKOUT 1",
    "BREAKOUT 2",
    "BREAKOUT 3",
    "KEYNOTE 2",
    "KEYNOTE 3",
    "BREAKOUT 4",
    "BREAKOUT 5",
    "BREAKOUT 6",
    "KEYNOTE 4",
].map(key => ({
    sessionName: key,
    selectedSession: schedule[key],
}));

export default class StorageProvider extends Component {

    state = {
        allSessions: {},
        scheduleArray: [],
        schedule: {},
        breakouts: {},
        keynotes: [],
        speakers: {},
        addToSchedule() { },
        removeFromSchedule() { },
        submitReview() { },
    };

    componentDidMount = async () => {

        await refetchSessionsEachDay();

        const [schedule, breakouts, keynotes, speakers] = await getItems("schedule", "breakouts", "keynotes", "speakers");

        const scheduleArray = transformSchedule(schedule);

        const allSessions = {
            ...Object.values(breakouts)
                .reduce((all, breakout) => [...all, ...breakout], [])
                .concat(keynotes)
                .reduce((all, session) => ({
                    ...all,
                    [session.id]: session
                }), {}),
        };

        this.setState({
            allSessions,
            scheduleArray,
            schedule,
            breakouts,
            keynotes,
            speakers,
            addToSchedule: this.addToSchedule,
            removeFromSchedule: this.removeFromSchedule,
            submitReview,
        });
    }

    addToSchedule = async id => {
        const session = this.state.allSessions[id];
        const sessionName = session.sessiontype.toUpperCase();
        const schedule = {
            ...this.state.schedule,
            [sessionName]: session,
        };
        try {
            await AsyncStorage.setItem("schedule", JSON.stringify(schedule));
            const scheduleArray = transformSchedule(schedule);
            this.setState({
                schedule,
                scheduleArray,
            });
        } catch (err) {
            console.error(err);
        }
    }

    removeFromSchedule = async id => {
        const session = this.state.allSessions[id];
        const sessionName = session.sessiontype.toUpperCase();
        const schedule = {
            ...this.state.schedule,
            [sessionName]: {},
        };
        try {
            await AsyncStorage.setItem("schedule", JSON.stringify(schedule));
            const scheduleArray = transformSchedule(schedule);
            this.setState({
                schedule,
                scheduleArray,
            });
        } catch (err) {
            console.error(err);
        }
    }

    render = () => (
        <Provider
            value={this.state}
        >
            {this.props.children}
        </Provider>
    );
}
