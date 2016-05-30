// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//
// Flags: --allow-natives-syntax
//
// MODULE

var x = 1;
x --> 0;
assertEquals(0, x, 'a');

var x = 0; x <!-- x
assertEquals(-1, x, 'b');

var x = 1; x <!--x
assertEquals(0, x, 'c');

var x = 2; x <!-- x; x = 42;
assertEquals(42, x, 'd');

var x = 1; x <! x--;
assertEquals(0, x, 'e');

var x = 1; x <!- x--;
assertEquals(0, x, 'f');

var b = true <! true;
assertFalse(b, 'g');

var b = true <!- true;
assertFalse(b, 'h');

function f() {
  var x = 9;
  x --> 0 && 0 <!-- x;
  return x;
}

%DeoptimizeFunction(f);

assertEquals(f(), 7);

%OptimizeFunctionOnNextCall(f);

assertEquals(f(), 7);
