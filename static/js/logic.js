// assigning map 
var map = L.map("mapid").setView([37.8, -96], 5);

// defining streetmap/layer 
L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY,
    }).addTo(map)


// url for the earthquake data
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// get request to handle the JSON
d3.json(url).then(createMarkers);
function createMarkers(earthquakes) {
    let features = earthquakes.features;
    console.log(features)

    // Assigning colors by the magnitude level
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
    // looping through each data to get the lat and long to create circle markers
    // using the function for color, each color will be assigned based on the mag for the feature
    features.forEach((feature) =>{
        let magnitude = feature.properties.mag;
        let coordinates = L.circle(
            [feature.geometry.coordinates[1],feature.geometry.coordinates[0]], {
                color: getcolor(feature.properties.mag),
                fillColor: getcolor(feature.properties.mag),
                fillOpacity: .8,
                radius: magnitude * 20000,   
            }).bindPopup(`<h2> ${feature.properties.place} </h2> <hr> <h3>Magnitude:  ${feature.properties.mag}  </h3>`);
    
        earthquake.push(coordinates);    
    })
    let layerGroup = L.layerGroup(earthquake);
    map.addLayer(layerGroup);

// creating a legend
    var legend = L.control({position: "bottomright"});

    legend.onAdd = function(){
    var div = L.DomUtil.create("div", "info legend");
    // var mag_lvl = ['0-1', '1-2','2-3','3-4','4-5','5+'];
    // var colors = ['green','yellowgreen','yellow','orange','darkorange','red']
    div.innerHTML = "<h3>Magnitude Legend</h3><table><tr><th>0-1</th><td>Green</td></tr><tr><th>1-2</th><td>Yellow Green</td></tr><tr><th>2-3</th><td>Yellow</td></tr><tr><th>3-4</th><td>Orange</td></tr><tr><th>4-5</th><td>Dark Orange</td></tr><tr><th>5+</th><td>Red</td></tr></table>";
    return div;
    }
    
    legend.addTo(map)
}


