// if (window.self === window.top) {
//     document.body.innerText = 'This application is for use in the Salesforce Marketing Cloud Content Builder only!';;
// }

let sdk = new window.sfdc.BlockSDK(); //initalize SDK

// let static_key = process.env.STATIC_MAP_KEY;
let static_key = '';

let mapData = {
    apiKey: static_key,
    mapCentre: 'London,UK',
    mapHeight: 300,
    mapWidth: 600,
    mapZoom: 14,
    mapType: 'roadmap',
    imgAlt: 'yopede store',
    mapMarker: {
        color: '0xff0000',
        label: 'London, UK'
    }
};

let defaultContent = '<img src="https://dj-gmaps-sfmc-content-nlock.herokuapp.com//dragIcon.png" style="display:block;margin-left:auto;margin-right:auto">';

let saveData = () => {
    console.log('Saving data...');

    mapData.apiKey = document.getElementById('apiKey').value;
    mapData.mapWidth = document.getElementById('mapWidth').value;
    mapData.mapHeight = document.getElementById('mapHeight').value;
    mapData.mapCentre = document.getElementById('mapCentre').value;
    mapData.mapZoom = document.getElementById('mapZoom').value;
    mapData.mapType = document.getElementById('mapType').value;
    mapData.imgAlt = document.getElementById('imgAlt').value;

    sdk.setData(mapData, (data) => {
        // mapData = data;
        let content = `<img src="https://maps.googleapis.com/maps/api/staticmap?center='${mapData.mapCentre}&zoom=${mapData.mapZoom}&scale=1&size=${mapData.mapWidth}x${mapData.mapHeight}&maptype=${mapData.mapType}&format=png&visual_refresh=true&&markers=size:mid%7Ccolor:${mapData.mapMarker.color}%7Clabel:%7C${mapData.mapCentre}&key=${mapData.apiKey}" alt="${mapData.imgAlt}">`;
        let noKeyContent = `<p>To use the Maps Static API, you must get an API key from Google and enable billing. Don't worry there is a free tier :)</p>
        <p><a href="https://cloud.google.com/maps-platform/#get-started">Grab one here</a></p>`;
        let superContent = defaultContent;

        //check for no API Key
        if (mapData.apiKey.length < 5) {
            superContent = noKeyContent;
        }

        //check for ampscript
        if (content.search('%%') === -1) {
            superContent = content;
        }

        console.log('content: ' + content);

        sdk.setSuperContent(decodeURI(superContent), (newSuperContent) => {});
        sdk.setContent(decodeURI(content));

    });

    console.log(JSON.stringify(mapData));

}

let fetchData = () => {

    console.log('Loading data...');

    sdk.getData((data) => {
        if (Object.keys(data).length > 0) {
            mapData = data;

            document.getElementById('apiKey').value = mapData.apiKey;
            document.getElementById('mapWidth').value = mapData.mapWidth;
            document.getElementById('mapHeight').value = mapData.mapHeight;
            document.getElementById('mapCentre').value = mapData.mapCentre;
            document.getElementById('mapZoom').value = mapData.mapZoom;
            document.getElementById('mapType').value = mapData.mapType;
            document.getElementById('imgAlt').value = mapData.imgAlt;
            // console.log('Found data!');
        }
    });

    console.log(JSON.stringify(mapData));
}

window.onload = fetchData;
window.onchange = saveData;