function decodeCaesar() {
  const str = document.getElementById('caesarString').value;
  let newStr = '';

  for (let i = 0; i < str.length; i++) {
    if (new RegExp(/^[a-z]|[A-Z]$/g).test(str[i])) {
      let code = str[i].charCodeAt(0);
      for (let j = 0; j < 13; j++) {
        code++;
        if (code == 91) {
          code = 65;
        } else if (code == 123) {
          code = 97;
        }
      }
      newStr += String.fromCharCode(code);
    } else {
      newStr += str[i];
    }
  }
  return newStr;
}
