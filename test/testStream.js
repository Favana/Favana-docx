"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Docx_1 = require("../classes/Docx");
require("mocha");
var fs = require('fs');
var express = require('express');
var app = express();
var wkhtmltopdf = require('wkhtmltopdf');
describe('test', function () {
    it('createStream', function (done) {
        var data = [
            { x: 1, y: 0, value: 'سال و استان', mergeRow: '', mergeCol: '5', style: { align: 'center', fontFamily: 'B Nazanin', bold: 'true', border: { top: '17', bottom: '17', left: '17' } } },
            { x: 1, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 1, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 1, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 1, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 1, y: 5, value: 'جمع', mergeRow: '', mergeCol: '', style: { align: 'center', fontFamily: 'B Nazanin', border: { top: '17', bottom: '17', right: '17', left: '17' } } },
            { x: 1, y: 6, value: 'پزشک', mergeRow: '', mergeCol: '', note: { text: "(1)", position: "" }, style: { align: 'center', fontFamily: 'B Nazanin', bold: 'true', border: { top: '17', bottom: '17', right: '17', left: '17' } } },
            { x: 1, y: 7, value: 'پیراپزشک', mergeRow: '', mergeCol: '', style: { align: 'center', fontFamily: 'B Nazanin', fontColor: 'red', border: { top: '17', bottom: '17', right: '17', left: '17' } } },
            { x: 1, y: 8, value: ' ساير كاركنان ', mergeRow: '', mergeCol: '3', note: { text: "(2)", position: "" }, style: { align: 'center', fontFamily: 'B Nazanin', border: { top: '17', bottom: '17', right: '17' } } },
            { x: 1, y: 9, value: '  ', mergeRow: '', mergeCol: '' },
            { x: 1, y: 10, value: '  ', mergeRow: '', mergeCol: '' },
            //
            { x: 2, y: 0, value: '1375 ', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: "dash", fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 2, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 2, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 2, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 2, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 2, y: 5, value: '269894', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dash', fontFamily: 'B Nazanin', border: {} } },
            { x: 2, y: 6, value: '19585', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dash', fontFamily: 'B Nazanin', border: {} } },
            { x: 2, y: 7, value: '149380', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dash', fontFamily: 'B Nazanin', border: {} } },
            { x: 2, y: 8, value: '100929', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dash', fontFamily: 'B Nazanin', border: {} } },
            { x: 2, y: 9, value: '  ', mergeRow: '', mergeCol: '' },
            { x: 2, y: 10, value: '  ', mergeRow: '', mergeCol: '' },
            // //
            // // // //
            { x: 3, y: 0, value: '1380 ', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dash', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 3, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 3, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 3, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 3, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 3, y: 5, value: '295325', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dash', fontFamily: 'B Nazanin', border: {} } },
            { x: 3, y: 6, value: '21175', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dash', fontFamily: 'B Nazanin', border: {} } },
            { x: 3, y: 7, value: '152396', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dash', fontFamily: 'B Nazanin', border: {} } },
            { x: 3, y: 8, value: '121754', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dash', fontFamily: 'B Nazanin', border: {} } },
            { x: 3, y: 9, value: '  ', mergeRow: '', mergeCol: '' },
            { x: 3, y: 10, value: '  ', mergeRow: '', mergeCol: '' },
            // // // //
            // // // // // //
            // // // // // //
            { x: 4, y: 0, value: '1385', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 4, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 4, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 4, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 4, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 4, y: 5, value: '321544', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 4, y: 6, value: '29937', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 4, y: 7, value: '173076', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 4, y: 8, value: '118531', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 4, y: 9, value: '  ', mergeRow: '', mergeCol: '' },
            { x: 4, y: 10, value: '  ', mergeRow: '', mergeCol: '' },
            // //
            // // //
            { x: 5, y: 0, value: '1390', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 5, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 5, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 5, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 5, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 5, y: 5, value: '361627', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 5, y: 6, value: '32493', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 5, y: 7, value: '215950', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 5, y: 8, value: '113184', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 5, y: 9, value: '  ', mergeRow: '', mergeCol: '' },
            { x: 5, y: 10, value: '  ', mergeRow: '', mergeCol: '' },
            // // // //
            // // // //
            { x: 6, y: 0, value: '1391 ', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 6, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 6, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 6, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 6, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 6, y: 5, value: '350394', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 6, y: 6, value: '34219', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 6, y: 7, value: '203993', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 6, y: 8, value: '112182', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 6, y: 9, value: '  ', mergeRow: '', mergeCol: '' },
            { x: 6, y: 10, value: '  ', mergeRow: '', mergeCol: '' },
            // // //
            // // //
            { x: 7, y: 0, value: '1392 ', mergeRow: '', mergeCol: '5', note: { text: "(3)", position: "" }, style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" }, bold: 'true' } },
            { x: 7, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 7, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 7, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 7, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 7, y: 5, value: '385667', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 7, y: 6, value: '37490', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 7, y: 7, value: '217603', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 7, y: 8, value: '130574', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 7, y: 9, value: '  ', mergeRow: '', mergeCol: '' },
            { x: 7, y: 10, value: '  ', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // // //
            { x: 8, y: 0, value: '1393', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 8, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 8, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 8, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 8, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 8, y: 5, value: '413550', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 8, y: 6, value: '42108', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 8, y: 7, value: '233668', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 8, y: 8, value: '137774', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 8, y: 9, value: '  ', mergeRow: '', mergeCol: '' },
            { x: 8, y: 10, value: '  ', mergeRow: '', mergeCol: '' },
            // // //
            // // //
            // // //
            // // //
            { x: 9, y: 0, value: '1394 ', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 9, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 9, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 9, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 9, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 9, y: 5, value: '405910', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 9, y: 6, value: '42393', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 9, y: 7, value: '238869', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 9, y: 8, value: '124648', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 9, y: 9, value: '  ', mergeRow: '', mergeCol: '' },
            { x: 9, y: 10, value: '  ', mergeRow: '', mergeCol: '' },
            // // //
            // // //
            { x: 10, y: 0, value: 'آذربایجان شرقی', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 10, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 10, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 10, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 10, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 10, y: 5, value: '22075', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 10, y: 6, value: '2262', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 10, y: 7, value: '13195', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 10, y: 8, value: '6618', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 10, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 10, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 11, y: 0, value: 'آذربایجان غربی', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 11, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 11, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 11, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 11, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 11, y: 5, value: '16483', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 11, y: 6, value: '1595', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 11, y: 7, value: '10924', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 11, y: 8, value: '3964', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 11, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 11, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 12, y: 0, value: 'اردبیل', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 12, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 12, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 12, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 12, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 12, y: 5, value: '6755', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 12, y: 6, value: '487', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 12, y: 7, value: '4565', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 12, y: 8, value: '1703', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 12, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 12, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 13, y: 0, value: 'اصفهان', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 13, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 13, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 13, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 13, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 13, y: 5, value: '28384', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 13, y: 6, value: '3218', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 13, y: 7, value: '17026', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 13, y: 8, value: '17026', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 13, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 13, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // // //
            // //
            { x: 14, y: 0, value: 'البرز', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', topBorder: 'false', border: { left: "17" } } },
            { x: 14, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 14, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 14, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 14, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 14, y: 5, value: '5961', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 14, y: 6, value: '911', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 14, y: 7, value: '2712', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 14, y: 8, value: '2338', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 14, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 14, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // // //
            // // //
            // // //
            // // //
            // //
            { x: 15, y: 0, value: 'ایلام', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 15, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 15, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 15, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 15, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 15, y: 5, value: '4545', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 15, y: 6, value: '388', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 15, y: 7, value: '3100', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 15, y: 8, value: '1057', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 15, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 15, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 16, y: 0, value: 'بوشهر', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 16, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 16, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 16, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 16, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 16, y: 5, value: '6877', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 16, y: 6, value: '704', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 16, y: 7, value: '3916', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 16, y: 8, value: '2257', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 16, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 16, y: 10, value: '', mergeRow: '', mergeCol: '' },
            //
            // //
            // // //
            // // //
            // //
            { x: 17, y: 0, value: 'تهران', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 17, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 17, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 17, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 17, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 17, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 17, y: 5, value: '47440', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 17, y: 6, value: '6313', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 17, y: 7, value: '22892', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 17, y: 8, value: '18235', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 17, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 17, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 18, y: 0, value: 'چهارمحال و بختیاری', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 18, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 18, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 18, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 18, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 18, y: 5, value: '7175', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 18, y: 6, value: '752', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 18, y: 7, value: '4388', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 18, y: 8, value: '2035', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 18, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 18, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 19, y: 0, value: 'خراسان جنوبی', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 19, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 19, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 19, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 19, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 19, y: 5, value: '5167', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 19, y: 6, value: '542', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 19, y: 7, value: '3275', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 19, y: 8, value: '1350', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 19, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 19, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 20, y: 0, value: 'خراسان رضوی', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 20, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 20, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 20, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 20, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 20, y: 5, value: '30302', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 20, y: 6, value: '3266', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 20, y: 7, value: '18483', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 20, y: 8, value: '8553', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 20, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 20, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 21, y: 0, value: 'خراسان شمالی', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 21, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 21, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 21, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 21, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 21, y: 5, value: '4913', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 21, y: 6, value: '499', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 21, y: 7, value: '3205', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 21, y: 8, value: '1209', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 21, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 21, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 22, y: 0, value: 'خوزستان', mergeRow: '', mergeCol: '5', note: { text: "(4)", position: "" }, style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 22, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 22, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 22, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 22, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 22, y: 5, value: '7180', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 22, y: 6, value: '715', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 22, y: 7, value: '4449', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 22, y: 8, value: '2016', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 22, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 22, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 23, y: 0, value: 'زنجان', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 23, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 23, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 23, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 23, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 23, y: 5, value: '7007', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 23, y: 6, value: '751', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 23, y: 7, value: '4135', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 23, y: 8, value: '2121', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 23, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 23, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 24, y: 0, value: 'سمنان', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 24, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 24, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 24, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 24, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 24, y: 5, value: '4425', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 24, y: 6, value: '648', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 24, y: 7, value: '1778', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 24, y: 8, value: '1999', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 24, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 24, y: 10, value: '', mergeRow: '', mergeCol: '' },
            //
            // // //
            // // //
            // //
            { x: 25, y: 0, value: 'سیستان و بلوچستان', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 25, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 25, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 25, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 25, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 25, y: 5, value: '14437', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 25, y: 6, value: '1204', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 25, y: 7, value: '8482', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 25, y: 8, value: '4751', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 25, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 25, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 26, y: 0, value: 'فارس', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 26, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 26, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 26, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 26, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 26, y: 5, value: '32250', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 26, y: 6, value: '3026', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 26, y: 7, value: '19621', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 26, y: 8, value: '9603', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 26, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 26, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 27, y: 0, value: 'قزوین', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 27, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 27, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 27, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 27, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 27, y: 5, value: '6682', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 27, y: 6, value: '518', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 27, y: 7, value: '3899', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 27, y: 8, value: '2265', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 27, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 27, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 28, y: 0, value: 'قم', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 28, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 28, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 28, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 28, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 28, y: 5, value: '4806', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 28, y: 6, value: '555', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 28, y: 7, value: '2717', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 28, y: 8, value: '1534', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 28, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 28, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // // //
            // // //
            // //
            { x: 29, y: 0, value: 'کردستان', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 29, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 29, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 29, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 29, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 29, y: 5, value: '9003', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 29, y: 6, value: '810', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 29, y: 7, value: '6206', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 29, y: 8, value: '1987', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 29, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 29, y: 10, value: '', mergeRow: '', mergeCol: '' },
            //
            // // //
            // // //
            // // //
            // //
            { x: 30, y: 0, value: 'کرمان', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 30, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 30, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 30, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 30, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 30, y: 5, value: '18318', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 30, y: 6, value: '1882', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 30, y: 7, value: '11091', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 30, y: 8, value: '5345', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 30, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 30, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 31, y: 0, value: 'کرمانشاه', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 31, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 31, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 31, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 31, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 31, y: 5, value: '12228', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 31, y: 6, value: '1213', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 31, y: 7, value: '7906', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 31, y: 8, value: '3109', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 31, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 31, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 32, y: 0, value: 'كهگيلويه و بويراحمد', mergeRow: '', mergeCol: '5', note: { text: "(5)", position: "" }, style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', topBorder: 'false', border: { left: "17" } } },
            { x: 32, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 32, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 32, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 32, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 32, y: 5, value: '5345', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 32, y: 6, value: '0', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 32, y: 7, value: '0', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 32, y: 8, value: '5345', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 32, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 32, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 33, y: 0, value: 'گلستان', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 33, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 33, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 33, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 33, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 33, y: 5, value: '11340', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 33, y: 6, value: '1124', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 33, y: 7, value: '7073', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 33, y: 8, value: '3143', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 33, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 33, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // //
            { x: 34, y: 0, value: 'گیلان', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 34, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 34, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 34, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 34, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 34, y: 5, value: '15853', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 34, y: 6, value: '2092', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 34, y: 7, value: '9218', mergeRow: '', mergeCol: '', style: { align: 'right', fontFamily: 'B Nazanin', border: {} } },
            { x: 34, y: 8, value: '4543', mergeRow: '', mergeCol: '3', style: { align: 'right', fontFamily: 'B Nazanin', border: {} } },
            { x: 34, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 34, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 35, y: 0, value: 'لرستان', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 35, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 35, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 35, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 35, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 35, y: 5, value: '10412', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 35, y: 6, value: '937', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 35, y: 7, value: '6786', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 35, y: 8, value: '2689', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'dot', fontFamily: 'B Nazanin', border: {} } },
            { x: 35, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 35, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 36, y: 0, value: ' مازندران', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 36, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 36, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 36, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 36, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 36, y: 5, value: '22463', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: {} } },
            { x: 36, y: 6, value: '2058', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: {} } },
            { x: 36, y: 7, value: '14638', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: {} } },
            { x: 36, y: 8, value: '5767', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: {} } },
            { x: 36, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 36, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // //
            { x: 37, y: 0, value: 'مرکزی', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 37, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 37, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 37, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 37, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 37, y: 5, value: '8304', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: {} } },
            { x: 37, y: 6, value: '946', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: {} } },
            { x: 37, y: 7, value: '4725', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: {} } },
            { x: 37, y: 8, value: '2633', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: {} } },
            { x: 37, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 37, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // // //
            // //
            { x: 38, y: 0, value: 'همدان', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 38, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 38, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 38, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 38, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 38, y: 5, value: '8972', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: {} } },
            { x: 38, y: 6, value: '937', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: {} } },
            { x: 38, y: 7, value: '5612', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: {} } },
            { x: 38, y: 8, value: '2423', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: {} } },
            { x: 38, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 38, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // //
            // //
            { x: 39, y: 0, value: 'هرمزگان', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: { left: "17" } } },
            { x: 39, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 39, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 39, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 39, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 39, y: 5, value: '12386', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: {} } },
            { x: 39, y: 6, value: '1150', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: {} } },
            { x: 39, y: 7, value: '8049', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: {} } },
            { x: 39, y: 8, value: '3187', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: {} } },
            { x: 39, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 39, y: 10, value: '', mergeRow: '', mergeCol: '' },
            // // //
            // // //
            // // //
            { x: 40, y: 0, value: ' یزد', mergeRow: '', mergeCol: '5', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: { left: "17", bottom: "18" } } },
            { x: 40, y: 1, value: '', mergeRow: '', mergeCol: '' },
            { x: 40, y: 2, value: '', mergeRow: '', mergeCol: '' },
            { x: 40, y: 3, value: '', mergeRow: '', mergeCol: '' },
            { x: 40, y: 4, value: '', mergeRow: '', mergeCol: '' },
            { x: 40, y: 5, value: '8422 ', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: { bottom: "18" } } },
            { x: 40, y: 6, value: '890', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: { bottom: "18" } } },
            { x: 40, y: 7, value: '4803', mergeRow: '', mergeCol: '', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: { bottom: "18" } } },
            { x: 40, y: 8, value: '2729', mergeRow: '', mergeCol: '3', style: { align: 'right', tab: 'underscore', fontFamily: 'B Nazanin', border: { bottom: "18" } } },
            { x: 40, y: 9, value: '', mergeRow: '', mergeCol: '' },
            { x: 40, y: 10, value: '', mergeRow: '', mergeCol: '' },
        ];
        var fileName = 'testDefault.docx';
        var pathFile = 'outTest/';
        var docx = new Docx_1.default(fileName, pathFile);
        docx.createTable(data);
        docx.createP();
        docx.addContentP('میلاد');
        var out = docx.generate();
        if (out == false) {
            console.log("Don't Create File");
        }
        else {
            app.get('/download', function (req, res) {
                res.writeHead(200, {
                    'Content-Type': 'application/docx',
                    "Content-Disposition": "attachment; filename=testDefault.docx"
                });
                docx.CreateStream(function (data) {
                    data.pipe(res);
                    data.on('finish', function () {
                        console.log('create stream');
                    });
                });
            }).listen(3000);
        }
        done();
    });
});
//# sourceMappingURL=testStream.js.map