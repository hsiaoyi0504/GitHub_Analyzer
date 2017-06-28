function parseString(str) {
  var token = str.split('=');
  var cand = token[5];
  console.log(cand);
  var pos = cand.lastIndexOf('>');
  var result = cand.slice(0,pos);
  if(result === null) result = '1';
  return result;
}

export default parseString;