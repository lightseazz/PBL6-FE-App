const linkify = require('linkifyjs');
var inputString = "<div>google.com<p>https://chat.openai.com/c/eb8c6a25-e0bc-492e-b459-9004f2992833</p></div";

console.log(linkify.find(inputString));

