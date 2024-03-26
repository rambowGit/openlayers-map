import Overlay from 'ol/Overlay.js';


/**
 * Popup rendering
 * @param {*} webMerkatorCoord 
 * @param {*} wgs84Coord 
 * @param {*} sk42Coord 
 */

export function renderPopup(position = [0.00, 0.00], webMerkatorCoord = [0.00, 0.00], wgs84Coord = [0.00, 0.00], sk42Coord = [0.00, 0.00]) {
  
  content.innerHTML = '<p>WebMerkator (EPSG:3857):</p><code>' + webMerkatorCoord + '</code><hr>';
  content.innerHTML +='<p>WGS84 (EPSG:4326):</p><code>' + wgs84Coord + '</code><hr>';
  content.innerHTML +='<p>СК-42 (EPSG:4284):</p><code>' + sk42Coord + '</code><hr>';

  overlay.setPosition(position);
  
}


/**
 * Elements that make up the popup.
 */
const container = document.getElementById('popup');
const closer = document.getElementById('popup-closer');
const content = document.getElementById('popup-content');



/**
 * Create an overlay to anchor the popup to the map.
 */
export const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};
