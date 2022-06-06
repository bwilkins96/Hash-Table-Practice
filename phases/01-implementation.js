class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.capacity = numBuckets;
    this.count = 0;
    this.data = [];

    for (let i = 0; i < this.capacity; i++) {
      this.data.push(null);
    }
  }

  hash(key) {
    let hashValue = 0;
    const arr = [1, 5, 13, 22, 2, 45, 199, 157, 17, 26, 44, 42, 54];
    const arr2 = [18, 24, 5, 100, 73, 345, 39, 69, 12, 99, 82, 64, 22];

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i) * (arr[i % 13]) * (arr2[i % 13]) * i;
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    if (this.count >= this.capacity * 0.7) {this.resize()}
    const pair = new KeyValuePair(key, value);
    const idx = this.hashMod(key);

    if (this.data[idx] === null) {
      this.data[idx] = pair;
      this.count++; return;
    } else {
      let current = this.data[idx];

      while (current) {
        if (current.key === key) {
          current.value = value; return;
        }
        current = current.next
      }

      pair.next = this.data[idx];
      this.data[idx] = pair;
      this.count++;
    }
  }


  read(key) {
    const idx = this.hashMod(key); let current = this.data[idx];
    if (current === null) {return}

    if (current.key === key) {return current.value}
    else {
      current = current.next;

      while (current) {
        if (current.key === key) {return current.value}
        current = current.next;
      }
    }
  }


  resize() {
    this.capacity *= 2;
    const copy = this.data;
    this.data = []; this.count = 0;

    for (let i = 0; i < this.capacity; i++) {
      this.data.push(null);
    }

    for (let i = 0; i < copy.length; i++) {
      if (copy[i]) {
        let current = copy[i];

        while (current) {
          let key = current.key; let value = current.value;
          this.insert(key, value);
          current = current.next;
        }
      }
    }
  }


  delete(key) {
    const idx = this.hashMod(key);
    let current = this.data[idx];

    if (current === null) {
      return "Key not found";
    } else if (current.key === key) {

      if (current.next === null) {
        this.data[idx] = null;
      } else {
        this.data[idx] = current.next;
      }

      this.count--;
    } else {
      while (current.next) {

        if (current.next.key === key) {
          current.next = current.next.next;
          this.count--; return;
        }

        current = current.next;
      }

      return "Key not found";
    }
  }

}


module.exports = HashTable;

/* console.time("total");

let testHash = new HashTable(1500000);

console.time("hash build")
for (let i = 0; i < 1000000; i++) {
  testHash.insert(`key - ${i}`, `v - ${i}`);
}
console.timeEnd("hash build");

console.time("hash");

for (let i = 1000000 - 1; i >= 0; i--) {
  //let start = Date.now();
  testHash.read(`key - ${i}`);
  //let end = Date.now();
  //console.log(end - start + "ms"); *
}

//console.log(testHash);

console.timeEnd("hash");
console.timeEnd("total");
console.log(testHash.count) */

/*let counterTest = 0;
let includedTest = [];
const hashTest = new HashTable(150);

for (let i = 0; i < 100000; i++) {
  let a = hashTest.hashMod(`key - ${i}`);
  hashTest.insert(`key - ${i}`, i);

  if (includedTest.includes(a)) {
    counterTest++;
  } else {
    includedTest.push(a);
  }
}
console.log("collisions: " + counterTest);
console.log(hashTest.count); */
