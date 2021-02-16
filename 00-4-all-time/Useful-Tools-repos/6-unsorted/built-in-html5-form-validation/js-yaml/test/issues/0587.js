'use strict';


var assert = require('assert');
var yaml   = require('../../');


test('Should not encode astral characters', function () {
  assert.strictEqual(yaml.safeDump('😃😊'), '😃😊\n');
});
