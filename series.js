
var mbAttr = ' <a href="http://grupo-ioa.atmosfera.unam.mx/" > Interacción Océano-Atmósfera </a>, ICAyCC, UNAM';
        //Instituto de Ciencias de la Atmósfera y Cambio Climático ';
        mbUrl = "https://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}";

var back_layer= L.tileLayer(mbUrl, {id: 'back', attribution: mbAttr});
//const url_owgis="http://pronosticos.unam.mx:8080/ncWMS_2015/wms"
const urlbase="https://pronosticos.atmosfera.unam.mx:8443/ncWMS_2015/";
const urlbase2="http://132.248.8.238:8080/ncWMS_2015/";
let name_layers=[];

//bbox='-99.56926749939244,16.4910888671875,-78.51112343078334,32.44792175292969',
//define límites
var lon_max=-78.51112343;
var lon_min=-99.56926749;
var lat_min= 16.49108867;
var lat_max= 32.44792175;
bounds = new L.LatLngBounds(new L.LatLng(16.491, -78.511), new L.LatLng(32.448, -99.569));
//crea mapa de leaflet
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
//crea y dibuja área de trabajo
L.rectangle(bounds, {color: "#caf0f8", weight:1}).addTo(map);
//crea etiquetas de puntos de interés
L.geoJSON(pts_interes,{
    pointToLayer: function( geoJsonPoint, latlng){
        return L.marker(latlng,
{
    icon: new L.DivIcon({
        className: 'my-div-icon',
        html: '<img src="img/bullseye-solid2.svg"/>'+
              '<span class="my-div-span">'+
            //geoJsonPoint.properties.name +
            '</span>'
    })
}
	).on('click', onMapClick);
	}
}).bindTooltip(function (layer){
	return layer.feature.properties.name;
}).addTo(map);

//define parámetros fijos para solicitud
const rtype= "GetTimeseries";
const time="2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z";

//crea objeto popup
var popup = L.popup()

//realiza gráfica
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
            text:"Climatología 1979-2018",
            subtext:'Series de tiempo',
        },
        legend:{
            type: 'scroll',
            orient: 'horizontal',
            top: 25,
            left: 100,
            right: 100,
            data: legend
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
            //data: date
        },
        yAxis: {
            type: 'value',
            //min: 'dataMin'
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

    option && myChart.setOption(option, {notMerge: true});
}
//get and parse data
var parse_data={};
function get_data(url){
    return new Promise((resolve, reject) =>{
        Papa.parse(url, {
            download: true,
            //header: true,
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
var series=[];
async function get_csv(url_list){
    let output = [];
    let i=0;
    let row_len=0;
    series=[];
    for (const url of url_list){
        output=[];
        try{
            let data=await get_data(url);
            for (let row of data){
                output.push([row[0], row[1]]);
            }
            output.pop();
            output.shift();
            series.push({'name': name_layers[i],
                'type': 'line',
                'symbol':'circle',
                'data': output,
                'tooltip':{'valueFormatter':(value) => value.toFixed(1)}
            });
        } catch (err){
            console.error('parse error', err)
        }
        i=i+1;
    }
    console.log('series:', series);
    plot(series, name_layers);
}
//lista de puntos
let points={};
let npoints=0;
//definición de función al hacer click en el mapa
function onMapClick(e) {
    lat= e.latlng['lat'];
    lon= e.latlng['lng'];
    var btn_series = L.DomUtil.create('button', );
    btn_series.setAttribute('type','button');
    btn_series.innerHTML="Serie de tiempo";

        console.log('test',lat,lon);
    if (lat>lat_min && lat<lat_max && lon>lon_min && lon<lon_max){
        str_in= "<button onclick=\"add_vars(vars, \'#div_puntos\', lat, lon, \'punto-\'+npoints)\" > "+
                    "Agregar punto </button>";
        popup
            .setLatLng(e.latlng)
            .setContent('Posición<br>lat: ' + lat.toFixed(8)+'<br>lon: '+ lon.toFixed(8) +')<br>'+str_in)
            .openOn(map);
        console.log('test',lat,lon);
    }
}
map.on('click', onMapClick);

//objeto con definición de capas para cada variable
var vars={'Temperatura':{
        'Promedio Mensual':"atlas_mensuales/T2",
        'Promedio Diaria':"atlas_diario/T2",
        'Máxima Absoluta Diaria':"atlas_maxs_abs_diarios/T2",
        'Máxima Absoluta por Mes':"atlas_maxs_abs_mensuales/T2",
        'Promedio de Máx. Abs. Mensuales':"atlas_promedios_maxs_abs_mensuales/T2",
        'Promedio Mensual de Mínimas':"atlas_promedios_mins_mensuales/T2",
        'Minima Absoluta por Mes':"atlas_mins_abs_mensuales/T2"
    },
    'Viento':{
        'Promedio Mensual':"atlas_mensuales/U10:V10-mag",
        'Promedio Diario':"atlas_diario/U10:V10-mag",
        'Máxima Absoluta Diaria':"atlas_maxs_abs_diarios/U10:V10-mag",
        'Máxima Absoluta por Mes':"atlas_maxs_abs_mensuales/U10:V10-mag",
        'Promedio de Máx. Abs. Mensuales':"atlas_promedios_maxs_abs_mensuales/U10:V10-mag",
    },
    'Precipitación':{
        'Promedio Acumulada Mensual':"atlas_mensuales/PREC2",
        'Promedio Acumulada Diaria':"atlas_diario/PREC2",
        'Máxima Absoluta Diaria':"atlas_maxs_abs_diarios/PREC2",
        'Máxima Absoluta por Mes':"atlas_maxs_abs_mensuales/PREC2",
        'Promedio de Máx. Abs. Mensuales':"atlas_promedios_maxs_abs_mensuales/PREC2",
    }
}
//etiquetas por capa
var labels={
        "atlas_mensuales/T2":"T2M",
        "atlas_diario/T2":"T2D",
        "atlas_maxs_abs_diarios/T2":"T2maxD",
        "atlas_maxs_abs_mensuales/T2":"T2maxM",
        "atlas_promedios_maxs_abs_mensuales/T2":"T2pmaxM",
        "atlas_promedios_mins_mensuales/T2":"T2pminM",
        "atlas_mins_abs_mensuales/T2":"T2minM",
        "atlas_mensuales/U10:V10-mag":"WSM",
        "atlas_diario/U10:V10-mag":"WSD",
        "atlas_maxs_abs_diarios/U10:V10-mag":"WSmaxD",
        "atlas_maxs_abs_mensuales/U10:V10-mag":"WSmaxM",
        "atlas_promedios_maxs_abs_mensuales/U10:V10-mag":"WSpmaxM",
        "atlas_mensuales/PREC2":"RNM",
        "atlas_diario/PREC2":"RND",
        "atlas_maxs_abs_diarios/PREC2": "RNmaxD",
        "atlas_maxs_abs_mensuales/PREC2": "RNmaxM",
        "atlas_promedios_maxs_abs_mensuales/PREC2": "RNpmaxM"
}

console.log('vars:', Object.keys(vars));
//var_list - lista con variables 
//var_prop - objeto de variables
//root - div para colocar
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

function del_id(id){
    document.getElementById(id).remove();
    points[id.split('_')[1]].remove();
}

function update_marker(e){
        idpoint= e.path[0].id.split('_')[1];
        new_lat=document.getElementById("inlat_"+idpoint).value;
        new_lon=document.getElementById("inlon_"+idpoint).value;
        if (new_lat> lat_min && new_lat<=lat_max && new_lon>lon_min && new_lon<lon_max){
            points[idpoint].setLatLng([new_lat, new_lon]);
        }
}
//agrega punto
function add_vars(vars, root, lat, lon, title='titulo'){
    map.closePopup();
    var nid=title+'*'+lat+','+lon;
    points[title]=L.marker([lat,lon],
        {
            icon: new L.DivIcon({
                className: 'my-div-icon',
                html: '<img class="my-div-img" src="img/thumbtack-solid2.svg"/>'+
                    '<span  >'+title.replace('-','_')+'</span>'
            })
        }
  
    )
        .addTo(map);

    let idmain='div_'+title;
    let div_main = $('<div id='+idmain+' class="div_sel" > </div>').prependTo(root);
    let div = $('<div >   <p>'+ title+': </p></div>').appendTo(div_main);
    let in_lat = $('<label for=inlat_'+title+'> Lat: </label>'+
            '<input min=\"'+lat_min+'\" max= \"'+lat_max+'\" id=\"inlat_'+title+'\" type=\"number\" value=\"'+
            lat+'\" step=0.001><br>').appendTo(div);
    let in_lon = $('<label for=inlon_'+title+'> Lon: </label>'+
            '<input min=\"'+lon_min+'\" max= \"'+lon_max+'\" id=\"inlon_'+title+'\" type=\"number\" value=\"'+
            lon+'\" step=0.001>').appendTo(div);
    document.getElementById("inlat_"+title).addEventListener('change', update_marker);
    document.getElementById("inlon_"+title).addEventListener('change', update_marker);
    //in_lon.addEventListener('change', update_marker);
    let btn = $('<p><button onclick=\"del_id(\''+idmain+'\')\"> Eliminar punto </button></p>');
    btn.appendTo(div);
    let div_vars = $('<div>  </div>').appendTo(div_main);
    for (const var_obj in vars){
        add_chkbox(vars[var_obj], var_obj, div_main, nid);
    }
    npoints+=1;
}

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
    var req_list=[];
    name_layers=[];
    el_check.forEach(function(idname){
        var info = idname.split('*');
        var layer=info[2];
        var latlon=points[info[0]].getLatLng();
        console.log('latlon:', latlon);
        var lon= latlon['lng'];
        var lat= latlon['lat'];
        var name_key= labels[info[2]];//.slice(6,-1);
        name_layers.push(info[0]+'_'+name_key);
        req_list.push(get_request(urlbase, rtype, layer, time, lon, lat,
            format='text/csv'));
    });
    get_csv(req_list);
}

function gen_csv(){
    let meses=[["Enero"], ["Febrero"], ["Marzo"], ["Abril"],
        ["Mayo"], ["Junio"], ["Julio"], ["Agosto"],
        ["Septiembre"], ["Octubre"], ["Noviembre"], ["Diciembre"]];
    let csv_obj={
        'mensuales':{
            "fields": ['mes'] ,
            "data" : meses},
        'diarios':{
            "fields": ['Dia juliano'],
            "data" : []}
    }
        let dias=[];
        dias.length=365;
        for (let n=0; n<365;n++){
            dias[n]=[n+1];
        }
    csv_obj.diarios.data= dias;
    let ndia=1;
    let nmens=1;

    series.forEach(function(e_serie){
        if (e_serie.data.length==12){
            csv_obj.mensuales.fields.push(e_serie.name);
            meses.forEach(function (mes, k){
                csv_obj.mensuales.data[k][nmens]=e_serie.data[k][1];
            });
            nmens+=1;
        }
        else if (e_serie.data.length==365){
            csv_obj.diarios.fields.push(e_serie.name);
            dias.forEach(function( dia, k){
                csv_obj.diarios.data[k][ndia]= e_serie.data[k][1];
            });
            ndia+=1;
        }
    });
    let header='';
    for (escala in csv_obj){
        if (csv_obj[escala].data[0].length>1){
            header="# Grupo Interacción Océano-Atmósfera\n";
            header+="# Atlas Meteorológico del Golfo de México\n";
            header+= "# Series de tiempo correspondientes a datos "+ escala + "\n";
            var csv= Papa.unparse(csv_obj[escala]);
            let link = document.createElement('a');
            link.download = "AMGM_series_"+escala+".csv";
            let blob = new Blob([header+csv], {type:'text/plain'});
            //var link= document.getElementById('download_csv');
            //link.href = csv_file;
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
        }
    }

}
