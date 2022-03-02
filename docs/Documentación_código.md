# Documentación del código del Sitio Web del AMGM

## Objetivo
Señalar cuales son los elementos con los que se ha constuido el sitio web para la descarga de series de datos correspondientes a la climatología del Golfo de México.

## Partes

- css
        
      Hoja de estilo de la página web
      - series.css 
          
- data

      Información desplegada directamente en el mapa.
      - PuntosRelevantes.js : Puntos de referencia en el área mostrada (fuente: https://cnh.gob.mx/informacion/nombre-de-pozo/)
      - mensual.json : Mapa base delimitado al área de interés (fuente: www.google.com)
      
- docs 

      Documentantación sobre la página web.
      - img : carpeta con imágenes utilizadas en la documentación en formato PNG
      - Documentación_código.md : Documentación en formato MarkDown
      - manual.html : Código del documento de la página web en formato HTML
      - manual_st.md : enlace al manual de la página en formato MarkDown

- lib

      Directorio de  implementación de todos los estadísticos de las series de datos, archivos para cargar módulos y archivos JavaScript (JS). Las leyendas corresponden a los nombres de las capas.
       
       - images : carpeta con imágenes de simbología utilizada en la página web
       
       echarts.min.js : E-Charts es una biblioteca de visualización JavaScript de código abierto basada en web (fuente: https://echarts.apache.org/en/index.html)
       
       leaflet.css : Hoja de estilo de Leaflet.
       
       leaflet.js  : Leaflet es una biblioteca JavaScript de código abierto para mapas interactivos compatibles con dispositivos móviles. (fuente: https://leafletjs.com/SlavaUkraini/)
       
       papaparse.js  : Analizador CSV integrado en el navegador para Java Script.
       
       papaparse.min.js 
       
       series_lib.js 
       
- README.md


- agm_series.html :  Enlace al manual en la página.


- series.js : Módulos y archivos JavaScript para el mahejo de las series de datos.
