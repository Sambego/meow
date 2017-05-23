import {h, render} from 'preact';
import {Reminder as ReminderService} from '../../Services';
import {Bubble} from '../';

const Reminder = () => {
    const reminderInstance = new ReminderService();
    reminderInstance.set(1);

    return <Bubble>Reminder is set in 1 minute.</Bubble>;
};

Reminder.propTypes = {};

export default Reminder;
