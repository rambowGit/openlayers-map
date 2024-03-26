import {Circle, Fill, Stroke, Style} from 'ol/style.js';

const styles = {
  'Polygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      // lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  }),
  'Point': new Style ({
    image: new Circle({
      radius: 15,
      fill: new Fill({
        color: '#F1C40F',
      }),
      stroke: new Stroke({
        color: '#82E0AA',
        width: 2,
      }),
    }),
  })

};

const styleFunction = function (feature) {
  return styles[feature.getGeometry().getType()];
};

export default styleFunction;