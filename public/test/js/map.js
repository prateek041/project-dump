// const getStoresButton = document.getElementById('find-store');
// getStoresButton.addEventListener("click", getStores);
// const showStoresButton = document.getElementById('Show-store');
// showStoresButton.addEventListener("click", showMap);

let dataSource, map;

function InitMap() {

    map = new atlas.Map('myMap', {

        // default settings.
        // renderWorldCopies: false,
        // showLogo: true,
        showFeedbackLink: true,
        style: 'grayscale_light',
        center: [81.869200, 25.43723],
        zoom: 11,
        language: 'en-US',
        authOptions: {
            authType: 'subscriptionKey',
            subscriptionKey: 'vy4mOcdCJacJR580y5biXvmlYXUM0EC_HRj3zI3gnEg'
        }
    });

    console.log('added the map now')

    map.events.add('ready', function () {

        // Add the Style Control to the map

        // map.controls.add(new atlas.control.StyleControl({
        //     mapStyles: ['road', 'grayscale_dark', 'greyscale_light', 'night', 'road_shaded_relief', 'satellite', 'satellite_road_labels']
        // }), {
        //     position: 'top-right'
        // });

        // map.controls.add([
        //     new atlas.control.CompassControl(),
        //     new atlas.control.PitchControl(),
        // ], {
        //     position: 'top-right'
        // });

        // map.controls.add(new atlas.control.ZoomControl(), {
        //     position: 'bottom-right'
        // })

        console.log('maps is addded')

        dataSource = new atlas.source.DataSource();
        map.sources.add(dataSource);

        console.log('datasource is added')


        const point = new atlas.data.Point([81.869200, 25.43723]);
        dataSource.add(point);
        console.log(point)

        map.layers.add(new atlas.layer.BubbleLayer(dataSource, null, {
            radius: 5,
            strokeColor: "green",
            strokeWidth: 6,
            color: "white"
        }))
    }
    )
}