'32' * 1            // 32
'ds' * 1            // NaN
null * 1            // 0
undefined * 1    // NaN
1 * { valueOf: () => '3' }        // 3

  + '123'            // 123
  + 'ds'               // NaN
  + ''                    // 0
  + null              // 0
  + undefined    // NaN
  + { valueOf: () => '3' }    // 3