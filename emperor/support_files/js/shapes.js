// Module to avoid duplication of shape sources between controller and
// editor/formatter. This allows one central dict and dropdown of available
// shapes.
define(['jquery', 'three', 'underscore'], function($, THREE, _) {

  var SPHERE = 'Sphere', CUBE = 'Cube', CONE = 'Cone',
      ICOSAHEDRON = 'Icosahedron', CYLINDER = 'Cylinder';

  var shapes = [SPHERE, CUBE, CONE, ICOSAHEDRON, CYLINDER];

  /**
   *
   * Return a correctly sized geometry that matches the plotting space
   *
   * @param {string} shapeName One of 'Sphere', 'Cube', 'Cone', 'Icosahedron'
   * or 'Cylinder'.
   * @param {Object} ranges Object with two arrays of "max" and "min" values as
   * generated by the `DecompositionModel` dimensionRanges property
   *
   * @return {THREE.Geometry} The requested geometry object with a size
   * appropriate for the data presented on screen.
   * @function getGeometry
   */
  function getGeometry(shapeName, ranges) {

    // this is a heauristic tested on numerous plots since 2013, based off of
    // the old implementation of emperor. We select the dimensions of all the
    // geometries based on this factor.
    var factor = (ranges.max[0] - ranges.min[0]) * 0.012;

    switch (shapeName) {
      case SPHERE:
        return new THREE.SphereGeometry(factor, 8, 8);
      case CUBE:
        return new THREE.CubeGeometry(factor, factor, factor, 8, 8, 8);
      case CONE:
        return new THREE.CylinderGeometry(factor * 0.4, 0, 1.5 * factor, 8);
      case ICOSAHEDRON:
        return new THREE.IcosahedronGeometry(factor, 0);
      case CYLINDER:
        return new THREE.CylinderGeometry(factor * 0.4, factor * 0.4,
                                          1.5 * factor, 10);
      default:
        throw Error('Unknown geometry requested: ' + shapeName);
    }
  }

  var $shapesDropdown = $('<select>');
  _.each(shapes, function(shape) {
    $shapesDropdown.append(new Option(shape, shape));
  });

  return {$shapesDropdown: $shapesDropdown, getGeometry: getGeometry,
          shapes: shapes};
});
