
var mbAttr = ' <a href="http://grupo-ioa.atmosfera.unam.mx/" > Interacción Océano-Atmósfera </a>, ICAyCC, UNAM';
        //Instituto de Ciencias de la Atmósfera y Cambio Climático ';
        mbUrl = "https://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}";

var back_layer= L.tileLayer(mbUrl, {id: 'back', attribution: mbAttr});
//const url_owgis="http://pronosticos.unam.mx:8080/ncWMS_2015/wms"
const urlbase="https://pronosticos.atmosfera.unam.mx:8443/ncWMS_2015/";
const urlbase2="http://132.248.8.238:8080/ncWMS_2015/";
var plantilla_temp={
        version:"1.3.0",
        time: '2018-01-01T00:00:00.000Z',
        format:'image/png',
        transparent:true,
        opacity:0.5,
        styles:"default-scalar/tempatlas",
        colorscalerange:"-15.5,49.5",
        belowmincolor:"extend",
        abovemaxcolor:"extend",
        numcolorbands:65,
        //attribution:'IOA',
        uppercase:true,
        widht:256,
        height:256,
};

const name_layers=["atlas_mensuales/T2",
        "atlas_diario/T2",
        "atlas_maxs_abs_mensuales/T2",
        "atlas_maxs_abs_diarios/T2",
        "atlas_promedios_maxs_abs_mensuales/T2",
        "atlas_promedios_mins_mensuales/T2",
        "atlas_mins_abs_mensuales/T2",
];
var t_mensual= {'layers':'atlas_mensuales/T2'};
var t_horaria= {'layers':'atlas_diario/T2'};
var t_max_prom= {'layers':'atlas_maxs_abs_mensuales/T2'};
var t_max_abs= {'layers':'atlas_maxs_abs_diarios/T2'};
var t_max_abs_m= {'layers':'atlas_promedios_maxs_abs_mensuales/T2'};
var t_min_prom= {'layers':'atlas_promedios_mins_mensuales/T2'};
var t_min_abs= {'layers':'atlas_mins_abs_mensuales/T2'};

Object.assign(t_mensual,plantilla_temp);
Object.assign(t_horaria,plantilla_temp);
Object.assign(t_max_prom,plantilla_temp);
Object.assign(t_max_abs,plantilla_temp);
Object.assign(t_max_abs_m,plantilla_temp);
Object.assign(t_min_prom,plantilla_temp);
Object.assign(t_min_abs,plantilla_temp);
var info_layers={ t_mensual,
    t_horaria,
    t_max_prom,
    t_max_abs,
    t_max_abs_m,
    t_min_prom,
    t_min_abs,
    };
console.log(typeof info_layers);
console.log(info_layers, Object.keys(info_layers));
var layerT_mensual=L.tileLayer.wms(urlbase+'wms', t_mensual);
var layerT_hr=L.tileLayer.wms(urlbase+'wms', t_horaria);
var layerT_max_prom=L.tileLayer.wms(urlbase+'wms', t_max_prom);
var layerT_max_abs=L.tileLayer.wms(urlbase+'wms', t_max_abs);
var layerT_max_abs_m=L.tileLayer.wms(urlbase+'wms', t_max_abs_m);
var layerT_min_prom=L.tileLayer.wms(urlbase+'wms', t_min_prom);
var layerT_min_abs=L.tileLayer.wms(urlbase+'wms', t_min_abs);
var base_layers={
        "Temperatura mensual": layerT_mensual,
        "Temperatura horaria": layerT_hr,
        "Temperatura max abs diaria": layerT_max_abs,
        "Temperatura max abs mensual": layerT_max_abs_m,
        "Temperatura max promedio": layerT_max_prom,
        "Temperatura min abs": layerT_min_abs,
        "Temperatura min promedio": layerT_min_prom,
    };

//bbox='-99.56926749939244,16.4910888671875,-78.51112343078334,32.44792175292969',
var lon_max=-78.51112343;
var lon_min=-99.56926749;
var lat_min= 16.49108867;
var lat_max= 32.44792175;
bounds = new L.LatLngBounds(new L.LatLng(16.491, -78.511), new L.LatLng(32.448, -99.569));
var map = L.map('map', {
        center: bounds.getCenter(),
        //center:[19.3262492550136, -99.17620429776193],//coordenadas CU
        zoomSnap: 0.1,
        zoom: 5.0,
        minZoom:5,
        maxZoom:20,
        layers: [ back_layer, ],
        maxBounds: bounds,
        maxBoundsViscosity: 1,
        });
L.rectangle(bounds, {color: "#caf0f8", weight:1}).addTo(map);
//menu de capas leaflet
//L.control.layers(base_layers, ).addTo(map);
var active_layer= "atlas_mensuales/T2";
const rtype= "GetTimeseries";
const time="2018-01-01T00:00:00.000Z/2018-12-31T00:00:00.000Z";
var popup = L.popup()

function plot(series, legend){
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false
            }
        },
        title:{
            text:'Series de tiempo',
            subtext:'Temperatura a 2m'
        },
        legend:{
            type: 'scroll',
            bottom: 10,
            data: legend
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
            //data: date
        },
        yAxis: {
            type: 'value',
            min: 'dataMin'
            //min:10,
            //max:35
            //data: output
        },
        series: series,
        toolbox: {
            show: true,
            feature:{
                dataZoom:{
                    show: true
                },
                dataView:{
                    readOnly: false
                },
                restore:{},
                saveAsImage:{}
            }
        }
    };

    option && myChart.setOption(option);
}
//get and parse data
var parse_data={};
function get_data(url){
    return new Promise((resolve, reject) =>{
        Papa.parse(url, {
            download: true,
            header: true,
            comments: '#',
            dynamicTyping: true,
            complete: function(results) {
                //console.log(results);
                resolve(results.data)
            },
            error (err){
                reject(err)
            }
        })
    })
}
async function get_csv(url_list){
    var series=[];
    var output = [];
    var i=0;
    for (const url of url_list){
        output=[];
        console.log('url:', i,  name_layers[i],url);
        try{
            var data=await get_data(url);
            for (let row of data){
                output.push([row["Time (UTC)"],
                        row["Air temperature (C)"]]);
            }
            series.push({'name': name_layers[i],
                'type': 'line',
                'symbol':'circle',
                'data': output,
            });
        } catch (err){
            console.error('parse error', err)
        }
        i=i+1;
    }
    console.log('series:', series);
    plot(series, name_layers);
}

let points=[];
let npoints=0;
function onMapClick(e) {
    lat= e.latlng['lat'];
    lon= e.latlng['lng'];
    var btn_series = L.DomUtil.create('button', );
    btn_series.setAttribute('type','button');
    btn_series.innerHTML="Serie de tiempo";
    req_plot= get_request(urlbase, rtype, active_layer, time, lon, lat,
        format='image/png');
    req_down= get_request(urlbase, rtype, active_layer, time, lon, lat,
        format='text/csv');
    let req_list=[];
    name_layers.forEach(function(layer){
            req_list.push(get_request(urlbase, rtype, layer, time, lon, lat,
                format='text/csv'));
    });
    console.log('list:', req_list);


    get_csv(req_list);

    if (lat>lat_min && lat<lat_max && lon>lon_min && lon<lon_max){
        str_in= "<button onclick=\"add_vars(vars, \'#div_puntos\', \'pt-\'+npoints+\': \'+lat+\',\'+lon)\" > "+
                    "Agregar punto </button>";
        console.log(str_in);
        popup
            .setLatLng(e.latlng)
            .setContent('Posición<br>lat: ' + lat+'<br>lon: '+ lon +')<br>'+str_in)
            .openOn(map);
    }
}

map.on('click', onMapClick);
function layer_sel(e){
        active_layer=e.layer['options']['layers'];
        console.log('layer:',e.name,active_layer);
}
map.on('baselayerchange', layer_sel);
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

        
        
        
        
var vars={'Temperatura':{
        'Promedio Mensual':"atlas_mensuales/T2",
        'Promedio Diario':"atlas_diario/T2",
        'Máxima Absoluta Diaria':"atlas_maxs_abs_diarios/T2",
        'Máxima Absoluta por Mes':"atlas_maxs_abs_mensuales/T2",
        'Promedio de Máximos Absolutos Mensuales':"atlas_promedios_maxs_abs_mensuales/T2",
        'Promedio Mensual de Mínimas':"atlas_promedios_mins_mensuales/T2",
        'Minima Absoluta por Mes':"atlas_mins_abs_mensuales/T2"
    },
    'Viento':{
        'Promedio Mensual':"atlas_mensuales/U10:V10-mag",
        'Promedio Diario':"atlas_diario/U10:V10-mag",
        'Máxima Absoluta Diaria':"atlas_maxs_abs_diarios/U10:V10-mag",
        'Máxima Absoluta por Mes':"atlas_maxs_abs_mensuales/U10:V10-mag",
        'Promedio de Máximos Absolutos Mensuales':"atlas_promedios_maxs_abs_mensuales/U10:V10-mag",
    },
    'Precipitación':{
        'Promedio Mensual':"atlas_mensuales/PREC2",
        'Promedio Diario':"atlas_diario/PREC2",
        'Máxima Absoluta Diaria':"atlas_maxs_abs_diarios/PREC2",
        'Máxima Absoluta por Mes':"atlas_maxs_abs_mensuales/PREC2",
        'Promedio de Máximos Absolutos Mensuales':"atlas_promedios_maxs_abs_mensuales/PREC2",
    }
}

console.log('vars:', Object.keys(vars));
//var_list - lista con variables 
//var_prop - objeto de variables
//div - div para colocar
function add_select(var_list, id, root){
    let div = $('<div id= ' + id + ' > </div>').prependTo(root);
    let sel=  $('<select name= "sel_var" > </select>').appendTo(div);

    var_list.forEach(function(vname){
        let option = $('<option value="' + vname + '">'+ vname + '</option>');
        option.appendTo(sel);
    })
}

function add_chkbox(var_prop, varname, root, id ){
    let div = $('<div > <p>'+ varname+': </p></div>').appendTo(root);
    let idfull=''
    for (const var_obj in var_prop){
        id_full=id+'*'+var_prop[var_obj];
            console.log('id;', id_full);
        let chkbox= $('<label><input type="checkbox" class="chk_var" id="'
                +id_full+'" value="' + var_obj +
                '" >'+ var_obj + ' </label> <br>');
        chkbox.appendTo(div);
    }
}

function add_vars(vars, root, title='titulo'){
        console.log('titulo:', title);
        var nid=title.replace(' ','');
        nid=nid.replace(':','*');

    let div_main = $('<div  > </div>').prependTo(root);
    let div = $('<div>  <p>'+ title+': </p></div>').appendTo(div_main);
    let btn = $('<p><button > Eliminar punto </button></p>');
    btn.appendTo(div);
    let div_vars = $('<div>  </div>').appendTo(div_main);
    for (const var_obj in vars){
        add_chkbox(vars[var_obj], var_obj, div_main, nid);
    }
}
//add_vars(vars, "#div_puntos");
//add_chkbox(vars.Temperatura, 'Temperatura', "#div_puntos");

function add_layers_div(layers, div){
        layers.forEach(function(lname, indx, array){
                let option = $('<option value="'+ lname +
                '"> '+ lname + '</option> ');
        option.appendTo(div);
    })
}

function plot_btn(){

    var el_check=[];
    $("input:checkbox[class=chk_var]:checked").each(function(){
        el_check.push($(this).attr('id'));
    });
    console.log('check:', el_check);
    el_check.forEach(function(idname){
        info = idname.split('*');
        var layer=info[2];
        var lon=info[1].split[1];
        var lat=info[1].split[0];
        req_list.push(get_request(urlbase, rtype, layer, time, lon, lat,
            format='text/csv'));
    });
}
