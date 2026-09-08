import assert from 'node:assert/strict';
import {parseCaptions,toSrt} from '../../public/tools/transcript-format.js';
const text='WEBVTT\n\n00:01.250 --> 00:03.000\nGravity test.\n\n00:04.000 --> 00:05.500\nCheck units.';
const s=parseCaptions(text,120);assert.equal(s[0].start,121.25);assert.equal(s[1].end,125.5);assert.deepEqual(parseCaptions(toSrt(s)),s);assert.throws(()=>parseCaptions('Not captions'));assert.throws(()=>parseCaptions('00:05.000 --> 00:01.000\nInvalid'));
console.log('Caption parsing, clip offsets, invalid-cue handling and SRT round trip passed.');
