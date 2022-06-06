class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

const HashTable = require('./01-implementation');


function anagrams(str1, str2) {
  if (str1.length !== str2.length) {return false}
  const hash = new HashTable(str1.length * 2);

  for (let i = 0; i < str1.length; i++) {
    hash.insert(str1[i], str1[i]);
  }

  for (let i = 0; i < str2.length; i++) {
    if (hash.read(str2[i]) === undefined) {return false}
    //console.log(i);
  }

  return true;
}


function commonElements(arr1, arr2) {
  const commonEles = []; const hash = new HashTable(Math.floor(arr1.length * 1.5));

  arr1.forEach( ele => {
    hash.insert(`key - ${ele}`, ele);
  })

  arr2.forEach( ele => {
    if (hash.read(`key - ${ele}`) !== undefined) { commonEles.push(ele) }
  })

  return commonEles;
}


function duplicate(arr) {
  const hash = new HashTable(Math.floor(arr.length * 1.5));

  for(let i = 0; i < arr.length; i++) {
    let ele = arr[i];
    if (hash.read(`key - ${ele}`) !== undefined) { return ele }
    else {hash.insert(`key - ${ele}`, ele)}
  }
}


function twoSum(nums, target) {
  const hash = new HashTable(Math.floor(nums.length * 1.5));

  nums.forEach( ele => {
    hash.insert(`key - ${ele}`, ele);
  });

  for (let i = nums.length - 1; i >= 0; i--) {
    let summer = target - nums[i];
    if ((hash.read(`key - ${summer}`) === summer) && summer !== nums[i]) {return true}
  }

  return false;
}


function wordPattern(pattern, strings) {
  const hash = new HashTable(Math.ceil(strings.length * 1.5));
  const used = new HashTable(Math.ceil(strings.length * 1.5));
  const words = strings.join(""); let hashWords = "";

  strings.forEach( (ele, i) => {
    if (used.read(`key -- ${ele}`) === undefined) {

    hash.insert(`key -- ${pattern[i]}`, ele);
    used.insert(`key -- ${ele}`, ele);
    }
  });

  for (let i = 0; i < pattern.length; i++) {
    hashWords += hash.read(`key -- ${pattern[i]}`);
  }

  return hashWords === words;
}




module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
