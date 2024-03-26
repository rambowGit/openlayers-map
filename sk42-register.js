import {register} from 'ol/proj/proj4';
import proj4 from 'proj4';

export default function registerSk42() {
  proj4.defs("EPSG:4284","+proj=longlat +ellps=krass +towgs84=25,-141,-78.5,0,-0.35,-0.736,0 +no_defs +type=crs");
  register(proj4);
}