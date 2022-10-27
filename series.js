
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
//image layer
imageBounds=[[16.5, -99.53], [32.5, -78.5]];
var mbase = L.imageOverlay('img/mapa_base.png', imageBounds, )
.setOpacity(0.8)
.bringToBack()
.setZIndex(-1);
//.addTo(map);
//crea mapa de leaflet
var map = L.map('map', {
        //center: bounds.getCenter(),
        //center:[19.3262492550136, -99.17620429776193],//coordenadas CU
        center:[ 25.008, -92.153 ],
        zoomSnap: 0.1,
        zoom: 6.5,
        minZoom:5,
        maxZoom:20,
        layers: [ back_layer, mbase],
        maxBounds: bounds,
        maxBoundsViscosity: 1,
        });

if (window.innerWidth<600){
    map.setZoom(5);
}
//L.imageOverlay("img/ioa_original.svg", [[22, -99], [20, -97]]).addTo(map);

//crea y dibuja área de trabajo
//r = L.rectangle(bounds, {color: "#caf0f8", fill: false, weight:3})
    //.addTo(map);

//crea etiquetas de puntos de interés
L.geoJSON(pts_interes,{
    pointToLayer: function( geoJsonPoint, latlng){
        return L.marker(latlng,
{
    icon: new L.DivIcon({
        className: 'my-div-icon',
        html: '<img src="img/bullseye-solid2.svg"/>'+
              '<span class="map-txt">'+
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
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
myChart.resize({
    width: 'auto',
    height: '600px'
});
var jdays = [];
for (let j=1; j<366; j++){
    jdays.push(j);
}
var name_month =[
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
];
//indica el 1o de mes en juliano
function get_1j(jday, m){
    var days = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
    return days.includes(jday+1);
}
var colors = {
    'RN': '#21618C',
    'WS': '#1B2631', 
    'T': '#BB8FCE',
};

myChart.setOption({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            animation: false,
            type: 'cross',
        },
        showContent: false,
    },
    grid:{
        right: '15%',
        left: '12%',
    },
    backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
        {
            offset: 0,
            color: '#f7f8fa'
        },
        {
            offset: 1,
            color: '#D5D8DC',
        }
    ]),
    title:{
        text:"Climatología 1980-2016",
        //subtext:'Series de tiempo',
    },
    xAxis: [
        //eje juliano
        {
            type: 'category',
            data: jdays,
            axisLabel:{
                //interval: 14,
            },
            splitLine:{
                show:true,
                interval: get_1j,
                lineStyle: {
                    color: '#aaa',
                    //color: ['#aaa', '#ddd'],
                },
            },
        },
        //eje mes
        {
            type: 'category',
            data: name_month,
            axisTick: {show : false},

        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'Temperatura',
            position: 'left',
            nameLocation: 'start',
            axisTick:{ show: true},
            axisLine:{
                show: true,
                lineStyle:{
                    color: colors['T']
                }
            },
            axisLabel:{
                formatter: '{value} C',
                hideOverlap: true,
            }
        },
        {
            type: 'value',
            name: 'Precipitación',
            position: 'left',
            nameLocation: 'end',
            offset: 40,
            axisTick:{ show: true},
            axisLine:{
                show: true,
                lineStyle:{
                    color: colors['RN']
                }
            },
            axisLabel:{
                formatter: '{value} mm'
            }
        },
        {
            type: 'value',
            name: 'Viento',
            position: 'right',
            nameLocation: 'start',
            axisTick:{ show: true},
            axisLine:{
                show: true,
                lineStyle:{
                    color: colors['WS']
                }
            },
            axisLabel:{
                formatter: '{value} m/s'
            }
        },

    ],
    series: [],
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

},{notMerge: true});

window.onresize = function(){
    myChart.resize();
    console.log(window.innerWidth);
    if (window.innerWidth<600){
        map.setZoom(5.0);
    }
    else{
    map.setZoom(6.5);
    }
};
function plot(series, legend){
    var option = {
        legend:{
            //type: 'scroll',
            orient: 'horizontal',
            top: 45,
            //left: 100,
            right: 10,
            height: 500,
            width: 200,
            data: legend
        },
        series: series,
    };

    myChart.setOption(option, );
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
                //output.push([row[0], row[1]]);
                output.push( row[1]);
            }
            output.pop();
            output.shift();
            series.push({'name': name_layers[i],
                'xAxisIndex': 0,
                'type': 'line',
                //'symbol':'circle',
                'data': output,
                'tooltip':{'valueFormatter':(value) => value.toFixed(1)}
            });
            //selecciona eje X
            if (output.length == 12){
                series[series.length-1].xAxisIndex = 1;
            }
            //selecciona eje Y
            vartype = name_layers[i].split('_')[1]
            if (vartype.slice(0,2) == "T2"){
                series[series.length-1].type = "line";
                series[series.length-1].symbol = "emptyCircle";
                series[series.length-1].symbolSize = 6;
                series[series.length-1].yAxisIndex = 0;
            }
            if (vartype.slice(0,2) == "RN"){
                series[series.length-1].type = "bar";
                series[series.length-1].yAxisIndex = 1;
            }
            if (vartype.slice(0,2) == "WS"){
                series[series.length-1].type = "line";
                series[series.length-1].symbol = "arrow";
                series[series.length-1].symbolSize = 10;
                series[series.length-1].yAxisIndex = 2;
            }

        } catch (err){
            console.error('parse error', err)
        }
        i=i+1;
    }
    console.log('series:', series);
    plot(series, name_layers);
}
const div_map = document.getElementById("map");
div_map.addEventListener("contextmenu", click_sec, true );

function click_sec(e){
	console.log('click der',e);
	console.log(e.x, e.y)
	e.preventDefault();
}
//definición de función al mover el mapa
function onMapMove(e) {
    lat= e.latlng['lat'];
    lon= e.latlng['lng'];
    if (lat>lat_min && lat<lat_max && lon>lon_min && lon<lon_max){
        document.getElementById('inlon_main').value = lon.toFixed(8);
        document.getElementById('inlat_main').value = lat.toFixed(8);
    }
}
//lista de puntos
let points={};
let npoints=0;
function show_cfg(){
    cfg = document.getElementById('div_cfg');
    cfg.style.visibility='visible';
}
//definición de función botón agregar
function addMark(){
    lon= document.getElementById('inlon_main').value
    lat= document.getElementById('inlat_main').value
    if (lat>lat_min && lat<lat_max && lon>lon_min && lon<lon_max){
        console.log('test',lat,lon);
	add_vars(vars, '#div_tabs', '#div_puntos', lat, lon, 'punto-'+npoints);
    }
    show_cfg();
}
//definición de función al hacer click en el mapa
function onMapClick(e) {
    lat= e.latlng['lat'];
    lon= e.latlng['lng'];
    if (lat>lat_min && lat<lat_max && lon>lon_min && lon<lon_max){
        console.log('test',lat,lon);
	add_vars(vars, '#div_tabs', '#div_puntos', lat, lon, 'punto-'+npoints);
    }
    show_cfg();

}
//evento para movimiento en mapa
map.on('mousemove', onMapMove);
//evento para click en mapa
map.on('click', onMapClick);
tp ={}
function showMark( src="img/location-dot-solid.svg"){
    try{
        tp.remove();
    }catch(error){
        console.log('error');
    }
    lon= parseFloat(document.getElementById('inlon_main').value)
    lat= parseFloat(document.getElementById('inlat_main').value)
    if (lat>lat_min && lat<lat_max && lon>lon_min && lon<lon_max){
        tp =L.marker([lat,lon],
        {
            icon: new L.DivIcon({
                className: 'my-div-icon',
                html: '<img class="my-div-img" src="'+src+'" />'+
                    '<span  class="map-txt"> P('+lon.toFixed(4)+','+lat.toFixed(4)+')</span>'
            })
        }
  
    )
        .addTo(map);
    }
}

//función que oculta menús
function toggle_opt(ele, display="block"){
    if (ele.style.display === display){
        ele.style.display = "none";
    }else {
        ele.style.display = display;
    }
}
//Crea checkbox con clase "chk_var"
//var_gral - objeto de variables
//var_anuales - objeto de variables anuales
//varname - nombre de la variable
//root - div para colocar
//class_btn - clase para el botón
//id - id base para los checkbox
function add_chkbox(var_gral, var_anuales, varname, root, id ){
    var id_var = root.id+'_'+varname;
    //creando botón de variable
    let btn_var = $('<button type="button" class= "plegable_btn"  >'+ varname+ '</button>').appendTo(root)[0];
    //creando div
    let div_var = $('<div class= "plegable" id="'+ id_var +'"> </div>').appendTo(root)[0];
    btn_var.onclick = function(){toggle_opt(div_var)};
    let idfull=''

    for (const var_obj in var_gral){
        id_full=[id, varname, var_obj].join('*');
        let chkbox= $('<label><input type="checkbox" class="chk_var" id="'
                +id_full+'" value="' + var_obj +
                '" >'+ var_obj + ' </label> ');
        chkbox.appendTo(div_var);
    }
    //recorre claves anuales
    for (const var_name_anual in var_anuales){
        let btn_var_anuales = $('<button type="button" class= "plegable_btn2 " >'+ var_name_anual +'</button>').
            appendTo(div_var)[0];
        let div_var_anuales = $('<div class= "div_anual plegable" id="'+ id_var + ' '+ var_name_anual+'"> </div>').
            appendTo(div_var)[0];
        btn_var_anuales.onclick = function(){toggle_opt(div_var_anuales, "flex")};
        for (const var_obj in var_anuales[var_name_anual]){
            id_full = [id, varname, var_name_anual +' '+ var_obj].join('*');
            let chkbox_anual = $('<label><input type="checkbox" class="chk_var" id="'+
                id_full+ '" value="' + var_obj +
                '" >'+ var_obj + ' </label> <br>');
            chkbox_anual.appendTo(div_var_anuales);
        }
    }
}

function del_id(id){
    document.getElementById(id).remove();
    val_id = id.split('_')[1]
    document.getElementById('tab_'+val_id).remove();
    points[val_id].remove();
}

function update_marker(idpoint){
        new_lat=document.getElementById("inlat_"+idpoint).value;
        new_lon=document.getElementById("inlon_"+idpoint).value;
        if (new_lat> lat_min && new_lat<=lat_max && new_lon>lon_min && new_lon<lon_max){
            points[idpoint].setLatLng([new_lat, new_lon]);
        }
}
function tabs_hide(){
    tabs_all = document.getElementsByClassName('tab-content');
    for (let i=0; i<tabs_all.length; i++){
        tabs_all[i].style.display = "none";
    }
}
function tab_show(idtab){
    tabs_hide();
    document.getElementById(idtab).style.display = "block";
}
//agrega punto
function add_vars(vars, tabs, root, lat, lon, title='titulo'){
    map.closePopup();
    //crea punto
    var nid=title+'*'+lat+','+lon;
    points[title]=L.marker([lat,lon],
        {
            icon: new L.DivIcon({
                className: 'my-div-icon',
                html: '<img class="my-div-img" src="img/location-dot-red.svg"/>'+
                    '<span  class="map-txt">'+title.replace('-','_')+'</span>'
            })
        }
  
    )
        .addTo(map);
    tabs_hide();
    //crea ventana con opciones
    let idmain='div_'+title;
    let div_main = $('<div id='+idmain+' class="tab-content" > </div>').appendTo(root);
    //tabs
    let idtab= 'tab_'+title;
    let div_tab = $('<button class="tab" type="button" onclick="tab_show(\''+
        idmain+'\')" '+'id="'+idtab+'">'+ title+ '</button>').appendTo(tabs);
    let div = $('<div > <h4> Opciones de punto </h4> </div>')
        .appendTo(div_main);
    let in_name = $('<label > Nombre: <input size=12 value="'+ title+ '" /> </label>').appendTo(div);
    //latitud
    let in_lat = $('<label for=inlat_'+title+'>'+
        'Latitud: <input min=\"'+lat_min+
        '\" max= \"'+lat_max+
        '\" id=\"inlat_'+title+
        '\" type=\"number\" value=\"'+
        lat+'\" step=0.001 /> </label>').appendTo(div);
    document.getElementById("inlat_"+title).addEventListener('change', function(){update_marker(title)});
    //longitud
    let in_lon = $('<label for=inlon_'+title+'> '+
        'Longitud: <input min=\"'+lon_min+
        '\" max= \"'+lon_max+
        '\" id=\"inlon_'+title+
        '\" type=\"number\" value=\"'+
        lon+'\" step=0.001 /> </label> ').appendTo(div);

    document.getElementById("inlon_"+title).addEventListener('change', function(){update_marker(title)});
    //in_lon.addEventListener('change', update_marker);
    //Variables y estadísticos
    let div_vars = $('<div style= "width: 100%;" id="div_vars"> <h4> Selecciona estadístico por variable </h4>  </div>').
        appendTo(div_main)[0];
    //recorre claves principales (nombres de variables)
    for (const var_obj in vars){
        add_chkbox(vars[var_obj], var_anuales[var_obj], var_obj, div_vars, nid);
    }
    let btn = $('<p><button onclick=\"del_id(\''+idmain+'\')\"> Eliminar punto </button></p>');
    btn.appendTo(div);
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
        var varname= info[2];
        var varsta = info[3];
        var year_str = varsta.split(' ').slice(-1);
        var year = parseInt(year_str);
        if (isNaN(year)){
            var layer= vars[varname][varsta]['value'];
            var vtime= vars[varname][varsta]['time'];
            var name_key= vars[varname][varsta]['label'];
        }else{
            var layer= var_anuales[varname][varsta.slice(0, -5)][year_str]['value'];
            var vtime= var_anuales[varname][varsta.slice(0, -5)][year_str]['time'];
            var name_key= var_anuales[varname][varsta.slice(0, -5)][year_str]['label'];
        }
        var latlon=points[info[0]].getLatLng();
        console.log('latlon:', latlon, layer, info);
        var lon= latlon['lng'];
        var lat= latlon['lat'];
        name_layers.push(info[0]+'_'+name_key);
        req_list.push(get_request(urlbase, rtype, layer, vtime, lon, lat,
            format='text/csv'));
    });
    console.log(req_list);
    get_csv(req_list);
    show_plot();
}

function show_plot(){
    sel = document.getElementById("cmain");
    sel.style.visibility = "visible";
}

function close_plot(){
    sel = document.getElementById("cmain");
    sel.style.visibility = "hidden";

}

function show_sel(){
    sel = document.getElementById("csel");
    sel.style.display = "block";
    sel.style.zIndex=1;
}
function hide_sel(){
    sel = document.getElementById("div_cfg");
    sel.style.visibility= "hidden";
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
        console.log('eserie', e_serie);
        if (e_serie.data.length==12){
            csv_obj.mensuales.fields.push(e_serie.name);
            meses.forEach(function (mes, k){
                csv_obj.mensuales.data[k][nmens]=e_serie.data[k];
            });
            nmens+=1;
        }
        else if (e_serie.data.length==365){
            csv_obj.diarios.fields.push(e_serie.name);
            dias.forEach(function( dia, k){
                csv_obj.diarios.data[k][ndia]= e_serie.data[k];
            });
            ndia+=1;
        }
    });
    console.log('csv:', csv_obj);
    let header='';
    for (escala in csv_obj){
        if (csv_obj[escala].data[0].length>1){
            header="# Grupo Interacción Océano-Atmósfera\n";
            header+="# Atlas Meteorológico del Golfo de México\n";
            header+= "# Series de tiempo correspondientes a datos "+ escala + "\n";
            Object.keys(points).forEach(function( pt, k){
                latlon = points[pt].getLatLng(); 
                header += "# " + pt + " lon: "+ latlon['lng']+
                    " lat: "+ latlon['lat']+"\n";
            });
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

function ayuda_toggle(){
    var sel = document.getElementById('div_ayuda');
    if (sel.style.display == 'none'){
        sel.style.display = 'flex';
    }
    else{
        sel.style.display = 'none';
    }
}
var mes_date =[
    "2018-01-16T00:00:00.000Z",
    "2018-02-16T00:00:00.000Z",
    "2018-03-16T00:00:00.000Z", 
    "2018-04-16T00:00:00.000Z", 
    "2018-05-16T00:00:00.000Z", 
    "2018-06-16T00:00:00.000Z", 
    "2018-07-16T00:00:00.000Z", 
    "2018-08-16T00:00:00.000Z",
    "2018-09-16T00:00:00.000Z",
    "2018-10-16T00:00:00.000Z",
    "2018-11-16T00:00:00.000Z",
    "2018-12-16T00:00:00.000Z",
]
map.createPane('vars');
map.getPane('vars').style.zIndex = 800;

let var_sel = "Temperatura";
let cbar_txt = "https://pronosticos.atmosfera.unam.mx:8443/ncWMS_2015/wms?SERVICE=WMS&REQUEST=GetLegendGraphic&VERSION=1.3.0"
wms_args['TIME'] =mes_date[0];
let ov = L.tileLayer.wms('https://pronosticos.atmosfera.unam.mx:8443/ncWMS_2015/wms?',
    {...wms_args, ...wms_info[var_sel]['Promedio Mensual'], pane:'vars'});
function toggle_var(v){
    var_sel = v;
    if (map.hasLayer(ov))
        map.removeLayer(ov);
    if (ov.wmsParams.layers == wms_info[v]['Promedio Mensual'].layers)
        return 0;
    wms_args['TIME'] =mes_date[slider.value];
    ov = L.tileLayer.wms('https://pronosticos.atmosfera.unam.mx:8443/ncWMS_2015/wms?',
        {...wms_args, ...wms_info[v]['Promedio Mensual'], pane:'vars'});
    map.addLayer(ov);
    var cbar= document.getElementById("cbar");
    cbar.src=cbar_txt;
    for (p in wms_info[v]['Promedio Mensual']){
        cbar.src+='&'+p+'='+ wms_info[v]['Promedio Mensual'][p];
    }
}

//slider
var slider = document.getElementById("slider_month");
var mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
slider.oninput = function(){
    document.getElementById("title_month").innerHTML = mes[slider.value];
    toggle_var(var_sel);

}
