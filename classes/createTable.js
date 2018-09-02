"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json2xml = require('json2xml');
var _ = require('lodash');
var table = /** @class */ (function () {
    function table() {
        /**@
         *
         * @type {string}
         * private globalTable ===>  Table Body Object
         * private globalData  ===>  The data sent from the server side
         */
        this.globalTable = " ";
        this.globalData = " ";
        this.checkNote = " ";
    }
    table.prototype.createTr = function (_body, data) {
        this.globalData = data;
        var check = _body['w:tbl'].length;
        if (check == 1) {
            _body;
        }
        else {
            for (var i = 1; i < check; i++) {
                _body['w:tbl'].pop();
            }
        }
        _body;
        var counterRow = _.uniqBy(data, 'x');
        var row = counterRow.length;
        for (var i = 0; i < row; i++) {
            _body['w:tbl'].push({ 'w:tr': [] });
        }
        return _body;
    }; //createTr
    table.prototype.createTc = function (_body, data) {
        var counterCol = _.uniqBy(data, 'y');
        var counterRow = _.uniqBy(data, 'x');
        var row = counterRow.length;
        var col = counterCol.length;
        for (var i = 1; i <= row; i++) {
            for (var j = 0; j < col; j++) {
                _body['w:tbl'][i]['w:tr'].push({
                    'w:tc': [{
                            'w:tcPr': [{
                                    'w:tcW': '',
                                    attr: { 'w:w': 4657, 'w:type': 'dxa' }
                                }]
                        },]
                });
            } // for column
        } //for row
        return _body;
    }; //createTc
    table.prototype.createPtable = function (_body, data) {
        var counterCol = _.uniqBy(data, 'y');
        var counterRow = _.uniqBy(data, 'x');
        var row = counterRow.length;
        var col = counterCol.length;
        for (var i = 1; i <= row; i++) {
            for (var j = 0; j < col; j++) {
                var checkValue = _.find(data, { x: i, y: j });
                var value = checkValue.value;
                var note = checkValue.note;
                if (value == '') {
                    _body['w:tbl'][i]['w:tr'][j]['w:tc'].push({ 'w:p': [] });
                }
                else {
                    _body['w:tbl'][i]['w:tr'][j]['w:tc'].push({
                        'w:p': [
                            {
                                'w:r': [
                                    { 'w:t': value }
                                ]
                            }
                        ]
                    });
                    _body;
                }
            } // for col
        } // for row
        return _body;
    }; //createP
    table.prototype.createNote = function (_body) {
        _body;
        // let _body = this.globalTable;
        var data = this.globalData;
        var findX = _.uniqBy(data, 'x');
        var findY = _.uniqBy(data, 'y');
        var count = data.length;
        var counterX = findX.length;
        var counterY = findY.length;
        counterY;
        counterX;
        for (var i = 1; i <= counterX; i++) {
            for (var j = 0; j < counterY; j++) {
                var dataInfo = _.find(data, { x: i, y: j });
                dataInfo;
                var note = dataInfo.note;
                note;
                if (note) {
                    var text = note.text;
                    var position = note.position;
                    if (text != "") {
                        _body['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].push({ 'w:r': [
                                { 'w:rPr': [
                                        { 'w:vertAlign': '', attr: { 'w:val': 'superscript' } },
                                        { 'w:rtl': '' }
                                    ] },
                                { 'w:t': note.text }
                            ] });
                        _body;
                    }
                } // note
            }
        }
        return _body;
    };
    table.prototype.createMerge = function (_body, data) {
        _body;
        var counterCol = _.uniqBy(data, 'y');
        var counterRow = _.uniqBy(data, 'x');
        var row = counterRow.length;
        var col = counterCol.length;
        var start = [];
        for (var i = 1; i <= row; i++) {
            for (var j = 0; j < col; j++) {
                var checkMerge = _.find(data, { x: i, y: j });
                var rowX = checkMerge.mergeRow;
                var colY = checkMerge.mergeCol;
                if (colY != '' && rowX != '') {
                    var myX = checkMerge.x;
                    var myY = checkMerge.y;
                    myY;
                    var counterY = colY; // mergeCol
                    var counterX = rowX; //mergeRow
                    /// start merge Row and Col
                    _body['w:tbl'][myX]['w:tr'][myY]['w:tc'][0]['w:tcPr'].push({ 'w:vMerge': '', attr: { 'w:val': 'restart' } }, { 'w:gridSpan': '', attr: { 'w:val': colY } }); //
                    var b = _body;
                    b;
                    var newWidth = colY * 4657;
                    newWidth;
                    _body;
                    var test_1 = _body['w:tbl'][myX]['w:tr'][myY]['w:tc'][0]['w:tcPr'].splice(0, 1, {
                        'w:tcW': '', attr: { 'w:w': newWidth, 'w:type': 'dxa' }
                    });
                    ///// loop for merge Col:
                    for (var i_1 = 1; i_1 < counterY; i_1++) {
                        myY = myY + 1;
                        delete _body['w:tbl'][myX]['w:tr'][myY]; // merge col
                    } // for
                    /// end loop for
                    var c = _body;
                    c;
                    ///// loop for merge Row:
                    for (var i_2 = 1; i_2 < counterX; i_2++) {
                        myY = 0;
                        myY = checkMerge.y;
                        myX = myX + 1;
                        _body['w:tbl'][myX]['w:tr'][myY]['w:tc'][0]['w:tcPr'].push({ 'w:vMerge': [] }, {
                            'w:gridSpan': '',
                            attr: { 'w:val': colY }
                        }); // merge row
                    } // for
                    /// end loop for
                    var z = _body;
                    z;
                    ///// loop for merge Col:
                    for (var i_3 = 1; i_3 < counterY; i_3++) {
                        myY = myY + 1;
                        myX;
                        delete _body['w:tbl'][myX]['w:tr'][myY]; // merge col
                    } // for
                    /// end loop for
                    var a = _body;
                    a;
                } // if
                //
                /*else*/
                else if (colY != '' && rowX == '') {
                    var myX = checkMerge.x;
                    var myY = checkMerge.y;
                    var counterY = colY;
                    counterY;
                    /// start merge Row and Col
                    _body['w:tbl'][myX]['w:tr'][myY]['w:tc'][0]['w:tcPr'].push({
                        'w:gridSpan': '',
                        attr: { 'w:val': colY }
                    }); ///<w:gridSpan w:val="2"/>
                    var newWidth = colY * 4657;
                    newWidth;
                    var test_2 = _body['w:tbl'][myX]['w:tr'][myY]['w:tc'][0]['w:tcPr'].splice(0, 1, {
                        'w:tcW': '', attr: { 'w:w': newWidth, 'w:type': 'dxa' }
                    });
                    ///// loop for merge Col:
                    for (var i_4 = 1; i_4 < counterY; i_4++) {
                        myY = myY + 1;
                        delete _body['w:tbl'][myX]['w:tr'][myY]; // merge col
                    } // for
                    var c = _body;
                    c;
                } // else if
                else if (colY == '' && rowX != '') {
                    var myY = checkMerge.y;
                    var myX = checkMerge.x;
                    var counterX = rowX;
                    /// start merge Row and Row
                    _body['w:tbl'][myX]['w:tr'][myY]['w:tc'][0]['w:tcPr'].push({
                        'w:vMerge': '',
                        attr: { 'w:val': 'restart' }
                    }); ///<w:vMerge w:val="restart"/>
                    var b = _body;
                    b;
                    ///// loop for merge Row:
                    for (var i_5 = 1; i_5 < counterX; i_5++) {
                        myX = myX + 1;
                        _body['w:tbl'][myX]['w:tr'][myY]['w:tc'][0]['w:tcPr'].push({ 'w:vMerge': [] });
                    } // for
                    var c = _body;
                    c;
                } // else ifs
            } // for col
        } // for row
        this.globalTable = _body;
        return this.globalTable;
    }; //createMerge
    table.prototype.tableStyle = function () {
        this.globalTable; // tbl body object
        this.globalData; // The data sent from the server side
        var count = this.globalData.length;
        var styleObject = {};
        var styleData = [];
        for (var i = 0; i < count; i++) {
            var infoData = _.find(this.globalData, this.globalData[i]);
            var x = infoData.x;
            var y = infoData.y;
            var checkMergeCol = infoData.mergeCol;
            var style = infoData.style;
            var check = Object.keys(styleObject).length;
            if (check == 0) {
                styleObject = { x: x, y: y, style: style };
                styleData.push(styleObject);
            }
            else if (check > 0) {
                if (style == undefined) {
                    styleObject = { x: x, y: y };
                    styleData.push(styleObject);
                }
                else {
                    styleObject = { x: x, y: y, style: style };
                    styleData.push(styleObject);
                }
            }
        } //  for
        if (styleData != null) {
            if (typeof styleData == 'object') {
                var counterX = _.uniqBy(styleData, 'x');
                var counterY = _.uniqBy(styleData, 'y');
                var counterCol = counterY.length;
                var counterRow = counterX.length;
                for (var i = 1; i <= counterRow; i++) {
                    for (var j = 0; j < counterCol; j++) {
                        var find = _.find(styleData, { x: i, y: j });
                        var newStyle = find.style;
                        var findNote = _.find(this.globalData, { x: i, y: j });
                        var checkNote = findNote.note;
                        if (newStyle != undefined) {
                            var align = newStyle.align;
                            var tab = newStyle.tab;
                            var fontFamily = newStyle.fontFamily;
                            var fontColor = newStyle.fontColor;
                            var fontSize = newStyle.fontSize;
                            var backgroundCell = newStyle.background;
                            var bold = newStyle.bold;
                            var findBorder = newStyle.border;
                            if (findBorder != undefined) {
                                var topBorder = newStyle.border.top;
                                var bottomBorder = newStyle.border.bottom;
                                var rightBorder = newStyle.border.right;
                                var leftBorder = newStyle.border.left;
                                /***
                                 @IndexArray:
                                 0 = size
                                 1 =  type
                                 2 =color
                                 * */
                                ///////////////////////////////////////////////////CHECK BORDER  ///////////////////////////////////////////////
                                /****************************   TopBorder ********************/ /////////
                                if (topBorder) {
                                    var topBArr = topBorder.split(' ');
                                    var check = topBArr.length;
                                    check;
                                    if (check == 1) {
                                        if (Number(topBArr[0])) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:top': '', attr: { 'w:val': 'single', 'w:sz': topBArr[0], 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                        else {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:top': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                    } //  check sizeBorder top
                                    if (check == 2) { // check type border
                                        if (Number(topBArr[0])) {
                                            if (topBArr[1] == 'single' || topBArr[1] == 'double' || topBArr[1] == 'dashed') {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:top': '', attr: { 'w:val': topBArr[1], 'w:sz': topBArr[0], 'w:space': '0' } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            }
                                            else {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:top': '', attr: { 'w:val': 'single', 'w:sz': topBArr[0], 'w:space': '0' } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            } //  check type pf Border
                                        }
                                        else if (topBArr[1] == 'single' || topBArr[1] == 'double' || topBArr[1] == 'dashed') {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:top': '', attr: { 'w:val': topBArr[1], 'w:sz': '8', 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                        else {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:top': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                    } //  check  size And Type in  Border
                                    if (check == 3) {
                                        if (Number(topBArr[0])) {
                                            if (topBArr[1] == 'single' || topBArr[1] == 'double' || topBArr[1] == 'dashed') {
                                                if (typeof topBArr[2] == "string") {
                                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                        'w:tcBorders': [
                                                            { 'w:top': '', attr: { 'w:val': topBArr[1], 'w:sz': topBArr[0], 'w:space': '0', 'w:color': topBArr[2] } }
                                                        ]
                                                    }); // push
                                                    this.globalTable;
                                                }
                                                else {
                                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                        'w:tcBorders': [
                                                            { 'w:top': '', attr: { 'w:val': topBArr[1], 'w:sz': topBArr[0], 'w:space': '0', 'w:color': 'auto' } }
                                                        ]
                                                    }); // push
                                                    this.globalTable;
                                                } // check color
                                            }
                                            else {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:top': '', attr: { 'w:val': 'single', 'w:sz': topBArr[0], 'w:space': '0', 'w:color': topBArr[2] } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            } //  check type border
                                        }
                                        else if (topBArr[1] == 'single' || topBArr[1] == 'double' || topBArr[1] == 'dashed') {
                                            if (typeof topBArr[2] == "string") {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:top': '', attr: { 'w:val': topBArr[1], 'w:sz': '8', 'w:space': '0', 'w:color': topBArr[2] } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            }
                                            else {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:top': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0', 'w:color': topBArr[2] } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            }
                                        }
                                        else if (typeof topBArr[2] == 'string') {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:top': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0', 'w:color': topBArr[2] } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                        else {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:top': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                    } //  check  size And Type  And Color in  Border
                                } // top Border
                                /********************************************* End  TopBorder   ***********/ /////////
                                /*********************************************   bottomBorder   ***********/ /////////
                                if (bottomBorder) {
                                    var bottomBArr = bottomBorder.split(' ');
                                    var check = bottomBArr.length;
                                    bottomBArr;
                                    if (check == 1) {
                                        if (Number(bottomBArr[0])) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:bottom': '', attr: { 'w:val': 'single', 'w:sz': bottomBArr[0], 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                        else {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:bottom': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                    } //  check sizeBorder top
                                    if (check == 2) { // check type border
                                        if (Number(bottomBArr[0])) {
                                            if (bottomBArr[1] == 'single' || bottomBArr[1] == 'double' || bottomBArr[1] == 'dashed') {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:bottom': '', attr: { 'w:val': bottomBArr[1], 'w:sz': bottomBArr[0], 'w:space': '0' } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            }
                                            else {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:bottom': '', attr: { 'w:val': 'single', 'w:sz': bottomBArr[0], 'w:space': '0' } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            } //  check type pf Border
                                        }
                                        else if (bottomBArr[1] == 'single' || bottomBArr[1] == 'double' || bottomBArr[1] == 'dashed') {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:bottom': '', attr: { 'w:val': bottomBArr[1], 'w:sz': '8', 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                        else {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:bottom': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                    } //  check  size And Type in  Border
                                    if (check == 3) {
                                        if (Number(bottomBArr[0])) {
                                            if (bottomBArr[1] == 'single' || bottomBArr[1] == 'double' || bottomBArr[1] == 'dashed') {
                                                if (typeof bottomBArr[2] == "string") {
                                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                        'w:tcBorders': [
                                                            { 'w:bottom': '', attr: { 'w:val': bottomBArr[1], 'w:sz': bottomBArr[0], 'w:space': '0', 'w:color': bottomBArr[2] } }
                                                        ]
                                                    }); // push
                                                    this.globalTable;
                                                }
                                                else {
                                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                        'w:tcBorders': [
                                                            { 'w:bottom': '', attr: { 'w:val': bottomBArr[1], 'w:sz': bottomBArr[0], 'w:space': '0', 'w:color': 'auto' } }
                                                        ]
                                                    }); // push
                                                    this.globalTable;
                                                } // check color
                                            }
                                            else {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:bottom': '', attr: { 'w:val': 'single', 'w:sz': bottomBArr[0], 'w:space': '0', 'w:color': bottomBArr[2] } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            } //  check type border
                                        }
                                        else if (bottomBArr[1] == 'single' || bottomBArr[1] == 'double' || bottomBArr[1] == 'dashed') {
                                            if (typeof bottomBArr[2] == "string") {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:bottom': '', attr: { 'w:val': bottomBArr[1], 'w:sz': '8', 'w:space': '0', 'w:color': bottomBArr[2] } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            }
                                            else {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:bottom': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0', 'w:color': bottomBArr[2] } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            }
                                        }
                                        else if (typeof bottomBArr[2] == 'string') {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:bottom': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0', 'w:color': bottomBArr[2] } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                        else {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:bottom': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                    } //  check  size And Type  And Color in  Border
                                } // bottom Border
                                /****************************** END Bottom Border ***/ ///////////////////
                                /***************************** Right Border ************************/
                                if (rightBorder) {
                                    var rightBArr = rightBorder.split(' ');
                                    var check = rightBArr.length;
                                    if (check == 1) {
                                        if (Number(rightBArr[0])) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:left': '', attr: { 'w:val': 'single', 'w:sz': rightBArr[0], 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                        else {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:left': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                    } //  check sizeBorder top
                                    if (check == 2) { // check type border
                                        if (Number(rightBArr[0])) {
                                            if (rightBArr[1] == 'single' || rightBArr[1] == 'double' || rightBArr[1] == 'dashed') {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:left': '', attr: { 'w:val': rightBArr[1], 'w:sz': rightBArr[0], 'w:space': '0' } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            }
                                            else {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:left': '', attr: { 'w:val': 'single', 'w:sz': rightBArr[0], 'w:space': '0' } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            } //  check type pf Border
                                        }
                                        else if (rightBArr[1] == 'single' || rightBArr[1] == 'double' || rightBArr[1] == 'dashed') {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:left': '', attr: { 'w:val': rightBArr[1], 'w:sz': '8', 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                        else {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:left': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                    } //  check  size And Type in  Border
                                    if (check == 3) {
                                        if (Number(rightBArr[0])) {
                                            if (rightBArr[1] == 'single' || rightBArr[1] == 'double' || rightBArr[1] == 'dashed') {
                                                if (typeof rightBArr[2] == "string") {
                                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                        'w:tcBorders': [
                                                            { 'w:left': '', attr: { 'w:val': rightBArr[1], 'w:sz': rightBArr[0], 'w:space': '0', 'w:color': rightBArr[2] } }
                                                        ]
                                                    }); // push
                                                    this.globalTable;
                                                }
                                                else {
                                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                        'w:tcBorders': [
                                                            { 'w:left': '', attr: { 'w:val': rightBArr[1], 'w:sz': rightBArr[0], 'w:space': '0', 'w:color': 'auto' } }
                                                        ]
                                                    }); // push
                                                    this.globalTable;
                                                } // check color
                                            }
                                            else {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:left': '', attr: { 'w:val': 'single', 'w:sz': rightBArr[0], 'w:space': '0', 'w:color': rightBArr[2] } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            } //  check type border
                                        }
                                        else if (rightBArr[1] == 'single' || rightBArr[1] == 'double' || rightBArr[1] == 'dashed') {
                                            if (typeof rightBArr[2] == "string") {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:left': '', attr: { 'w:val': rightBArr[1], 'w:sz': '8', 'w:space': '0', 'w:color': rightBArr[2] } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            }
                                            else {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:left': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0', 'w:color': rightBArr[2] } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            }
                                        }
                                        else if (typeof rightBArr[2] == 'string') {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:left': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0', 'w:color': rightBArr[2] } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                        else {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:left': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                    } //  check  size And Type  And Color in  Border
                                } // right border
                                /***************************** END Right Border ************************/
                                /*****************************  Left Border ************************/
                                if (leftBorder) {
                                    var leftBArr = leftBorder.split(' ');
                                    var check = leftBArr.length;
                                    if (check == 1) {
                                        if (Number(leftBArr[0])) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:right': '', attr: { 'w:val': 'single', 'w:sz': leftBArr[0], 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                        else {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:right': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                    } //  check sizeBorder top
                                    if (check == 2) { // check type border
                                        if (Number(leftBArr[0])) {
                                            if (leftBArr[1] == 'single' || leftBArr[1] == 'double' || leftBArr[1] == 'dashed') {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:right': '', attr: { 'w:val': leftBArr[1], 'w:sz': leftBArr[0], 'w:space': '0' } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            }
                                            else {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:right': '', attr: { 'w:val': 'single', 'w:sz': leftBArr[0], 'w:space': '0' } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            } //  check type pf Border
                                        }
                                        else if (leftBArr[1] == 'single' || leftBArr[1] == 'double' || leftBArr[1] == 'dashed') {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:right': '', attr: { 'w:val': leftBArr[1], 'w:sz': '8', 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                        else {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:right': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                    } //  check  size And Type in  Border
                                    if (check == 3) {
                                        if (Number(leftBArr[0])) {
                                            if (leftBArr[1] == 'single' || leftBArr[1] == 'double' || leftBArr[1] == 'dashed') {
                                                if (typeof leftBArr[2] == "string") {
                                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                        'w:tcBorders': [
                                                            { 'w:right': '', attr: { 'w:val': leftBArr[1], 'w:sz': leftBArr[0], 'w:space': '0', 'w:color': leftBArr[2] } }
                                                        ]
                                                    }); // push
                                                    this.globalTable;
                                                }
                                                else {
                                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                        'w:tcBorders': [
                                                            { 'w:right': '', attr: { 'w:val': leftBArr[1], 'w:sz': leftBArr[0], 'w:space': '0', 'w:color': 'auto' } }
                                                        ]
                                                    }); // push
                                                    this.globalTable;
                                                } // check color
                                            }
                                            else {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:right': '', attr: { 'w:val': 'single', 'w:sz': leftBArr[0], 'w:space': '0', 'w:color': leftBArr[2] } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            } //  check type border
                                        }
                                        else if (leftBArr[1] == 'single' || leftBArr[1] == 'double' || leftBArr[1] == 'dashed') {
                                            if (typeof leftBArr[2] == "string") {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:right': '', attr: { 'w:val': leftBArr[1], 'w:sz': '8', 'w:space': '0', 'w:color': leftBArr[2] } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            }
                                            else {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                    'w:tcBorders': [
                                                        { 'w:right': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0', 'w:color': leftBArr[2] } }
                                                    ]
                                                }); // push
                                                this.globalTable;
                                            }
                                        }
                                        else if (typeof leftBArr[2] == 'string') {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:right': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0', 'w:color': leftBArr[2] } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                        else {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                                'w:tcBorders': [
                                                    { 'w:right': '', attr: { 'w:val': 'single', 'w:sz': '8', 'w:space': '0' } }
                                                ]
                                            }); // push
                                            this.globalTable;
                                        }
                                    } //  check  size And Type  And Color in  Border
                                }
                                /*****************************  END Left Border ************************/
                                /*****************************  Check Null Border ************************/
                                this.globalTable;
                                if (topBorder == undefined || topBorder == "") {
                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                        'w:tcBorders': [
                                            { 'w:top': '', attr: { 'w:val': 'nil' } }
                                        ]
                                    }); // push
                                    this.globalTable;
                                }
                                if (bottomBorder == undefined || bottomBorder == "") {
                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                        'w:tcBorders': [
                                            { 'w:bottom': '', attr: { 'w:val': 'nil' } }
                                        ]
                                    }); // push
                                    this.globalTable;
                                }
                                if (rightBorder == undefined || rightBorder == "") {
                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                        'w:tcBorders': [
                                            { 'w:left': '', attr: { 'w:val': 'nil' } }
                                        ]
                                    }); // push
                                    this.globalTable;
                                }
                                if (leftBorder == undefined || leftBorder == "") {
                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({
                                        'w:tcBorders': [
                                            { 'w:right': '', attr: { 'w:val': 'nil' } }
                                        ]
                                    }); // push
                                    this.globalTable;
                                }
                                this.globalTable;
                                /*****************************  END Check Null Border ************************/
                                // // ////////////////////////////////////////////END Border//////////////////////////////////////////////////
                            }
                            else {
                                this.globalTable;
                            }
                            ///////////////////////////////////////////////Align///////////////////////////////////////
                            if (align != undefined) { // if check align
                                this.globalTable;
                                var check = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].length;
                                if (checkNote) {
                                    if (check == 2) {
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].splice(0, 0, {
                                            'w:pPr': [
                                                { 'w:jc': '', attr: { 'w:val': align } }
                                            ]
                                        });
                                        if (tab != undefined) {
                                            var defTab = 'dot'; /// default Value of tab
                                            if (tab == 'dash') { // if for sending value of tab by user is tab = 'dash'
                                                tab = 'hyphen';
                                            }
                                            if (tab == 'hyphen' || tab == 'dot' || tab == 'underscore') {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push({ 'w:tabs': [
                                                        { 'w:tab': '', attr: { 'w:val': 'right', 'w:leader': tab, 'w:pos': '2880' } }
                                                    ] }, { 'w:bidi': '' });
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].push({ 'w:r': [
                                                        { 'w:rPr': [
                                                                { 'w:rtl': '' },
                                                                { 'w:lang': '', attr: { 'w:bidi': 'Fa-IR' } }
                                                            ] },
                                                        { 'w:tab': '' }
                                                    ] });
                                            }
                                            else { /// else for set value for tab
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push({ 'w:tabs': [
                                                        { 'w:tab': '', attr: { 'w:val': 'right', 'w:leader': defTab, 'w:pos': '2880' } }
                                                    ] }, { 'w:bidi': '' });
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].push({ 'w:r': [
                                                        { 'w:rPr': [
                                                                { 'w:rtl': '' },
                                                                { 'w:lang': '', attr: { 'w:bidi': 'Fa-IR' } }
                                                            ] },
                                                        { 'w:tab': '' }
                                                    ] });
                                            } // else
                                        } // if check for tab value
                                        this.globalTable;
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({ 'w:vAlign': '', attr: { 'w:val': align } });
                                        this.globalTable;
                                    }
                                    else if (check > 2) {
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push({ 'w:jc': '', attr: { 'w:val': align } });
                                        if (tab != undefined) {
                                            var defTab = 'dot'; /// default Value of tab
                                            if (tab == 'dash') { // if for sending value of tab by user is tab = 'dash'
                                                tab = 'hyphen';
                                            }
                                            if (tab == 'hyphen' || tab == 'dot' || tab == 'underscore') {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push({ 'w:tabs': [
                                                        { 'w:tab': '', attr: { 'w:val': 'right', 'w:leader': tab, 'w:pos': '2880' } }
                                                    ] }, { 'w:bidi': '' });
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].push({ 'w:r': [
                                                        { 'w:rPr': [
                                                                { 'w:rtl': '' },
                                                                { 'w:lang': '', attr: { 'w:bidi': 'Fa-IR' } }
                                                            ] },
                                                        { 'w:tab': '' }
                                                    ] });
                                            }
                                            else { /// else for set value for tab
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push({ 'w:tabs': [
                                                        { 'w:tab': '', attr: { 'w:val': 'right', 'w:leader': defTab, 'w:pos': '2880' } }
                                                    ] }, { 'w:bidi': '' });
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].push({ 'w:r': [
                                                        { 'w:rPr': [
                                                                { 'w:rtl': '' },
                                                                { 'w:lang': '', attr: { 'w:bidi': 'Fa-IR' } }
                                                            ] },
                                                        { 'w:tab': '' }
                                                    ] });
                                            } // else
                                        } // if check for tab value
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({ 'w:vAlign': '', attr: { 'w:val': align } });
                                    }
                                }
                                else {
                                    if (check == 1) {
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].splice(0, 0, {
                                            'w:pPr': [
                                                { 'w:jc': '', attr: { 'w:val': align } }
                                            ]
                                        });
                                        if (tab != undefined) {
                                            var defTab = 'dot'; /// default Value of tab
                                            if (tab == 'dash') { // if for sending value of tab by user is tab = 'dash'
                                                tab = 'hyphen';
                                            }
                                            if (tab == 'hyphen' || tab == 'dot' || tab == 'underscore') {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push({ 'w:tabs': [
                                                        { 'w:tab': '', attr: { 'w:val': 'right', 'w:leader': tab, 'w:pos': '2880' } }
                                                    ] }, { 'w:bidi': '' });
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].push({ 'w:r': [
                                                        { 'w:rPr': [
                                                                { 'w:rtl': '' },
                                                                { 'w:lang': '', attr: { 'w:bidi': 'Fa-IR' } }
                                                            ] },
                                                        { 'w:tab': '' }
                                                    ] });
                                            }
                                            else { /// else for set value for tab
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push({ 'w:tabs': [
                                                        { 'w:tab': '', attr: { 'w:val': 'right', 'w:leader': defTab, 'w:pos': '2880' } }
                                                    ] }, { 'w:bidi': '' });
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].push({ 'w:r': [
                                                        { 'w:rPr': [
                                                                { 'w:rtl': '' },
                                                                { 'w:lang': '', attr: { 'w:bidi': 'Fa-IR' } }
                                                            ] },
                                                        { 'w:tab': '' }
                                                    ] });
                                            } // else
                                        } // if check for tab value
                                        this.globalTable;
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({ 'w:vAlign': '', attr: { 'w:val': align } });
                                    }
                                    else if (check > 1) {
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push({ 'w:jc': '', attr: { 'w:val': align } });
                                        if (tab != undefined) {
                                            var defTab = 'dot'; /// default Value of tab
                                            if (tab == 'dash') { // if for sending value of tab by user is tab = 'dash'
                                                tab = 'hyphen';
                                            }
                                            if (tab == 'hyphen' || tab == 'dot' || tab == 'underscore') {
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push({ 'w:tabs': [
                                                        { 'w:tab': '', attr: { 'w:val': 'right', 'w:leader': tab, 'w:pos': '2880' } }
                                                    ] }, { 'w:bidi': '' });
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].push({ 'w:r': [
                                                        { 'w:rPr': [
                                                                { 'w:rtl': '' },
                                                                { 'w:lang': '', attr: { 'w:bidi': 'Fa-IR' } }
                                                            ] },
                                                        { 'w:tab': '' }
                                                    ] });
                                            }
                                            else { /// else for set value for tab
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push({ 'w:tabs': [
                                                        { 'w:tab': '', attr: { 'w:val': 'right', 'w:leader': defTab, 'w:pos': '2880' } }
                                                    ] }, { 'w:bidi': '' });
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].push({ 'w:r': [
                                                        { 'w:rPr': [
                                                                { 'w:rtl': '' },
                                                                { 'w:lang': '', attr: { 'w:bidi': 'Fa-IR' } }
                                                            ] },
                                                        { 'w:tab': '' }
                                                    ] });
                                            } // else
                                        } // if check for tab value
                                        this.globalTable;
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({ 'w:vAlign': '', attr: { 'w:val': align } });
                                    }
                                } // else checkNote
                                this.globalTable;
                            } // if check align
                            //////////////////////////////////////////END Align//////////////////////////////////////////////
                            //////////////////////////////////////////FontFamily//////////////////////////////////////////////
                            if (fontFamily != undefined) { // if  check font
                                this.globalTable;
                                var checkP = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].length;
                                checkP;
                                checkNote;
                                if (checkNote) {
                                    if (checkP == 2) {
                                        var checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].length;
                                        checkR;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].splice(0, 0, {
                                                'w:rPr': [
                                                    { 'w:rFonts': '', attr: { 'w:cs': fontFamily } },
                                                    { 'w:rtl': '' }
                                                ]
                                            } // 'w:rPr'
                                            );
                                            this.globalTable;
                                        }
                                        else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'][0]['w:rPr'].push({ 'w:rFonts': '', attr: { 'w:cs': fontFamily } }, { 'w:rtl': '' });
                                            this.globalTable;
                                        }
                                    }
                                    else if (checkP > 2) {
                                        var checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].length;
                                        checkR;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].splice(0, 0, {
                                                'w:rPr': [
                                                    { 'w:rFonts': '', attr: { 'w:cs': fontFamily } },
                                                    { 'w:rtl': '' }
                                                ]
                                            } // 'w:rPr'
                                            );
                                            this.globalTable;
                                        }
                                        else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'][0]['w:rPr'].push({ 'w:rFonts': '', attr: { 'w:cs': fontFamily } }, { 'w:rtl': '' });
                                            this.globalTable;
                                        }
                                    }
                                }
                                else { // check note
                                    if (checkP == 1) {
                                        var checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].length;
                                        checkR;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].splice(0, 0, {
                                                'w:rPr': [
                                                    { 'w:rFonts': '', attr: { 'w:cs': fontFamily } },
                                                    { 'w:rtl': '' }
                                                ]
                                            } // 'w:rPr'
                                            );
                                            this.globalTable;
                                        }
                                        else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'][0]['w:rPr'].push({ 'w:rFonts': '', attr: { 'w:cs': fontFamily } }, { 'w:rtl': '' });
                                            this.globalTable;
                                        }
                                    }
                                    else if (checkP > 1) {
                                        var checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].length;
                                        checkR;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].splice(0, 0, {
                                                'w:rPr': [
                                                    { 'w:rFonts': '', attr: { 'w:cs': fontFamily } },
                                                    { 'w:rtl': '' }
                                                ]
                                            } // 'w:rPr'
                                            );
                                            this.globalTable;
                                        }
                                        else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'][0]['w:rPr'].push({ 'w:rFonts': '', attr: { 'w:cs': fontFamily } }, { 'w:rtl': '' });
                                            this.globalTable;
                                        }
                                    }
                                }
                            } // if  check font
                            //////////////////////////////////////////END FontFamily//////////////////////////////////////////////
                            ///////////////////////////////////////////////// FontColor /////////////////////////////////////
                            if (fontColor != undefined) { // if  fontColor
                                var checkP = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].length;
                                if (checkP == 1) {
                                    var checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].length;
                                    if (checkR == 1) {
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].splice(0, 0, {
                                            'w:rPr': [
                                                { 'w:color': '', attr: { 'w:val': fontColor } }
                                            ]
                                        } // 'w:rPr'
                                        );
                                    }
                                    else if (checkR > 1) {
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'][0]['w:rPr'].push({ 'w:color': '', attr: { 'w:val': fontColor } });
                                    }
                                }
                                else if (checkP > 1) {
                                    var checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].length;
                                    if (checkR == 1) {
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].splice(0, 0, {
                                            'w:rPr': [
                                                { 'w:color': '', attr: { 'w:val': fontColor } }
                                            ]
                                        } // 'w:rPr'
                                        );
                                    }
                                    else if (checkR > 1) {
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'][0]['w:rPr'].push({ 'w:color': '', attr: { 'w:val': fontColor } });
                                    }
                                }
                            } // if check fontColor
                            /////////////////////////////////////////////////End FontColor /////////////////////////////////////
                            ///////////////////////////////////////////////// FontSize //////////////////////////////////////
                            if (fontSize != undefined) { // if check fontSize
                                var checkP = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].length;
                                fontSize = 2 * fontSize;
                                checkP;
                                if (checkNote) {
                                    if (checkP == 2) {
                                        var checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].length;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].splice(0, 0, {
                                                'w:rPr': [
                                                    { 'w:szCs': '', attr: { 'w:val': fontSize } }
                                                ]
                                            } // 'w:rPr'
                                            );
                                            this.globalTable;
                                        }
                                        else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'][0]['w:rPr'].push({ 'w:szCs': '', attr: { 'w:val': fontSize } });
                                            this.globalTable;
                                        }
                                    }
                                    else if (checkP > 2) {
                                        var checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].length;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].splice(0, 0, {
                                                'w:rPr': [
                                                    { 'w:szCs': '', attr: { 'w:val': fontSize } }
                                                ]
                                            } // 'w:rPr'
                                            );
                                            this.globalTable;
                                        }
                                        else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'][0]['w:rPr'].push({ 'w:szCs': '', attr: { 'w:val': fontSize } });
                                            this.globalTable;
                                        }
                                    }
                                }
                                else { // checkNote
                                    if (checkP == 1) {
                                        var checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].length;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].splice(0, 0, {
                                                'w:rPr': [
                                                    { 'w:szCs': '', attr: { 'w:val': fontSize } }
                                                ]
                                            } // 'w:rPr'
                                            );
                                            this.globalTable;
                                        }
                                        else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'][0]['w:rPr'].push({ 'w:szCs': '', attr: { 'w:val': fontSize } });
                                            this.globalTable;
                                        }
                                    }
                                    else if (checkP > 1) {
                                        var checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].length;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].splice(0, 0, {
                                                'w:rPr': [
                                                    { 'w:szCs': '', attr: { 'w:val': fontSize } }
                                                ]
                                            } // 'w:rPr'
                                            );
                                            this.globalTable;
                                        }
                                        else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'][0]['w:rPr'].push({ 'w:szCs': '', attr: { 'w:val': fontSize } });
                                            this.globalTable;
                                        }
                                    }
                                } // else checkNote
                            } //  if check fontSize
                            //////////////////////////////////////////////////END FontSize ////////////////////////////////////////
                            ///////////////////////////////////////////////// Check Background //////////////////////////////////////
                            if (backgroundCell != undefined) { // if check background cell table
                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push({ 'w:shd': '', attr: { 'w:val': 'clear', 'w:color': 'auto', 'w:fill': backgroundCell } });
                            } // if check background cell table
                            ///////////////////////////////////////////////// END Check Background //////////////////////////////////////
                            /////////////////////////////////////////////////  Bold //////////////////////////////////////
                            if (bold) { // if for check bold
                                var checkP = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].length;
                                if (checkNote) {
                                    if (checkP == 2) {
                                        var checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].length;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].splice(0, 0, {
                                                'w:rPr': [
                                                    { 'w:bCs': '' } // <w:bCs/>
                                                ]
                                            } // 'w:rPr'
                                            );
                                            this.globalTable;
                                        }
                                        else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'][0]['w:rPr'].push({ 'w:bCs': '' } // <w:bCs/>
                                            );
                                            this.globalTable;
                                        }
                                    }
                                    else if (checkP > 2) {
                                        var checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].length;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].splice(0, 0, {
                                                'w:rPr': [
                                                    { 'w:bCs': '' } // <w:bCs/>
                                                ]
                                            } // 'w:rPr'
                                            );
                                            this.globalTable;
                                        }
                                        else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'][0]['w:rPr'].push({ 'w:bCs': '' } // <w:bCs/>
                                            );
                                            this.globalTable;
                                        }
                                    }
                                }
                                else {
                                    if (checkP == 1) {
                                        var checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].length;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].splice(0, 0, {
                                                'w:rPr': [
                                                    { 'w:bCs': '' } // <w:bCs/>
                                                ]
                                            } // 'w:rPr'
                                            );
                                        }
                                        else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'][0]['w:rPr'].push({ 'w:bCs': '' } // <w:bCs/>
                                            );
                                        }
                                        this.globalTable;
                                    }
                                    else if (checkP > 1) {
                                        var checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].length;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].splice(0, 0, {
                                                'w:rPr': [
                                                    { 'w:bCs': '' } // <w:bCs/>
                                                ]
                                            } // 'w:rPr'
                                            );
                                            this.globalTable;
                                        }
                                        else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'][0]['w:rPr'].push({ 'w:bCs': '' } // <w:bCs/>
                                            );
                                            this.globalTable;
                                        }
                                    }
                                } //  else checkNote
                            } // if for check bold
                            ///////////////////////////////////////////////////////END Bold ///////////////////////////////////////////////
                        } // check newStyle
                    } // for j
                } // for i
                return this.globalTable;
            }
            else {
                throw "Type of style is not object";
            } // else
        }
        else {
            return this.globalTable;
        } //  else
    };
    table.prototype.callingMethod = function (body, data, style) {
        var objTr = this.createTr(body, data);
        var objTc = this.createTc(objTr, data);
        var objP = this.createPtable(objTc, data);
        var objNote = this.createNote(objP);
        var objMerge = this.createMerge(objNote, data);
        var objStyle = this.tableStyle();
        //return objMerge;
        return objStyle;
        // return objNote;
        // next(json2xml(objMerge,{ attributes_key:'attr' } ));
    };
    return table;
}()); //  class
exports.table = table;
//# sourceMappingURL=createTable.js.map