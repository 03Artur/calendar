import moment from 'moment';

export default [
    {
        date: moment().format('DD.MM.YYYY'),
        events: [
            {
                name: 'event name',
                body: 'event body',
                time: '11:00',
            }
        ]
    },
    {
        date: moment().add(1,'d').format('DD.MM.YYYY'),
        events: [
            {
                name: 'event name event name event name event name event name event name event name event name ',
                body: 'event body event body event body event body event body event body event body event body event body ',
                time: '12:00',
            }
        ]
    },
    {
        date: moment().subtract(1,'d').format('DD.MM.YYYY'),
        events: [
            {
                name: 'event name',
                body: 'event body',
                time: '12:00',
            }
        ]
    },
    {
        date: moment().add(1,'w').format('DD.MM.YYYY'),
        events: [
            {
                name: 'event name',
                body: 'event body',
                time: '12:00',
            }
        ]
    },
    {
        date: moment().subtract(1,'w').format('DD.MM.YYYY'),
        events: [
            {
                name: 'event name',
                body: 'event body',
                time: '12:00',
            }
        ]
    },
];