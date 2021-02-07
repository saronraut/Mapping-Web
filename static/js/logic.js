var map = L.map("mapid").setView([37.8, -96], 5);


L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY,
    }).addTo(map)





// getting the data
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// function 

d3.json(url).then(createMarkers);
function createMarkers(earthquakes) {
    let features = earthquakes.features;
    console.log(features)

    function getcolor(magnitude){
        if(magnitude >= 5){
            return "red";
        }
        else if (magnitude >= 4){
            return "darkorange";
        }
        else if (magnitude >= 3) {
            return "orange";
        }
        else if (magnitude >= 2){
            return "yellow";
        }
        else if (magnitude >= 1) {
            return "yellowgreen";
        }
        else {
            return "green"
        }
    }


    let earthquake = []
    features.forEach((feature) =>{
        let magnitude = feature.properties.mag;
        let coordinates = L.circle(
            [feature.geometry.coordinates[1],feature.geometry.coordinates[0]], {
                color: getcolor(feature.properties.mag),
                fillColor: getcolor(feature.properties.mag),
                fillOpacity: 1,
                radius: magnitude * 10000,
            });
        
        // console.log(magnitude);
        coordinates.bindPopup(magnitude);
        earthquake.push(coordinates);    
    })
    let layerGroup = L.layerGroup(earthquake);
    map.addLayer(layerGroup);
}

// var circle = L.circle(coord, {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500,
//     // z-index: 
// }).addTo(map);
