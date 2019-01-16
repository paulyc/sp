#!/usr/bin/env node
//
// Copyright (C) 2019 Paul Ciarlo <paul.ciarlo@gmail.com>.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//

/**
 * Return an array containing the longest words in the string by number of characters
 */
String.prototype.findLongestWords = function () {
    const tokens = [];
    const regex = /(\S+)\s*/giu;
    let res;
    while ((res = regex.exec(this)) !== null) {
        tokens.push(res[1].normalize());
    }
    return tokens.reduce((prev, current) => {
        // use spread operator to count characters, not bytes, since '💩'.length === 2
        if (prev.length === 0 || [...current].length > [...prev[0]].length) {
            return [current];
        } else if ([...current].length === [...prev[0]].length) {
            prev.push(current);
        }
        return prev;
    }, []);
};

function testFindLongestWords() {
    const assert = require('assert');
    assert.deepStrictEqual(''.findLongestWords(), []);
    assert.deepStrictEqual('\n'.findLongestWords(), []);
    assert.deepStrictEqual('a'.findLongestWords(), ['a']);
    assert.deepStrictEqual('abc def ghijkl'.findLongestWords(), ['ghijkl']);
    // test weird whitespace and non-printable characters
    assert.deepStrictEqual('abc \x01\t\v def \n ghi'.findLongestWords(), ['abc', 'def', 'ghi']);
    assert.deepStrictEqual('あ'.findLongestWords(), ['あ']); // test unicode
    assert.deepStrictEqual('あ  あああ'.findLongestWords(), ['あああ']);
    assert.deepStrictEqual('💩'.findLongestWords(), ['💩']); // test astral characters
    assert.deepStrictEqual('あ あああ 💩💩'.findLongestWords(), ['あああ']); // test word length in characters vs. bytes
    assert.deepStrictEqual('あ ああ 💩💩'.findLongestWords(), ['ああ', '💩💩']);
}

if (typeof require !== void 0 && require.main === module) {
    testFindLongestWords();
}
