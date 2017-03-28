import mapsapi from 'google-maps-api';

export default class Location {
    static mapsApiKey = process.env.GOOGLE_MAPS_API;
    static googleMapsApi = mapsapi(Location.mapsApiKey);

    static convertCoordinatesToPlace(coordinates) {
        return new Promise((resolve, reject) => {
            return this.googleMapsApi()
                .then(maps => {
                    const latLng = new maps.LatLng(coordinates.coords.latitude, coordinates.coords.longitude);
                    const geocoder = new maps.Geocoder();

                    geocoder.geocode({latLng}, (results, status) => {
                        if (status === maps.GeocoderStatus.OK) {
                            resolve({
                                city: results.find(result => result.types.includes('locality'))['address_components'].find(component => component.types.includes('locality'))['long_name'],
                                country: results.find(result => result.types.includes('country'))['formatted_address'],
                                latitude: coordinates.coords.latitude,
                                longitude: coordinates.coords.longitude,
                            });
                        } else {
                            reject(status);
                        }
                    });
                })
                .catch(error => reject(error));
        });
    }

    static get() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(coordinates => {
                this.convertCoordinatesToPlace(coordinates)
                    .then(location => resolve(location))
                    .catch(error => reject(error));
            });
        });
    }

    static getMap(latitude, longitude) {
        const zoom = 18;
        const size = 500;

        return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${size}x${size}&maptype=hybrid&sensor=false&key=${this.mapsApiKey}`;
    }
}
