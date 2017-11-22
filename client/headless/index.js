const fetch = require('node-fetch');
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function triggerCarPatchRequest(API_HOST, ...pulseModulations) {
  const body = JSON.stringify({ pulseModulations });
  const endpoint = `${API_HOST}/car`;
  const response = await fetch(endpoint, {
    method: 'PATCH',
    body,
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json'
    }
  });
  const jsonResponse = await response.json();
  return jsonResponse;
}



async function main() {
  while (true) {
   await triggerCarPatchRequest('http://192.168.1.204', 0, 0, 0, 0);
   await wait(500);
   await triggerCarPatchRequest('http://192.168.1.204', 0.4, 0, 0, 0);
   await wait(500);
   await triggerCarPatchRequest('http://192.168.1.204', 0, 0, 0, 0);
   await wait(500);
   await triggerCarPatchRequest('http://192.168.1.204', 0, 0.4, 0, 0);
   await wait(500);
  }
}

main();