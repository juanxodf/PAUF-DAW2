import { Routes } from '@angular/router';
import { DetalleAnillo } from './anillo/detalle-anillo/detalle-anillo';
import { Busqueda } from './anillo/busqueda/busqueda';
import { BusquedaRaza } from './raza/busqueda-raza/busqueda-raza';
import { DetalleRaza } from './raza/detalle-raza/detalle-raza';
import { CrearRaza } from './raza/crear-raza/crear-raza';
import { CrearAnillo } from './anillo/crear-anillo/crear-anillo';
import { Buscar} from './personaje/buscar/buscar-personaje';
import { DetallePersonaje } from './personaje/detalle-personaje/detalle-personaje';
import { CrearPersonaje } from './personaje/crear-personaje/crear-personaje';
import { PortadoresComponent } from './portadores-component/portadores-component';
import { ObtenerPregunta } from './partida/obtener-pregunta/obtener-pregunta';
import { EstadisticasPartida } from './partida/estadisticas-partida/estadisticas-partida';

export const routes: Routes = [

    { path: 'detalle-anillo', component: DetalleAnillo },// Ruta para ver las opciones de los anillos
    { path: 'crear-anillo', component: CrearAnillo }, // Ruta para crear un anillo
    { path: 'buscar-anillo', component: Busqueda },    // Ruta para ver los anillos creados

    { path: 'detalle-raza', component: DetalleRaza }, // Ruta para ver las opciones de las razas
    { path: 'busqueda-raza', component: BusquedaRaza }, // Ruta para ver las razas creados
    { path: 'crear-raza', component: CrearRaza},  // Ruta para crear una raza

    { path: 'detalle-personaje', component: DetallePersonaje}, // Ruta para ver las opciones de personajes
    { path: 'buscar-personaje', component: Buscar}, // Ruta para ver los personajes
    { path: 'crear-personaje', component: CrearPersonaje}, // Ruta para crear un personaje

    {path: 'editar/:id', component:CrearPersonaje},  // Ruta para editar un personaje

    {path: 'portadores-component', component: PortadoresComponent}, // Ruta para ver los portadores de los anillos
    {path: 'partida', component: ObtenerPregunta}, // Ruta para jugar una partida
    {path: 'estadisticas-partida', component: EstadisticasPartida}, // Ruta de estadísticas de partidas


];
