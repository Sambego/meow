export default class Cat {
    static cats = [
        require('../../icons/poes-chrome.svg'),
        require('../../icons/poes-firefox.svg'),
        require('../../icons/poes-safari.svg'),
        require('../../icons/poes-edge.svg'),
    ];

    static listeners = [];

    static random() {
        const randomIndex = Math.floor(Math.random() * 4);

        return this.cats[randomIndex];
    }

    static on(callback) {
        this.listeners.push(callback);
    }

    static change() {
        const cat = this.random();

        this.listeners.forEach(listener => listener(cat));
    }
}
