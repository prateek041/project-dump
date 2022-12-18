// // const getStoresButton = document.getElementById('find-store');
// // getStoresButton.addEventListener("click", getStores);
// // const showStoresButton = document.getElementById('Show-store');
// // showStoresButton.addEventListener("click", showMap);

// const { get } = require("mongoose");

// var dataSource, map;

// function InitMap() {
//     map = new atlas.Map('myMap', {

//         // default settings.
//         // renderWorldCopies: false,
//         // showLogo: true,
//         showFeedbackLink: true,
//         style: 'grayscale_light',
//         center: [92.791934,24.762684],
//         zoom: 11,
//         language: 'en-US',
//         authOptions: {
//             authType: 'subscriptionKey',
//             subscriptionKey: 'vy4mOcdCJacJR580y5biXvmlYXUM0EC_HRj3zI3gnEg'
//         }
//     });

//     map.events.add('ready', function () {

//         // Add the Style Control to the map

//         map.controls.add(new atlas.control.StyleControl({
//             mapStyles: ['road', 'grayscale_dark', 'greyscale_light', 'night', 'road_shaded_relief', 'satellite', 'satellite_road_labels']
//         }), {
//             position: 'top-right'
//         });

//         map.controls.add([
//             new atlas.control.CompassControl(),
//             new atlas.control.PitchControl(),
//         ], {
//             position: 'top-right'
//         });

//         map.controls.add(new atlas.control.ZoomControl(), {
//             position: 'bottom-right'
//         })

//         dataSource = new atlas.source.DataSource();
//         map.sources.add(dataSource);

//         var position = new atlas.data.Position(myCustomJson.results[i].lon, myCustomJson.results[i].lat);

//         //Add point data to the data source.
//         datasource.add(points);

//         //Create a layer that defines how to render the points on the map.
//         var symbolLayer = new atlas.layer.SymbolLayer(datasource, null, {
//             textOptions: {
//                 textField: ['get', 'title'],    //Specify the property name that contains the text you want to appear with the symbol.
//                 offset: [0, 1.2]
//             }
//         });

//         map.layers.add(symbolLayer);

//         //Create a popup but leave it closed so we can update it and display it later.
//         popup = new atlas.Popup({
//             position: [0, 0],
//             pixelOffset: [0, -18]
//         });

//         //Add a click event to the symbol layer.
//         map.events.add('click', symbolLayer, symbolClicked);
//     });

//     getStores()
// }


// async function getStores() {
//     const res = await fetch('/api/v1/stores');
//     const data = await res.json();
//     let coordinates = data.data;

//     coordinates.forEach(myFunction)

//     async function myFunction(value, index, array) {
//         const finalData = {
//             "coordinates": value.coordinates,
//             "type": "Point",
//         }

//         console.log(coordinates)
//         // await dataSource.add(new atlas.data.Point(value.coordinates))
//         // points.push(value.coordinates);
//     }


//     // console.log(points

//     showMap();
// }

// function showMap() {

//     console.log('this got triggered')
//     // const point = new atlas.data.Point([81.869200, 25.43723])
//     // console.log(point)
//     // dataSource.add(point)
//     map.layers.add(new atlas.layer.BubbleLayer(dataSource, null, {
//         radius: 5,
//         strokeColor: "red",
//         strokeWidth: 6,
//         color: "white"
//     }))

//     const point = new atlas.data.Point([81.869201, 25.43722]);
//     const point1 = new atlas.data.Point([92.797454, 24.749552]);
//     const point2 = new atlas.data.Point([92.788295, 24.785017]);
//     const point3 = new atlas.data.Point([24.786069, 24.786069]);
//     dataSource.add(point);
//     dataSource.add(point1);
//     dataSource.add(point2);
//     dataSource.add(point3);


//     map.layers.add(new atlas.layer.BubbleLayer(dataSource, null, {
//         radius: 5,
//         strokeColor: "green",
//         strokeWidth: 6,
//         color: "white"
//     }))
// }



var map = L.map('map').setView([24.755047, 92.792220], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

const api_url = '/api/v1/stores';

async function getCoordinates() {
    const response = await fetch(api_url);
    const data = await response.json();
    let coordinates = data.data;

    // looping over it.

    coordinates.forEach(myFunction)
    async function myFunction(value, index, array) {
        const finalData = {
            "coordinates": value.coordinates,
        }

        console.log(coordinates)
        let latitude = finalData.coordinates[0];
        let longitude = finalData.coordinates[1];
        let phoneNumber = value.number;
        let storeName = value.storeName;

        L.marker([latitude, longitude]).addTo(map)
            .bindPopup(`Phone Number : ${phoneNumber} <br> store Name: ${storeName}`)
            .openPopup();
    }
}

getCoordinates()


// 24.772294, 92.800536
// 24.756700, 92.770763