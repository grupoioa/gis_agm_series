//objeto con definición de capas para cada variable
var vars={
    'Temperatura':{
        'Promedio Mensual':{
            'value':"atlas_mensuales/T2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"T2M",
        },
        'Promedio Diario':{
            "value":"atlas_diario/T2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"T2D",
        },
        'Máxima Absoluta Diaria':{
            "value":"atlas_maxs_abs_diarios/T2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"T2maxD",
        },
        'Máxima Absoluta por Mes':{
            "value":"atlas_maxs_abs_mensuales/T2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"T2maxM",
        },
        'Promedio de Máx. Abs. Mensuales':{
            "value":"atlas_promedios_maxs_abs_mensuales/T2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"T2pmaxM",
        },
        'Promedio Mensual de Mínimas':{
            "value":"atlas_promedios_mins_mensuales/T2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"T2pminM",
        },
        'Minima Absoluta por Mes':{
            "value":"atlas_mins_abs_mensuales/T2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"T2minM",
        },
    },
    'Viento':{
        'Promedio Mensual':{
            "value":"atlas_mensuales/U10:V10-mag",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"WSM",
        },
        'Promedio Diario':{
            "value":"atlas_diario/U10:V10-mag",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"WSD",
        },
        'Máxima Absoluta Diaria':{
            "value":"atlas_maxs_abs_diarios/U10:V10-mag",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"WSmaxD",
        },
        'Máxima Absoluta por Mes':{
            "value":"atlas_maxs_abs_mensuales/U10_MAX:V10_MAX-mag",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"WSmaxM",
        },
        'Promedio de Máx. Abs. Mensuales':{
            "value":"atlas_promedios_maxs_abs_mensuales/U10:V10-mag",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"WSpmaxM",
        },
    },
    'Precipitación':{
        'Promedio Acumulada Mensual':{
            "value":"atlas_mensuales/PREC2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"RNM",
        },
        'Promedio Acumulada Diaria':{
            "value":"atlas_diario/PREC2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"RND",
        },
        'Máxima Absoluta Diaria':{
            "value":"atlas_maxs_abs_diarios/PREC2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"RNmaxD",
        },
        'Máxima Absoluta por Mes':{
            "value":"atlas_maxs_abs_mensuales/PREC2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"RNmaxM",
        },
        'Promedio de Máx. Abs. Mensuales':{
            "value":"atlas_promedios_maxs_abs_mensuales/PREC2",
            'time':"2018-01-01T00:00:00.000Z/2018-12-31T23:00:00.000Z",
            'label':"RNpmaxM",
        },
    }
}
        
for (let i=1980; i<2017; i++){
    vars['Temperatura']['Máx. Abs. por mes ('+i+')'] = {
        "value":"atlas_max_anuales/MAXT2",
        'time': i+"-01-01T00:00:00.000Z/"+i+"-12-31T23:00:00.000Z",
        "label": "T2maxA"+i,
    }
}

