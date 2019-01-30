import React, {
    Component,
    createContext,
} from 'react';

import {
    log,
    getItems,
    submitReview,
} from './service';

import {
    AsyncStorage,
} from 'react-native';

const { Provider, Consumer } = createContext();

export const StorageConsumer = Consumer;

export default class StorageProvider extends Component {

    state = {
        allSessions: {},
        scheduleArray: [],
        schedule: {},
        breakouts: {},
        keynotes: [],
        addToSchedule() { },
        removeFromSchedule() { },
        submitReview() { },
    };

    componentDidMount = async () => {
        const [schedule, breakouts, keynotes] = await getItems("schedule", "breakouts", "keynotes");

        const scheduleArray = this.addScheduleArray(schedule);

        const allSessions = {
            ...Object.values(breakouts)
                .reduce((all, breakout) => [...all, ...breakout], [])
                .concat(keynotes)
                .reduce((all, session) => ({
                    ...all,
                    [session.id]: session
                }), {}),
        };

        try {
            log({
                allSessions,
                // scheduleArray,
                // schedule,
                // breakouts,
                // keynotes,
            });
        } catch (err) {
            console.error(err);
        }

        this.setState({
            allSessions,
            scheduleArray,
            schedule,
            breakouts,
            keynotes,
            addToSchedule: this.addToSchedule,
            removeFromSchedule: this.removeFromSchedule,
            submitReview,
        });
    }

    addScheduleArray = schedule => {
        const orderedScheduleKeys = [
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
        ];

        return orderedScheduleKeys
            .map(key => ({
                sessionName: key,
                selectedSession: schedule[key],
            }));
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
            const scheduleArray = this.addScheduleArray(schedule);
            this.setState({
                schedule,
                scheduleArray,
            });
            log({
                schedule,
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
            const scheduleArray = this.addScheduleArray(schedule);
            this.setState({
                schedule,
                scheduleArray,
            });
            log({
                schedule,
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
