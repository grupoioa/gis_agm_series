wms_args = {
    version: '1.3.0',
    tileSize: 256,
    opacity: 0.65,
    BELOWMINCOLOR: 'extend',
    ABOVEMAXCOLOR: 'extend',
    format: 'image/gif',
    transparent: 'true',
    TIME: '2018-04-16',
};
//objeto con definición de capas para cada variable
var wms_info={
    'Temperatura':{
        'Promedio Mensual':{
            'layers':"atlas_mensuales/T2",
            'styles':'raster/tempatlas',
            'COLORSCALERANGE': '-15,50',
            'NUMCOLORBANDS': '65',
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
        'Dir Mensual':{
            'layers':"atlas_mensuales/U10:V10-dir",
        },
        'Promedio Mensual':{
            'layers':"atlas_mensuales/MAGNITUD_VIENTO",
            'styles':'default-scalar/windatlas',
            'COLORSCALERANGE': '0,60',
            'NUMCOLORBANDS': '250',
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


