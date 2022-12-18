// Create a new map
var map = new atlas.Map("map", {
    center: [-122.335167, 47.608013],
    zoom: 12,
    view: "Auto",
    //Add your Azure Maps subscription client ID to the map SDK.
    authOptions: {
        authType: 'subscriptionKey',
        subscriptionKey: 'vy4mOcdCJacJR580y5biXvmlYXUM0EC_HRj3zI3gnEg'
    }
  
  });
  
  //Use TokenCredential with Token
  var tokenCredential = new atlas.service.TokenCredential("35267128-0f1e-41de-aa97-f7a7ec8c2dbd", map.authentication.getToken());
  
  // Use subscriptionKeyCredential to create a pipeline
  var pipeline = atlas.service.MapsURL.newPipeline(tokenCredential);
  
  // Construct the SearchURL object
  var searchURL = new atlas.service.SearchURL(pipeline);
  
  map.events.add("load", function(e){
  
    /* Update the style of mouse cursor to a pointer */
    map.getCanvasContainer().style.cursor = "pointer";
  
    /* Create a popup */
    var popup = new atlas.Popup();
  
    /* Upon a mouse click, open a popup at the clicked location and render in the popup the address of the clicked location*/
    map.events.add("click", function(e){
      var position = [e.position[0], e.position[1]];
  
      /* Execute the reverse address search query and open a popup once a response is received */
      searchURL.searchAddressReverse(atlas.service.Aborter.timeout(10000), position, {
        allowFreeformNewline: true
      }).then((addresses) => {
        //Get data features from response
        var data = addresses.geojson.getFeatures();
  
        // Construct the popup
        var popupContent = document.createElement("div");
        popupContent.classList.add("popup-content");
        popupContent.innerHTML = 
          data.length !== 0
          ? data.features[0].properties.address.freeformAddress
        : "No address for that location!";
        popup.setPopupOptions({
          position: e.position,
          content: popupContent
        });
  
        // Render the popup on the map 
        popup.open(map);
      });
    });             
  });