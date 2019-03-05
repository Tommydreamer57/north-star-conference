
// FILTER SESSIONS
export default {
    // NO FILTER
    displayAll: () => () => true,
    // ONLY SESSIONS IN THE SCHEDULE
    filterBySchedule: ({
        context: {
            scheduleArray
        }
    }) => ({ id }) => scheduleArray.find(({ selectedSession }) => selectedSession && selectedSession.id === id),
    // ONLY SESSIONS THAT MATCH TEXT INPUT
    filterByTextInput: ({ state: { input } }) => ({
        title,
        speakername,
        sessiontype,
        room,
        demographic,
    }) => [title, speakername, sessiontype, room, demographic].some(str => str.toUpperCase().includes(input.toUpperCase())),
};
