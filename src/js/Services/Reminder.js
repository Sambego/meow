import Icon from '../../icons/favicon-robot.png';

export default class Reminder {
    showNotification() {
        Notification.requestPermission(permission => {
            if (permission === 'granted') {
                const notification = new Notification('Here is a friendly reminder', {
                    icon: Icon,
                });
            }
        });
    }

    set(time) {
        window.setTimeout(this.showNotification, (time * 60 * 1000));
    }
}
