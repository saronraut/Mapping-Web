var map = L.map("mapid").setView([37.8, -96], 4);


const lightmap = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY,
    }
  );

lightmap.addTo(map);



// getting the data
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(url).then(createMarkers);

function createMarkers(data) {
    // console.log(data)
    let quakeevent = data.features;
    console.log(quakeevent);
    quakeevent.forEach((quake))=>{
        let marker
    }
}



