// Copyright 2018 Authentiq BV. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

window.browser = (function() {
  return window.msBrowser || window.browser || window.chrome;
})();

const background = browser.extension.getBackgroundPage();

function constructOptions() {
  const field = document.getElementById('handle');
  const button = document.getElementById('save');

  browser.storage.sync.get('handle', function(data) {
    field.value = data.handle || '';
  });

  button.addEventListener('click', function(evt) {
    let newHandle = field.value;
    browser.storage.sync.set({ handle: newHandle }, function() {
      console.info('AQ: New handle is:', newHandle);
      background.pushHandle = newHandle;

      const successMessage = document.getElementById('success-message');
      successMessage.classList.remove('hidden');

      setTimeout(() => {
        successMessage.classList.add('hidden');
      }, 7000);
    });
  });
}

constructOptions();
