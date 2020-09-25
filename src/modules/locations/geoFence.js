const { Client } = require('@googlemaps/google-maps-services-js');

const client = new Client({});

client.distancematrix({
    params{
        origins
    }
})
