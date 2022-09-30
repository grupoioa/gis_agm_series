//objeto con definición de capas para cada variable
var vars={
    'Temperatura':{
        'Promedio Mensual':{
            'value':"atlas_mensuales/T2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"T2M",
            "type" : "mensual",
        },
        'Promedio Diario':{
            "value":"atlas_diario/T2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"T2D",
            "type" : "diario",
        },
        'Máxima Absoluta Diaria':{
            "value":"atlas_maxs_abs_diarios/T2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"T2maxD",
            "type" : "diario",
        },
        'Máxima Absoluta por Mes':{
            "value":"atlas_maxs_abs_mensuales/T2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"T2maxM",
            "type" : "mensual",
        },
        'Promedio de Máx. Abs. Mensuales':{
            "value":"atlas_promedios_maxs_abs_mensuales/T2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"T2pmaxM",
            "type" : "mensual",
        },
        'Promedio Mensual de Mínimas':{
            "value":"atlas_promedios_mins_mensuales/T2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"T2pminM",
            "type" : "mensual",
        },
        'Minima Absoluta por Mes':{
            "value":"atlas_mins_abs_mensuales/T2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"T2minM",
            "type" : "mensual",
        },
    },
    'Viento':{
        'Promedio Mensual':{
            "value":"atlas_mensuales/U10:V10-mag",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"WSM",
            "type" : "mensual",
        },
        'Promedio Diario':{
            "value":"atlas_diario/U10:V10-mag",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"WSD",
            "type" : "diario",
        },
        'Máxima Absoluta Diaria':{
            "value":"atlas_maxs_abs_diarios/U10:V10-mag",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"WSmaxD",
            "type" : "diario",
        },
        'Máxima Absoluta por Mes':{
            "value":"atlas_maxs_abs_mensuales/U10_MAX:V10_MAX-mag",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"WSmaxM",
            "type" : "mensual",
        },
        'Promedio de Máx. Abs. Mensuales':{
            "value":"atlas_promedios_maxs_abs_mensuales/U10:V10-mag",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"WSpmaxM",
            "type" : "mensual",
        },
    },
    'Precipitación':{
        'Promedio Acumulada Mensual':{
            "value":"atlas_mensuales/PREC2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"RNM",
            "type" : "mensual",
        },
        'Promedio Acumulada Diaria':{
            "value":"atlas_diario/PREC2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"RND",
            "type" : "diario",
        },
        'Máxima Absoluta Diaria':{
            "value":"atlas_maxs_abs_diarios/PREC2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"RNmaxD",
            "type" : "diario",
        },
        'Máxima Absoluta por Mes':{
            "value":"atlas_maxs_abs_mensuales/PREC2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"RNmaxM",
            "type" : "mensual",
        },
        'Promedio de Máx. Abs. Mensuales':{
            "value":"atlas_promedios_maxs_abs_mensuales/PREC2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"RNpmaxM",
            "type" : "mensual",
        },
    }
}
        
var_anuales = {
    'Temperatura':{
        'Máx. Abs. por mes':{},
        'Min. Abs. por mes':{},
        'Prom. Máx. diarias por mes':{},
        'Prom. Min. diarias por mes':{},
    },
    'Viento': {
        'Máx. Abs. por mes':{},
        'Prom. por mes':{},
    },
    'Precipitación': {
        'Máx. Acumulada Diaria por mes':{},
        'Acumulada por mes':{},
    },
};

function fill_anuales( obj_anual, varname, path, label){
    for (let i=1980; i<2017; i++){
        obj_anual[varname][i] = {
            "value": path,
            'time': i+"-01-01T00:00:00.000Z/"+i+"-12-31T23:00:00.000Z",
            "label": label+i,
            "type" : "anual",
        }
    }
}

fill_anuales(var_anuales['Temperatura'],'Máx. Abs. por mes', "atlas_max_anuales/MAXT2", "T2maxA");
fill_anuales(var_anuales['Temperatura'],'Min. Abs. por mes', "atlas_min_anuales/MINT2", "T2minA");
fill_anuales(var_anuales['Temperatura'],'Prom. Máx. diarias por mes', "atlas_max_anuales/MAXMEANT2", "T2pmaxA");
fill_anuales(var_anuales['Temperatura'],'Prom. Min. diarias por mes', "atlas_min_anuales/MINMEANT2", "T2pminA");
fill_anuales(var_anuales['Viento'],'Máx. Abs. por mes', "atlas_max_anuales/MAXRAPIDEZ", "WSmaxA");
fill_anuales(var_anuales['Viento'],'Prom. por mes', "atlas_prom_anuales/RAPIDEZ", "WSA");
fill_anuales(var_anuales['Precipitación'],'Máx. Acumulada Diaria por mes', "atlas_max_anuales/MAXPREC", "RNmaxA");
fill_anuales(var_anuales['Precipitación'],'Acumulada por mes', "atlas_prom_anuales/ACUMPREC", "RNA");
console.log('anuales:', var_anuales);
