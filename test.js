function GetMap() {
    //Initialize a map instance.
    map = new atlas.Map('myMap', {
        view: 'Auto',

        //Add authentication details for connecting to Azure Maps.
        authOptions: {
            //Use Azure Active Directory authentication.
            authType: 'anonymous',
            clientId: 'e6b6ab59-eb5d-4d25-aa57-581135b927f0', //Your Azure Maps client id for accessing your Azure Maps account.
            getToken: function (resolve, reject, map) {
                //URL to your authentication service that retrieves an Azure Active Directory Token.
                var tokenServiceUrl = "https://samples.azuremaps.com/api/GetAzureMapsToken";

                fetch(tokenServiceUrl).then(r => r.text()).then(token => resolve(token));
            }

            //Alternatively, use an Azure Maps key. Get an Azure Maps key at https://azure.com/maps. NOTE: The primary key should be used as the key.
            //authType: 'subscriptionKey',
            //subscriptionKey: '[YOUR_AZURE_MAPS_KEY]'
        }
    });

    //Wait until the map resources are ready.
    map.events.add('ready', function () {
        //Create a data source and add it to the map.
        datasource = new atlas.source.DataSource();
        map.sources.add(datasource);

        //Add a layer for rendering the users location as a symbol.
        map.layers.add(new atlas.layer.SymbolLayer(datasource));
    });
}

function startTracking() {
    if (!watchId) {
        //Watch the users position.
        watchId = navigator.geolocation.watchPosition(function (geoPosition) {

            //Get the coordinate information from the geoPosition.
            var userPosition = [geoPosition.coords.longitude, geoPosition.coords.latitude];

            //TIP: altitude? in meters, speed? in meters/second and heading? in degrees are also potential properties of geoPosition.coords

            if (!userShape) {
                //Create a shape to show the users position and add it to the data source.
                userShape = new atlas.Shape(new atlas.data.Feature(new atlas.data.Point(userPosition), geoPosition));
                datasource.add(userShape);
            } else {
                userShape.setCoordinates(userPosition);
                userShape.setProperties(geoPosition);
            }

            //Center the map on the users position.
            map.setCamera({
                center: userPosition,
                zoom: 15
            });
        }, function (error) {
            //If an error occurs when trying to access the users position information, display an error message.
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert('User denied the request for Geolocation.');
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert('Position information is unavailable.');
                    break;
                case error.TIMEOUT:
                    alert('The request to get user position timed out.');
                    break;
                case error.UNKNOWN_ERROR:
                    alert('An unknown error occurred.');
                    break;
            }
        });
    }
}

function stopTracking() {
    //Cancel the geolocation updates.
    navigator.geolocation.clearWatch(watchId);

    //Clear all data from the map.
    datasource.clear();
    userShape = null;
    watchId = null;
}