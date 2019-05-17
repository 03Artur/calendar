import moment from 'moment';

export default [
    {
        date: moment().format('DD.MM.YYYY'),
        events: [
            {
                name: 'Event name',
                body: 'Event body',
                time: '11:00',
            }
        ]
    },
    {
        date: moment().startOf("M").format('DD.MM.YYYY'),
        events: [
            {
                name: 'Event name',
                body: 'Event body',
                time: '11:00',
            }
        ]
    },
    {
        date: moment().endOf("M").format('DD.MM.YYYY'),
        events: [
            {
                name: 'Event name',
                body: 'Event body',
                time: '11:00',
            }, {
                name: 'Event name',
                body: 'Event body',
                time: '12:24',
            }, {
                name: 'Event name',
                body: 'Event body',
                time: '12:24',
            },
        ]
    },
    {
        date: moment().add(1, 'd').format('DD.MM.YYYY'),
        events: [
            {
                name: 'Event with a long title Event with a long title',
                body: 'Event with a long description Event with a long description Event with a long description Event with a long description Event with a long description ',
                time: '12:00',
            }
        ]
    },
    {
        date: moment().subtract(1, 'd').format('DD.MM.YYYY'),
        events: [
            {
                name: 'Event name',
                body: 'Event body',
                time: '12:00',
            }
        ]
    },
    {
        date: moment().add(1, 'w').format('DD.MM.YYYY'),
        events: [
            {
                name: 'Event name',
                body: 'Event body',
                time: '12:00',
            }
        ]
    },
    {
        date: moment().subtract(1, 'w').format('DD.MM.YYYY'),
        events: [
            {
                name: 'Event name',
                body: 'Event body',
                time: '12:00',
            }
        ]
    },
    {
        date: moment().subtract(1,'M').format('DD.MM.YYYY'),
        events: [
            {
                name: 'Event name',
                body: 'Event body',
                time: '11:00',
            }
        ]
    },
    {
        date: moment().subtract(1,'M').startOf("M").format('DD.MM.YYYY'),
        events: [
            {
                name: 'Event name',
                body: 'Event body',
                time: '11:00',
            }
        ]
    },
    {
        date: moment().subtract(1,'M').endOf("M").format('DD.MM.YYYY'),
        events: [
            {
                name: 'Event name',
                body: 'Event body',
                time: '11:00',
            }, {
                name: 'Event name',
                body: 'Event body',
                time: '12:24',
            }, {
                name: 'Event name',
                body: 'Event body',
                time: '12:24',
            },
        ]
    },
    {
        date: moment().subtract(1,'M').add(1, 'd').format('DD.MM.YYYY'),
        events: [
            {
                name: 'Event with a long title Event with a long title',
                body: 'Event with a long description Event with a long description Event with a long description Event with a long description Event with a long description ',
                time: '12:00',
            }
        ]
    },
    ,
    {
        date: moment().subtract(1,'M').format('DD.MM.YYYY'),
        events: [
            {
                name: 'Event name',
                body: 'Event body',
                time: '11:00',
            }
        ]
    },
    {
        date: moment().add(1,'M').startOf("M").format('DD.MM.YYYY'),
        events: [
            {
                name: 'Event name',
                body: 'Event body',
                time: '11:00',
            }
        ]
    },
    {
        date: moment().add(1,'M').endOf("M").format('DD.MM.YYYY'),
        events: [
            {
                name: 'Event name',
                body: 'Event body',
                time: '11:00',
            }, {
                name: 'Event name',
                body: 'Event body',
                time: '12:24',
            }, {
                name: 'Event name',
                body: 'Event body',
                time: '12:24',
            },
        ]
    },
    {
        date: moment().add(1,'M').add(1, 'd').format('DD.MM.YYYY'),
        events: [
            {
                name: 'Event with a long title Event with a long title',
                body: 'Event with a long description Event with a long description Event with a long description Event with a long description Event with a long description ',
                time: '12:00',
            }
        ]
    },
];