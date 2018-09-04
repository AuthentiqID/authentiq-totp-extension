// Copyright 2018 Authentiq BV. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const endpoint = 'https://20-dot-authentiqio.appspot.com/totp_display/';
let pushHandle = '';

window.browser = (function() {
  return window.msBrowser || window.browser || window.chrome;
})();

browser.storage.sync.get('handle', function(data) {
  if (data) {
    pushHandle = data.handle;
  }
});

browser.storage.onChanged.addListener(function(changes, area) {
  if (changes.hasOwnProperty('handle') && changes.handle.newValue) {
    pushHandle = changes.handle.newValue;
  }
});

browser.browserAction.onClicked.addListener(function(tab) {
  console.info('AQ: Handling tab for:', tab.url);
  console.info('AQ: handle set to:', pushHandle);

  if (!pushHandle) {
    browser.runtime.openOptionsPage();
    return;
  }

  const url = new URL(tab.url);
  let hint = { issuer: url.hostname, account: pushHandle };

  for (let s of url.hostname.split('.')) {
    // get the last item that's over 3 chars
    if (s.length > 3) {
      hint.issuer = s;
    }
  }

  console.info('AQ: Payload:', JSON.stringify(hint));

  let xhr = new XMLHttpRequest();
  xhr.open('POST', endpoint + pushHandle, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      let resp = JSON.parse(xhr.responseText);
      console.info('AQ: Response:', pushHandle, resp.status);
    }
  };
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(hint));
});
