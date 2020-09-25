// IMPORTANT: Replace the apikey with your own from https://developer.here.com
let apiKey = 'gu2xI9YN1IE6pyN2NXUWHy-cilUtvePc9tKShlNwCY0';

// Step 1: initialize the HERE map platform
let platform = new H.service.Platform({
  apikey: apiKey
});

var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
  center: { lat: 40.71, lng: -74.01 },
  zoom: 15,
  pixelRatio: window.devicePixelRatio || 1
});

window.addEventListener('resize', () => map.getViewPort().resize());
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
var ui = H.ui.UI.createDefault(map, defaultLayers);

let markers = [];
let firstMarker = true;
let markerGroup = new H.map.Group();
map.addObject(markerGroup);

function addClickEventListenerToMap() {

  // add a marker to the map when the user clicks on the map
  map.addEventListener('tap', function (evt) {
    var coords = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
    let marker = new H.map.Marker(coords);

    // only retain the last two markers
    if (firstMarker) {
      markers[0] = marker;
      firstMarker = false;
    } else {
      markers[1] = marker;
      firstMarker = true;
    }

    markerGroup.removeAll();
    markerGroup.addObject(markers[0]);
    if (markers.length > 1) {
      markerGroup.addObject(markers[1]);
      // calculate the distance between the markers
      let distance = markers[0].getGeometry().distance(markers[1].getGeometry());
      distance = Math.round(distance);

      // log distance to console
      if (distance < 1000) {
        console.log("Distance: " + distance + " meters.");
      } else {
        distance = distance / 1000;
        distance = Math.round(distance);
        console.log("Distance: " + distance + " kilometers.");
      }
    }

  }, false);
}

addClickEventListenerToMap();
