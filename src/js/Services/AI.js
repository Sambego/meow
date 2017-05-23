export default class AI {
    static getTheme(sentence) {
        if (sentence.indexOf('how are you') >= 0) {
            return {
                type: 'hello',
            };
        } else if (sentence.indexOf('battery') >= 0) {
            return {
                type: 'battery',
            };
        } else if (sentence.indexOf('weather') >= 0) {
            return {
                type: 'weather',
            };
        } else if (sentence.indexOf('where') >= 0 || sentence.indexOf('location') >= 0) {
            return {
                type: 'location',
            };
        } else if (sentence.indexOf('fun') >= 0 || sentence.indexOf('bonus') >= 0) {
            return {
                type: 'bonus',
            };
        } else if (sentence.indexOf('remind') >= 0) {
            return {
                type: 'reminder',
            };
        } else if (sentence.indexOf('new') >= 0) {
            return {
                type: 'news',
            };
        } else if (sentence.indexOf('help') >= 0) {
            return {
                type: 'help',
            };
        }

        return {
            type: 'unkown',
        };
    };
}
