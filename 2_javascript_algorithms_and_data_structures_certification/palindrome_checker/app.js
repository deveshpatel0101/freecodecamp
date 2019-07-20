function palindromeCheck() {
  const str = document.getElementById('palindromeString').value;
  // const regEx = new RegExp();
  let newStr = str.replace(/[\s]|[\W]|[_]|[,]|[.]/g, '');
  newStr = newStr.toLowerCase();
  let j = newStr.length - 1;
  for (let i = 0; i < newStr.length; i++) {
    if (newStr[i] !== newStr[j]) {
      alert('Input string is not a palindrome.');
      return false;
    }
    j--;
  }
  alert('Input string is a palindrome.');
  return true;
}
