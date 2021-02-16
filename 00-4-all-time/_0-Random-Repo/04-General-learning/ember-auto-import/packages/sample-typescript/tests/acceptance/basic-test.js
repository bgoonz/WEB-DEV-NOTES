import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | basic', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /basic', async function(assert) {
    await visit('/');
    assert.equal(document.querySelector('[data-test-import-js]').textContent.trim(), 'ember-auto-import-a-dependency');
    assert.equal(document.querySelector('[data-test-import-ts]').textContent.trim(), 'ember-auto-import-a-pure-ts-dependency');
    assert.equal(document.querySelector('[data-test-import-precedence]').textContent.trim(), 'ember-auto-import-js-takes-precedence');
  });
});
