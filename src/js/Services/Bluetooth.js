export default class Bluetooth {
    static parseHeartrate(value) {
        const flags = value.getUint8(0);
        const rate16Bits = flags & 0x1;
        const result = {};
        let index = 1;

        if (rate16Bits) {
            result.heartRate = value.getUint16(index, true);

            index += 2;
        } else {
            result.heartRate = value.getUint8(index);

            index += 1;
        }

        const contactDetected = flags & 0x2;
        const contactSensorPresent = flags & 0x4;

        if (contactSensorPresent) {
            result.contactDetected = !!contactDetected;
        }

        const energyPresent = flags & 0x8;

        if (energyPresent) {
            result.energyExpended = value.getUint16(index, true);

            index += 2;
        }

        const rrIntervalPresent = flags & 0x10;

        if (rrIntervalPresent) {
            const rrIntervals = [];

            for (; index + 1 < value.byteLength; index += 2) {
                rrIntervals.push(value.getUint16(index,  true));
            }

            result.rrIntervals = rrIntervals;
        }

        return result.heartRate;
    }

    getDevice(options) {
        return navigator.bluetooth.requestDevice({
            ...options,
            acceptAllDevices: true,
        }).then(device => {
            this.device = device;

            return device;
        });
    }

    getDeviceBatteryInfo() {
        return this.device.gatt.connect()
            .then(server => server.getPrimaryService('battery_service'))
            .then(service => service.getCharacteristic('battery_level'))
            .then(characteristic => characteristic.readValue())
            .then(value => value.getUint8(0));
    }

    getHeartRate() {
        return this.device.gatt.connect()
            .then(server => {
                console.log('Bluetooth gatt server:', server);

                return server.getPrimaryService('heart_rate');
            })
            .then(service => {
                console.log('Bluetooth heart rate service:', service);

                return service.getCharacteristic('heart_rate_measurement');
            })
            .then(characteristic => {
                characteristic.startNotifications();
                console.log('Bluetooth start heart rate notification.');

                return characteristic;
            });
    }
}
