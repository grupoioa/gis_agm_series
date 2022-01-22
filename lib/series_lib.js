//const urlbase="'http://132.248.8.238:8080/ncWMS_2015/wms?REQUEST=GetTimeseries&LAYERS=atlas_diario/T2&QUERY_LAYERS=atlas_diario/T2&BBOX=-99.5693,16.0462,-78.5111,32.8928&SRS=CRS:84&FEATURE_COUNT=5&HEIGHT=600&WIDTH=750&X=239&Y=335&STYLES=default/default&VERSION=1.1.1&TIME=2018-01-01T00:00:00.000Z/2018-12-31T00:00:00.000Z&INFO_FORMAT=text/csv'"
//const urlbase="'http://132.248.8.238:8080/ncWMS_2015/wms?REQUEST=GetTimeseries&LAYERS=atlas_diario/T2&QUERY_LAYERS=atlas_diario/T2&BBOX=-99.5693,16.0462,-78.5111,32.8928&SRS=CRS:84&HEIGHT=600&WIDTH=750&X=239&Y=335&STYLES=default/default&VERSION=1.1.1&TIME=2018-01-01T00:00:00.000Z/2018-12-31T00:00:00.000Z&INFO_FORMAT=image/png'"
//bbox=-99.56926749939244,16.4910888671875,-78.51112343078334,32.44792175292969
//valores para 1.3.0
//CRS en lugar de SRS
//i,j en lugar de x,y
//
//get map w/animation
//http://132.248.8.238:8080/ncWMS_2015/wms?REQUEST=GetMap&LAYERS=atlas_mensuales/T2&QUERY_LAYERS=atlas_mensuales/T2&BBOX=-99.56926749939244,16.4910888671875,-78.51112343078334,32.44792175292969&CRS=CRS:84&HEIGHT=600&WIDTH=750&I=0&J=599&STYLES=default/default&VERSION=1.3.0&TIME=2018-01-01T00:00:00.000Z/2018-12-01T00:00:00.000Z&FORMAT=image/gif&ANIMATION=true

function get_request(url_base,//http://132.248.8.238:8080/ncWMS_2015/wms?
        type,//REQUEST=GetTimeseries
        layers,//&LAYERS=atlas_diario/T2&QUERY_LAYERS=atlas_diario/T2
        t,//&TIME=2018-01-01T00:00:00.000Z/2018-12-31T00:00:00.000Z
        lon,//&i=239
        lat,//&j=335
        format='image/png',//&INFO_FORMAT=image/png'"
        h=600,//&HEIGHT=600
        w=750,//&WIDTH=750
        styles='default/default',//&STYLES=default/default
        crs='CRS:84',
        ver='1.3.0',//&VERSION=1.1.1
        bbox='-99.56926749939244,16.4910888671875,-78.51112343078334,32.44792175292969',
        ){
        bbox_list=bbox.split(',');
        xmin=bbox_list[0];
        ymin=bbox_list[1];
        xmax=bbox_list[2];
        ymax=bbox_list[3];
        x=parseInt(w*Math.abs(lon-xmin)/Math.abs(xmax-xmin));
        y=parseInt(h*Math.abs(lat-ymax)/Math.abs(ymax-ymin));
        req_str= url_base+'wms?'+
                'REQUEST='+type+'&'+
                'LAYERS='+layers+'&'+
                'QUERY_LAYERS='+layers+'&'+
                'TIME='+t+'&'+
                'I='+x+'&'+
                'J='+y+'&'+
                'BBOX='+bbox+'&'+
                'CRS='+crs+'&'+
                'HEIGHT='+h+'&'+
                'WIDTH='+w+'&'+
                'STYLES='+styles+'&'+
                'VERSION='+ver+'&';
        if (type=='GetTimeseries')
                req_str+='INFO_FORMAT='+format;
        else
                req_str+='FORMAT='+format;
        return req_str;
}
