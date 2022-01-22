
var mbAttr = ' <a href="http://grupo-ioa.atmosfera.unam.mx/" > Interacción Océano-Atmósfera </a>, ICAyCC, UNAM';
        //Instituto de Ciencias de la Atmósfera y Cambio Climático ';
        mbUrl = "https://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}";

var back_layer= L.tileLayer(mbUrl, {id: 'back', attribution: mbAttr});
const url_owgis="http://pronosticos.unam.mx:8080/ncWMS_2015/wms"
//var t=require("./mensual.json");
//console.log(t);
var temp=L.tileLayer.wms(url_owgis,
        {
                version:"1.3.0",
        layers: 'atlas_mensuales/T2',
        time: '2018-01-01T00:00:00.000Z',
        format:'image/png',
        transparent:true,
        opacity:0.5,
        styles:"default-scalar/tempatlas",
        colorscalerange:"-15.5,49.5",
        belowmincolor:"extend",
        abovemaxcolor:"extend",
        numcolorbands:65,
        attribution:'IOA',
        uppercase:true,
                widht:256,
                height:256,
        });
var base_layers={
    "Temperatura ":temp,
        "Humedad Relativa": temp,
    };

//bbox='-99.56926749939244,16.4910888671875,-78.51112343078334,32.44792175292969',
var lon_max=-78.51112343;
var lon_min=-99.56926749;
var lat_min= 16.49108867;
var lat_max= 32.44792175;
bounds = new L.LatLngBounds(new L.LatLng(16.491, -78.511), new L.LatLng(32.448, -99.569));
console.log('b:', bounds);
var map = L.map('map', {
        //center: bounds.getCenter(),
        center:[19.3262492550136, -99.17620429776193],
        zoomSnap: 0.1,
        zoom: 20,
        minZoom:5,
        maxZoom:20,
        layers: [ back_layer, temp],
        maxBounds: bounds,
        maxBoundsViscosity: 1,
        });
//layer_control=L.control.layers(base_layers,)
    //.addTo(map);

map.flyTo(bounds.getCenter(), 5.6);
var popup = L.popup()

const urlbase="http://132.248.8.238:8080/ncWMS_2015/";
const rtype= "GetTimeseries";
const layers= "atlas_diario/T2";
const time="2018-01-01T00:00:00.000Z/2018-12-31T00:00:00.000Z";

function onMapClick(e) {
        var btn_series = L.DomUtil.create('button', );
        btn_series.setAttribute('type','button');
        btn_series.innerHTML="Serie de tiempo";
        lat= e.latlng['lat'];
        lon= e.latlng['lng'];
        console.log(e.latlng);
        req_plot= get_request(urlbase, rtype, layers, time, lon, lat,
                format='image/png');
        req_down= get_request(urlbase, rtype, layers, time, lon, lat,
                format='text/csv');
        if (lat>lat_min && lat<lat_max && lon>lon_min && lon<lon_max){
                popup
                        .setLatLng(e.latlng)
                        .setContent('Posición: (' + lat+','+ lon +')<br>'+
                                "Serie de tiempo: "+
                                "<input type='button' value='Descargar'"+
                                "onclick=location.href='"+req_down + "' />"+
                                "<input type='button' value='Plot'"+
                                "onclick=location.href='"+req_plot + "' />")
                        .openOn(map);
        }
}

map.on('click', onMapClick);
var mykeys=Object.keys(base_layers);
var tipo_list=[
        'Mensual',
        'Horaria Mensual',
        'Promedio Mensual de máximas',
        'Máxima Absoluta por Mes',
        'Promedio Mensual de Mínimas',
        'Minima Absoluta por Mes',
]
var var_list=[
        'Temperatura',
        'Humedad Relativa',
        'Viento',
        'Precipitación',
        'Evaporación',
        'Rad. Onda Larga',
        'Rad. Onda Corta',
        'Capa límite',
]
add_layers_div(tipo_list, '#menu_t');
add_layers_div(var_list, '#menu_var');

function add_layers_div(layers, div){
        layers.forEach(function(lname, indx, array){
                let option = $('<option value="'+ lname +
                '"> '+ lname + '</option> ');
        option.appendTo(div);
    })
}
