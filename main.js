import './style.css'
import GeoJSON from 'ol/format/GeoJSON.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import * as geojsonObject from './data.json';
import {fromLonLat, toLonLat} from 'ol/proj.js';
import {toStringHDMS} from 'ol/coordinate';
import {transform} from 'ol/proj';
import styleFunction from './map-styles';
import {overlay, renderPopup} from './popup';
import registerSk42 from './sk42-register';


const WGS_84_CENTER_LON_LAT = [30.325946940614056, 59.93565639262312];
const centerWebMercator = fromLonLat(WGS_84_CENTER_LON_LAT);
registerSk42();

const features = new GeoJSON().readFeatures(geojsonObject, {
  dataProjection: 'EPSG:4326', // проекция в которой хранятся данные в GeoJson
  featureProjection: 'EPSG:3857' // проекция в которой нужно отрисовать фичи
});

const vectorSource = new VectorSource({});
vectorSource.addFeatures(features);

const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: styleFunction,
});

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    vectorLayer,
  ],
  target: 'map',
  overlays: [overlay],
  view: new View({
    center: centerWebMercator,
    zoom: 17,
  }),
});

map.on('loadend', (evt) => {
  const coordinate = centerWebMercator;
  const {hdmsWebMerkator, newProjection: hdmsSk42} = getCoordinatesHdms(coordinate, 'EPSG:3857', 'EPSG:4284');
  const {newProjection: hdmsWgs84} = getCoordinatesHdms(coordinate, 'EPSG:3857', 'EPSG:4326');
  renderPopup(coordinate, hdmsWebMerkator, hdmsWgs84, hdmsSk42);
});


map.on('singleclick', function (evt) {
  const coordinate = evt.coordinate;
  const {hdmsWebMerkator, newProjection: hdmsSk42} = getCoordinatesHdms(coordinate, 'EPSG:3857', 'EPSG:4284');
  const {newProjection: hdmsWgs84} = getCoordinatesHdms(coordinate, 'EPSG:3857', 'EPSG:4326');
  renderPopup(coordinate, hdmsWebMerkator, hdmsWgs84, hdmsSk42);
});


/**
 * Преобразование координат из fromProjection в toProjection и далее в формат HDMS
 */
function getCoordinatesHdms(coordinate = [0.00, 0.00], fromProjection, toProjection) {  
  const newProjectionCoordinate = transform(coordinate, fromProjection, toProjection);
  const hdmsWebMerkator = toStringHDMS(toLonLat(coordinate), 2);
  const newProjection = toStringHDMS(newProjectionCoordinate, 2);

  return {
    hdmsWebMerkator,
    newProjection,
  }
}






// function calc() {
  
//   proj4.defs("EPSG:4284","+proj=longlat +ellps=krass +towgs84=25,-141,-78.5,0,-0.35,-0.736,0 +no_defs +type=crs");

//   const sourceProj = new proj4.Proj('WGS84');
//   const destProj = new proj4.Proj('EPSG:4284');

  

//   const p = new proj4.Point(WGS_84_CENTER_LON_LAT[0], WGS_84_CENTER_LON_LAT[1]);
//   const r = proj4.transform(sourceProj, destProj, p);
//   console.log('init coords: ', WGS_84_CENTER_LON_LAT );
//   console.log('proj4.transform ', r)
// }

// calc();