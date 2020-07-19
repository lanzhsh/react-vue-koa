'the Math object:' + Math.ceil(3.4)                // "the Math object:4"
'the JSON object:' + { name: '曹操' }              // "the JSON object:[object Object]"

2 * { valueOf: () => '4' }                // 8
'J' + { toString: () => 'ava' }                // "Java"

'' + { toString: () => 'S', valueOf: () => 'J' }  //J