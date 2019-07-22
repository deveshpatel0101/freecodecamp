function convertToRoman() {
  const num = document.getElementById('numberString').value;
  console.log(num);
  const str = num.toString();
  const converts = {
    1: { 0: '', 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX' },
    2: { 0: '', 1: 'X', 2: 'XX', 3: 'XXX', 4: 'XL', 5: 'L', 6: 'LX', 7: 'LXX', 8: 'LXXX', 9: 'XC' },
    3: { 0: '', 1: 'C', 2: 'CC', 3: 'CCC', 4: 'CD', 5: 'D', 6: 'DC', 7: 'DCC', 8: 'DCCC', 9: 'CM' },
    4: { 0: '', 1: 'M', 2: 'MM', 3: 'MMM' },
  };
  let roman = '';
  let place = str.length;
  for (let i = 0; i < str.length; i++) {
    roman += converts[place][str[i]];
    place--;
  }
  alert(roman);
  return roman;
}
