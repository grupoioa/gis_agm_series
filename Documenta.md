# Documenta
Regitro de actualizaciones del sitio de descarga de series de tiempo

2022/02/08

Funcionalidades actuales del sitio creado para la descarga de series de tiempo

Capas desplegables

- Temperatura Mensual
- Temperatura horaria
- Temperatura max abs diaria
- Temperatura max abs mensual
- Temperatura max promedio
- Temperatura min abs
- Temperatura min promedio

Capacidad para hacer acercamientos en el mapa

Capacidad para hacer alejamientos del mapa

Al hacer click en cualquier lado del mapa se activa un 
	PopUp el cual muestra el par
	coordenado  (latitud, longitud).
	
	se muestran también dos opciones
	"Serie de tiempo : (DEGARGAR) (PLOT)

	A la derecha del mapa se despliega un gráfico
	que muestra las curvas generadas a partir de 
	las series de datos de todaslas variables
	para la posición seleccionada.

En el Popup,
	seleccionando la opción DESCARGAR
		Se descarga la serie de datos relacionada
		con la capa elegida al principio y el punto
		elegido manualmente.
		
		Los datos se obtienen en formato .csv

		El nombre que se le asigna es:
		"T2-timeseries.csv"

	seleccionando la opción PLOT
		Se despliega en la misma ventana un gráfico
		con la curva generada con los datos del 
		parámetro (capa) seleccionado. Los ejes
		son: Time vs air_temperature(C)
		El título mostrado del gráfico es:
		"Timeseries of T2 at Lat,Lon .

PROPUESTAS

2022/02/08-mayra

la gráfica que se genera del popup salga en otra ventana
no en la misma

La gráfica que se genera automáticamente, solamente dé los
valores que se relacionan a un valor dela serie de datos, es
decir, que no interpole.

