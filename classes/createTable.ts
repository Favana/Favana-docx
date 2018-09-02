import {} from 'mocha';
import {type} from "os";

let json2xml = require('json2xml');
let _ = require('lodash');

export class table {

    /**@
     *
     * @type {string}
     * private globalTable ===>  Table Body Object
     * private globalData  ===>  The data sent from the server side
     */



    private globalTable = " ";
    private globalData = " ";
    public checkNote   = " " ;

    createTr(_body: any, data: any) {
        this.globalData = data;
        let check = _body['w:tbl'].length;
        if (check == 1) {
            _body;
        } else {
            for (let i = 1; i < check; i++) {
                _body['w:tbl'].pop();
            }
        }
        _body;
        let counterRow = _.uniqBy(data, 'x');
        let row = counterRow.length;

        for (let i = 0; i < row; i++) {
            _body['w:tbl'].push({'w:tr': []});
        }
        return _body;

    }//createTr

    createTc(_body: any, data: any) {

        let counterCol = _.uniqBy(data, 'y');
        let counterRow = _.uniqBy(data, 'x');
        let row = counterRow.length;
        let col = counterCol.length;

        for (let i = 1; i <= row; i++) {
            for (let j = 0; j < col; j++) {
                _body['w:tbl'][i]['w:tr'].push({
                    'w:tc': [{
                        'w:tcPr': [{
                            'w:tcW': '',
                            attr: {'w:w': 4657, 'w:type': 'dxa'}
                        }]
                    },]
                });
            }// for column
        }//for row
        return _body;
    }//createTc
    createPtable(_body: any, data: any) {

        let counterCol = _.uniqBy(data, 'y');
        let counterRow = _.uniqBy(data, 'x');
        let row = counterRow.length;
        let col = counterCol.length;

        for (let i = 1; i <= row; i++) {
            for (let j = 0; j < col; j++) {
                let checkValue = _.find(data, {x: i, y: j});
                let value = checkValue.value;
                let note = checkValue.note;
                if (value == '') {
                    _body['w:tbl'][i]['w:tr'][j]['w:tc'].push({'w:p': []});
                } else {
                    _body['w:tbl'][i]['w:tr'][j]['w:tc'].push({
                        'w:p': [

                            {
                                'w:r': [
                                    {'w:t': value}
                                ]
                            }]
                    });
                    _body;
                }
            }// for col
        }// for row
        return _body;
    }//createP

    createNote(_body){
        _body;
        // let _body = this.globalTable;
        let data = this.globalData;
        let findX = _.uniqBy(data, 'x');
        let findY = _.uniqBy(data, 'y');
        let count = data.length;
        let counterX = findX.length;
        let counterY = findY.length;
        counterY;
        counterX;
        for(let i=1; i<=counterX; i++){
            for(let j=0; j<counterY; j++){
                let dataInfo = _.find(data, {x:i,y:j});
                dataInfo;
                let note = dataInfo.note;
                note;
                if(note){
                    let text = note.text;
                    let position = note.position;
                    if(text != ""){
                        _body['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].push(
                            {'w:r':[
                                    {'w:rPr':[
                                            {'w:vertAlign':'' ,attr:{'w:val':'superscript'}} ,
                                            {'w:rtl':''}
                                        ]},// </w:rPr>
                                    {'w:t':note.text}
                                ]});
                        _body;
                    }
                }// note
            }
        }
        return _body;

    }


    createMerge(_body: any, data: any) {
        _body;
        let counterCol = _.uniqBy(data, 'y');
        let counterRow = _.uniqBy(data, 'x');
        let row = counterRow.length;
        let col = counterCol.length;
        let start = [];
        for (let i = 1; i <= row; i++) {
            for (let j = 0; j < col; j++) {
                let checkMerge = _.find(data, {x: i, y: j});
                let rowX = checkMerge.mergeRow;
                let colY = checkMerge.mergeCol;

                if (colY != '' && rowX != '') {
                    let myX = checkMerge.x;
                    let myY = checkMerge.y;
                    myY;
                    let counterY = colY;// mergeCol
                    let counterX = rowX; //mergeRow
                    /// start merge Row and Col
                    _body['w:tbl'][myX]['w:tr'][myY]['w:tc'][0]['w:tcPr'].push(
                        {'w:vMerge': '',attr: {'w:val': 'restart'}}, {'w:gridSpan': '', attr: {'w:val': colY}}); //
                    let b = _body;
                    b;
                    let newWidth = colY*4657;
                    newWidth;
                    _body;
                    let test = _body['w:tbl'][myX]['w:tr'][myY]['w:tc'][0]['w:tcPr'].splice(0,1,{
                        'w:tcW':'', attr:{'w:w':newWidth, 'w:type':'dxa'}
                    });
                    ///// loop for merge Col:
                    for (let i = 1; i < counterY; i++) {
                        myY = myY + 1;
                        delete _body['w:tbl'][myX]['w:tr'][myY]; // merge col
                    }// for
                    /// end loop for
                    let c = _body;
                    c;
                    ///// loop for merge Row:
                    for (let i = 1; i < counterX; i++) {
                        myY = 0;
                        myY = checkMerge.y
                        myX = myX + 1;
                        _body['w:tbl'][myX]['w:tr'][myY]['w:tc'][0]['w:tcPr'].push({'w:vMerge': []}, {
                            'w:gridSpan': '',
                            attr: {'w:val': colY}
                        }); // merge row
                    }// for
                    /// end loop for
                    let z = _body;
                    z;
                    ///// loop for merge Col:
                    for (let i = 1; i < counterY; i++) {
                        myY = myY + 1;
                        myX;
                        delete _body['w:tbl'][myX]['w:tr'][myY]; // merge col
                    }// for
                    /// end loop for
                    let a = _body;
                    a;

                }// if
                //
                /*else*/
                else   if (colY != '' && rowX == '') {
                    let myX = checkMerge.x;
                    let myY = checkMerge.y;
                    let counterY = colY;
                    counterY;
                    /// start merge Row and Col
                    _body['w:tbl'][myX]['w:tr'][myY]['w:tc'][0]['w:tcPr'].push({
                        'w:gridSpan': '',
                        attr: {'w:val': colY}
                    }); ///<w:gridSpan w:val="2"/>
                    let newWidth = colY*4657;
                    newWidth;
                    let test = _body['w:tbl'][myX]['w:tr'][myY]['w:tc'][0]['w:tcPr'].splice(0,1,{
                        'w:tcW':'', attr:{'w:w':newWidth, 'w:type':'dxa'}
                    });

                    ///// loop for merge Col:
                    for (let i = 1; i < counterY; i++) {
                        myY = myY + 1;
                        delete _body['w:tbl'][myX]['w:tr'][myY]; // merge col
                    }// for
                    let c = _body;
                    c;

                }// else if
                else if (colY == '' && rowX != '') {
                    let myY = checkMerge.y;
                    let myX = checkMerge.x;
                    let counterX = rowX;

                    /// start merge Row and Row
                    _body['w:tbl'][myX]['w:tr'][myY]['w:tc'][0]['w:tcPr'].push({
                        'w:vMerge': '',
                        attr: {'w:val': 'restart'}
                    }); ///<w:vMerge w:val="restart"/>
                    let b = _body;
                    b;

                    ///// loop for merge Row:
                    for (let i = 1; i < counterX; i++) {
                        myX = myX + 1;
                        _body['w:tbl'][myX]['w:tr'][myY]['w:tc'][0]['w:tcPr'].push({'w:vMerge': []});
                    }// for
                    let c = _body;
                    c

                } // else ifs
            }// for col
        }// for row
        this.globalTable = _body;
        return this.globalTable;

    }//createMerge

    tableStyle() {
        this.globalTable;// tbl body object
        this.globalData; // The data sent from the server side
        let count = this.globalData.length;
        let styleObject = {};
        let styleData = [];
        for (let i = 0; i < count; i++) {
            let infoData = _.find(this.globalData, this.globalData[i]);
            let x = infoData.x;
            let y = infoData.y;
            let checkMergeCol = infoData.mergeCol;
            let style = infoData.style;

            let check = Object.keys(styleObject).length;
            if (check == 0) {
                styleObject = {x: x, y: y, style: style};
                styleData.push(styleObject);
            } else if (check > 0) {
                if(style == undefined){
                    styleObject = {x: x, y: y};
                    styleData.push(styleObject);
                }else{
                    styleObject = {x: x, y: y, style: style};
                    styleData.push(styleObject);
                }

            }
        }//  for

        if (styleData != null) {
            if (typeof  styleData == 'object') {
                let counterX = _.uniqBy(styleData, 'x');
                let counterY = _.uniqBy(styleData, 'y');
                let counterCol = counterY.length;
                let counterRow = counterX.length;

                for (let i = 1; i <= counterRow; i++) {
                    for (let j = 0; j < counterCol; j++) {
                        let find = _.find(styleData, {x: i, y: j});
                        let newStyle = find.style;
                        let  findNote = _.find(this.globalData, {x:i, y:j});
                        let checkNote = findNote.note;


                        if(newStyle != undefined ){
                            let align = newStyle.align;
                            let tab = newStyle.tab;
                            let fontFamily = newStyle.fontFamily;
                            let fontColor = newStyle.fontColor;
                            let fontSize = newStyle.fontSize;
                            let backgroundCell = newStyle.background;
                            let bold = newStyle.bold;

                            let findBorder = newStyle.border;
                            if(findBorder != undefined){
                                let topBorder = newStyle.border.top;
                                let bottomBorder =newStyle.border.bottom;
                                let rightBorder = newStyle.border.right;
                                let leftBorder = newStyle.border.left;

                                /***
                                 @IndexArray:
                                 0 = size
                                 1 =  type
                                 2 =color
                                 * */

///////////////////////////////////////////////////CHECK BORDER  ///////////////////////////////////////////////
                                /****************************   TopBorder ********************//////////
                                if( topBorder){
                                    let topBArr = topBorder.split(' ') ;
                                    let check =topBArr.length;
                                    check;

                                    if(check == 1){
                                        if(Number(topBArr[0])){
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:top':'', attr:{'w:val':'single','w:sz':topBArr[0], 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }else{
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:top':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }
                                    }//  check sizeBorder top

                                    if(check == 2 ){ // check type border
                                        if(Number(topBArr[0])){
                                            if(topBArr[1] == 'single' || topBArr[1] == 'double' || topBArr[1] == 'dashed'){
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:top':'', attr:{'w:val':topBArr[1],'w:sz':topBArr[0], 'w:space': '0'}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }else{
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:top':'', attr:{'w:val':'single','w:sz':topBArr[0], 'w:space': '0'}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }//  check type pf Border
                                        }else if(topBArr[1] == 'single' || topBArr[1] == 'double' || topBArr[1] == 'dashed'){
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:top':'', attr:{'w:val':topBArr[1],'w:sz':'8', 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }else {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:top':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }
                                    }//  check  size And Type in  Border

                                    if(check == 3){
                                        if(Number(topBArr[0])){
                                            if(topBArr[1] == 'single' || topBArr[1] == 'double' || topBArr[1] == 'dashed'){
                                                if(typeof  topBArr[2] == "string"){
                                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                        {
                                                            'w:tcBorders':[
                                                                {'w:top':'', attr:{'w:val':topBArr[1],'w:sz':topBArr[0], 'w:space': '0','w:color':topBArr[2]}}
                                                            ]
                                                        }
                                                    );// push
                                                    this.globalTable;
                                                }else{
                                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                        {
                                                            'w:tcBorders':[
                                                                {'w:top':'', attr:{'w:val':topBArr[1],'w:sz':topBArr[0], 'w:space': '0','w:color':'auto'}}
                                                            ]
                                                        }
                                                    );// push
                                                    this.globalTable;
                                                } // check color
                                            }else{
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:top':'', attr:{'w:val':'single','w:sz':topBArr[0], 'w:space': '0', 'w:color':topBArr[2]}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }//  check type border
                                        }else if(topBArr[1] == 'single' || topBArr[1] == 'double' || topBArr[1] == 'dashed'){
                                            if(typeof  topBArr[2] == "string"){
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:top':'', attr:{'w:val':topBArr[1],'w:sz':'8', 'w:space': '0', 'w:color':topBArr[2]}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }else{
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:top':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0', 'w:color':topBArr[2]}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }
                                        }else if(typeof  topBArr[2] == 'string'){
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:top':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0', 'w:color':topBArr[2]}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }else{
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:top':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }
                                    }//  check  size And Type  And Color in  Border
                                } // top Border
                                /********************************************* End  TopBorder   ***********//////////


                                /*********************************************   bottomBorder   ***********//////////
                                if(bottomBorder){
                                    let bottomBArr = bottomBorder.split(' ') ;
                                    let check =bottomBArr.length;
                                    bottomBArr
                                    if(check == 1){
                                        if(Number(bottomBArr[0])){
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:bottom':'', attr:{'w:val':'single','w:sz':bottomBArr[0], 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }else{
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:bottom':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }
                                    }//  check sizeBorder top

                                    if(check == 2 ){ // check type border
                                        if(Number(bottomBArr[0])){
                                            if(bottomBArr[1] == 'single' || bottomBArr[1] == 'double' || bottomBArr[1] == 'dashed'){
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:bottom':'', attr:{'w:val':bottomBArr[1],'w:sz':bottomBArr[0], 'w:space': '0'}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }else{
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:bottom':'', attr:{'w:val':'single','w:sz':bottomBArr[0], 'w:space': '0'}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }//  check type pf Border
                                        }else if(bottomBArr[1] == 'single' || bottomBArr[1] == 'double' || bottomBArr[1] == 'dashed'){
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:bottom':'', attr:{'w:val':bottomBArr[1],'w:sz':'8', 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }else {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:bottom':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }
                                    }//  check  size And Type in  Border

                                    if(check == 3){
                                        if(Number(bottomBArr[0])){
                                            if(bottomBArr[1] == 'single' ||bottomBArr[1] == 'double' || bottomBArr[1] == 'dashed'){
                                                if(typeof  bottomBArr[2] == "string"){
                                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                        {
                                                            'w:tcBorders':[
                                                                {'w:bottom':'', attr:{'w:val':bottomBArr[1],'w:sz':bottomBArr[0], 'w:space': '0','w:color':bottomBArr[2]}}
                                                            ]
                                                        }
                                                    );// push
                                                    this.globalTable;
                                                }else{
                                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                        {
                                                            'w:tcBorders':[
                                                                {'w:bottom':'', attr:{'w:val':bottomBArr[1],'w:sz':bottomBArr[0], 'w:space': '0','w:color':'auto'}}
                                                            ]
                                                        }
                                                    );// push
                                                    this.globalTable;
                                                } // check color
                                            }else{
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:bottom':'', attr:{'w:val':'single','w:sz':bottomBArr[0], 'w:space': '0', 'w:color':bottomBArr[2]}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }//  check type border
                                        }else if(bottomBArr[1] == 'single' || bottomBArr[1] == 'double' || bottomBArr[1] == 'dashed'){
                                            if(typeof  bottomBArr[2] == "string"){
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:bottom':'', attr:{'w:val':bottomBArr[1],'w:sz':'8', 'w:space': '0', 'w:color':bottomBArr[2]}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }else{
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:bottom':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0', 'w:color':bottomBArr[2]}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }
                                        }else if(typeof bottomBArr[2] == 'string'){
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:bottom':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0', 'w:color':bottomBArr[2]}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }else{
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:bottom':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }
                                    }//  check  size And Type  And Color in  Border
                                }// bottom Border
                                /****************************** END Bottom Border ***////////////////////


                                /***************************** Right Border ************************/

                                if(rightBorder){
                                    let rightBArr = rightBorder.split(' ') ;
                                    let check =rightBArr.length;

                                    if(check == 1){
                                        if(Number(rightBArr[0])){
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:left':'', attr:{'w:val':'single','w:sz':rightBArr[0], 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }else{
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:left':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }
                                    }//  check sizeBorder top

                                    if(check == 2 ){ // check type border
                                        if(Number(rightBArr[0])){
                                            if(rightBArr[1] == 'single' || rightBArr[1] == 'double' || rightBArr[1] == 'dashed'){
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:left':'', attr:{'w:val':rightBArr[1],'w:sz':rightBArr[0], 'w:space': '0'}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }else{
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:left':'', attr:{'w:val':'single','w:sz':rightBArr[0], 'w:space': '0'}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }//  check type pf Border
                                        }else if(rightBArr[1] == 'single' || rightBArr[1] == 'double' || rightBArr[1] == 'dashed'){
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:left':'', attr:{'w:val':rightBArr[1],'w:sz':'8', 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }else {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:left':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }
                                    }//  check  size And Type in  Border

                                    if(check == 3){
                                        if(Number(rightBArr[0])){
                                            if(rightBArr[1] == 'single' ||rightBArr[1] == 'double' || rightBArr[1] == 'dashed'){
                                                if(typeof  rightBArr[2] == "string"){
                                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                        {
                                                            'w:tcBorders':[
                                                                {'w:left':'', attr:{'w:val':rightBArr[1],'w:sz':rightBArr[0], 'w:space': '0','w:color':rightBArr[2]}}
                                                            ]
                                                        }
                                                    );// push
                                                    this.globalTable;
                                                }else{
                                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                        {
                                                            'w:tcBorders':[
                                                                {'w:left':'', attr:{'w:val':rightBArr[1],'w:sz':rightBArr[0], 'w:space': '0','w:color':'auto'}}
                                                            ]
                                                        }
                                                    );// push
                                                    this.globalTable;
                                                } // check color
                                            }else{
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:left':'', attr:{'w:val':'single','w:sz':rightBArr[0], 'w:space': '0', 'w:color':rightBArr[2]}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }//  check type border
                                        }else if(rightBArr[1] == 'single' || rightBArr[1] == 'double' || rightBArr[1] == 'dashed'){
                                            if(typeof  rightBArr[2] == "string"){
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:left':'', attr:{'w:val':rightBArr[1],'w:sz':'8', 'w:space': '0', 'w:color':rightBArr[2]}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }else{
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:left':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0', 'w:color':rightBArr[2]}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }
                                        }else if(typeof rightBArr[2] == 'string'){
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:left':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0', 'w:color':rightBArr[2]}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }else{
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:left':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }
                                    }//  check  size And Type  And Color in  Border
                                }// right border
                                /***************************** END Right Border ************************/



                                /*****************************  Left Border ************************/

                                if(leftBorder){
                                    let leftBArr = leftBorder.split(' ') ;
                                    let check =leftBArr.length;

                                    if(check == 1){
                                        if(Number(leftBArr[0])){
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:right':'', attr:{'w:val':'single','w:sz':leftBArr[0], 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }else{
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:right':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }
                                    }//  check sizeBorder top

                                    if(check == 2 ){ // check type border
                                        if(Number(leftBArr[0])){
                                            if(leftBArr[1] == 'single' || leftBArr[1] == 'double' || leftBArr[1] == 'dashed'){
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:right':'', attr:{'w:val':leftBArr[1],'w:sz':leftBArr[0], 'w:space': '0'}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }else{
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:right':'', attr:{'w:val':'single','w:sz':leftBArr[0], 'w:space': '0'}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }//  check type pf Border
                                        }else if(leftBArr[1] == 'single' || leftBArr[1] == 'double' || leftBArr[1] == 'dashed'){
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:right':'', attr:{'w:val':leftBArr[1],'w:sz':'8', 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }else {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:right':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }
                                    }//  check  size And Type in  Border

                                    if(check == 3){
                                        if(Number(leftBArr[0])){
                                            if(leftBArr[1] == 'single' ||leftBArr[1] == 'double' || leftBArr[1] == 'dashed'){
                                                if(typeof  leftBArr[2] == "string"){
                                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                        {
                                                            'w:tcBorders':[
                                                                {'w:right':'', attr:{'w:val':leftBArr[1],'w:sz':leftBArr[0], 'w:space': '0','w:color':leftBArr[2]}}
                                                            ]
                                                        }
                                                    );// push
                                                    this.globalTable;
                                                }else{
                                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                        {
                                                            'w:tcBorders':[
                                                                {'w:right':'', attr:{'w:val':leftBArr[1],'w:sz':leftBArr[0], 'w:space': '0','w:color':'auto'}}
                                                            ]
                                                        }
                                                    );// push
                                                    this.globalTable;
                                                } // check color
                                            }else{
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:right':'', attr:{'w:val':'single','w:sz':leftBArr[0], 'w:space': '0', 'w:color':leftBArr[2]}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }//  check type border
                                        }else if(leftBArr[1] == 'single' || leftBArr[1] == 'double' || leftBArr[1] == 'dashed'){
                                            if(typeof  leftBArr[2] == "string"){
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:right':'', attr:{'w:val':leftBArr[1],'w:sz':'8', 'w:space': '0', 'w:color':leftBArr[2]}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }else{
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                    {
                                                        'w:tcBorders':[
                                                            {'w:right':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0', 'w:color':leftBArr[2]}}
                                                        ]
                                                    }
                                                );// push
                                                this.globalTable;
                                            }
                                        }else if(typeof leftBArr[2] == 'string'){
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:right':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0', 'w:color':leftBArr[2]}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }else{
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                                {
                                                    'w:tcBorders':[
                                                        {'w:right':'', attr:{'w:val':'single','w:sz':'8', 'w:space': '0'}}
                                                    ]
                                                }
                                            );// push
                                            this.globalTable;
                                        }
                                    }//  check  size And Type  And Color in  Border
                                }
                                /*****************************  END Left Border ************************/




                                /*****************************  Check Null Border ************************/
                                this.globalTable;
                                if(topBorder == undefined || topBorder == "") {
                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                        {
                                            'w:tcBorders': [
                                                {'w:top': '', attr: {'w:val': 'nil'}}
                                            ]
                                        }
                                    );// push
                                    this.globalTable;
                                }

                                if(bottomBorder == undefined || bottomBorder == ""){
                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                        {
                                            'w:tcBorders': [
                                                {'w:bottom':'', attr: {'w:val': 'nil'}}
                                            ]
                                        }
                                    );// push
                                    this.globalTable;
                                }
                                if(rightBorder == undefined || rightBorder == ""){
                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                        {
                                            'w:tcBorders': [
                                                {'w:left':'', attr: {'w:val': 'nil'}}
                                            ]
                                        }
                                    );// push
                                    this.globalTable;
                                }
                                if(leftBorder == undefined || leftBorder == ""){
                                    this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                        {
                                            'w:tcBorders': [
                                                {'w:right':'', attr: {'w:val': 'nil'}}
                                            ]
                                        }
                                    );// push
                                    this.globalTable
                                }

                                this.globalTable

                                /*****************************  END Check Null Border ************************/

// // ////////////////////////////////////////////END Border//////////////////////////////////////////////////
                            }else{
                                this.globalTable;
                            }




                            ///////////////////////////////////////////////Align///////////////////////////////////////
                            if (align != undefined) { // if check align
                                this.globalTable;
                                let check = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].length;
                                if(checkNote){
                                    if (check == 2) {
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].splice(0, 0,
                                            {
                                                'w:pPr': [
                                                    {'w:jc': '', attr: {'w:val': align}}
                                                ]
                                            }
                                        );
                                        if(tab != undefined){
                                            let defTab = 'dot'; /// default Value of tab
                                            if(tab == 'dash'){ // if for sending value of tab by user is tab = 'dash'
                                                tab = 'hyphen'
                                            }
                                            if(tab == 'hyphen' || tab == 'dot' || tab == 'underscore'){
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push(
                                                    {'w:tabs':[
                                                            {'w:tab':'' , attr:{'w:val':'right', 'w:leader':tab, 'w:pos':'2880'}}
                                                        ]},
                                                    {'w:bidi':''}
                                                );
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].push(
                                                    {'w:r':[
                                                            {'w:rPr':[
                                                                    {'w:rtl':''} ,
                                                                    {'w:lang':'', attr:{'w:bidi':'Fa-IR'}}
                                                                ]},
                                                            {'w:tab':''}
                                                        ]}
                                                );
                                            }else{ /// else for set value for tab
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push(
                                                    {'w:tabs':[
                                                            {'w:tab':'' , attr:{'w:val':'right', 'w:leader':defTab, 'w:pos':'2880'}}
                                                        ]},
                                                    {'w:bidi':''}
                                                );
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].push(
                                                    {'w:r':[
                                                            {'w:rPr':[
                                                                    {'w:rtl':''} ,
                                                                    {'w:lang':'', attr:{'w:bidi':'Fa-IR'}}
                                                                ]},
                                                            {'w:tab':''}
                                                        ]}
                                                );
                                            } // else
                                        }// if check for tab value
                                        this.globalTable;
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                            {'w:vAlign':'', attr: {'w:val': align}}
                                        );
                                        this.globalTable
                                    } else if (check > 2) {
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push(
                                            {'w:jc': '', attr: {'w:val': align}}
                                        );
                                        if(tab != undefined){
                                            let defTab = 'dot'; /// default Value of tab
                                            if(tab == 'dash'){ // if for sending value of tab by user is tab = 'dash'
                                                tab = 'hyphen'
                                            }
                                            if(tab == 'hyphen' || tab == 'dot' || tab == 'underscore'){
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push(
                                                    {'w:tabs':[
                                                            {'w:tab':'' , attr:{'w:val':'right', 'w:leader':tab, 'w:pos':'2880'}}
                                                        ]},
                                                    {'w:bidi':''}
                                                );
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].push(
                                                    {'w:r':[
                                                            {'w:rPr':[
                                                                    {'w:rtl':''} ,
                                                                    {'w:lang':'', attr:{'w:bidi':'Fa-IR'}}
                                                                ]},
                                                            {'w:tab':''}
                                                        ]}
                                                );
                                            }else{ /// else for set value for tab
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push(
                                                    {'w:tabs':[
                                                            {'w:tab':'' , attr:{'w:val':'right', 'w:leader':defTab, 'w:pos':'2880'}}
                                                        ]},
                                                    {'w:bidi':''}
                                                );
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].push(
                                                    {'w:r':[
                                                            {'w:rPr':[
                                                                    {'w:rtl':''} ,
                                                                    {'w:lang':'', attr:{'w:bidi':'Fa-IR'}}
                                                                ]},
                                                            {'w:tab':''}
                                                        ]}
                                                );
                                            } // else
                                        }// if check for tab value
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                            {'w:vAlign':'', attr: {'w:val': align}}
                                        );
                                    }
                                }else{
                                    if (check == 1) {
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].splice(0, 0,
                                            {
                                                'w:pPr': [
                                                    {'w:jc': '', attr: {'w:val': align}}
                                                ]
                                            }
                                        );
                                        if(tab != undefined){
                                            let defTab = 'dot'; /// default Value of tab
                                            if(tab == 'dash'){ // if for sending value of tab by user is tab = 'dash'
                                                tab = 'hyphen'
                                            }
                                            if(tab == 'hyphen' || tab == 'dot' || tab == 'underscore'){
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push(
                                                    {'w:tabs':[
                                                            {'w:tab':'' , attr:{'w:val':'right', 'w:leader':tab, 'w:pos':'2880'}}
                                                        ]},
                                                    {'w:bidi':''}
                                                );
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].push(
                                                    {'w:r':[
                                                            {'w:rPr':[
                                                                    {'w:rtl':''} ,
                                                                    {'w:lang':'', attr:{'w:bidi':'Fa-IR'}}
                                                                ]},
                                                            {'w:tab':''}
                                                        ]}
                                                );
                                            }else{ /// else for set value for tab
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push(
                                                    {'w:tabs':[
                                                            {'w:tab':'' , attr:{'w:val':'right', 'w:leader':defTab, 'w:pos':'2880'}}
                                                        ]},
                                                    {'w:bidi':''}
                                                );
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].push(
                                                    {'w:r':[
                                                            {'w:rPr':[
                                                                    {'w:rtl':''} ,
                                                                    {'w:lang':'', attr:{'w:bidi':'Fa-IR'}}
                                                                ]},
                                                            {'w:tab':''}
                                                        ]}
                                                );
                                            } // else
                                    }// if check for tab value
                                        this.globalTable;
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                            {'w:vAlign':'', attr: {'w:val': align}}
                                        );

                                    } else if (check > 1) {
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push(
                                            {'w:jc': '', attr: {'w:val': align}}
                                        );
                                        if(tab != undefined){
                                            let defTab = 'dot'; /// default Value of tab
                                            if(tab == 'dash'){ // if for sending value of tab by user is tab = 'dash'
                                                tab = 'hyphen'
                                            }
                                            if(tab == 'hyphen' || tab == 'dot' || tab == 'underscore'){
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push(
                                                    {'w:tabs':[
                                                            {'w:tab':'' , attr:{'w:val':'right', 'w:leader':tab, 'w:pos':'2880'}}
                                                        ]},
                                                    {'w:bidi':''}
                                                );
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].push(
                                                    {'w:r':[
                                                            {'w:rPr':[
                                                                    {'w:rtl':''} ,
                                                                    {'w:lang':'', attr:{'w:bidi':'Fa-IR'}}
                                                                ]},
                                                            {'w:tab':''}
                                                        ]}
                                                );
                                            }else{ /// else for set value for tab
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:pPr'].push(
                                                    {'w:tabs':[
                                                            {'w:tab':'' , attr:{'w:val':'right', 'w:leader':defTab, 'w:pos':'2880'}}
                                                        ]},
                                                    {'w:bidi':''}
                                                );
                                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].push(
                                                    {'w:r':[
                                                            {'w:rPr':[
                                                                    {'w:rtl':''} ,
                                                                    {'w:lang':'', attr:{'w:bidi':'Fa-IR'}}
                                                                ]},
                                                            {'w:tab':''}
                                                        ]}
                                                );
                                            } // else
                                        }// if check for tab value
                                        this.globalTable
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                            {'w:vAlign':'', attr: {'w:val': align}}
                                        );
                                    }
                                } // else checkNote
                                this.globalTable;
                            }// if check align
                            //////////////////////////////////////////END Align//////////////////////////////////////////////



                            //////////////////////////////////////////FontFamily//////////////////////////////////////////////
                            if (fontFamily != undefined) { // if  check font
                                this.globalTable;
                                let checkP = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].length;
                                checkP;
                                checkNote;
                                if(checkNote){
                                    if (checkP == 2) {
                                        let checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].length;
                                        checkR;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].splice(0, 0,
                                                {
                                                    'w:rPr': [
                                                        {'w:rFonts': '', attr: {'w:cs': fontFamily}},
                                                        {'w:rtl': ''}
                                                    ]
                                                }// 'w:rPr'
                                            );
                                            this.globalTable;
                                        } else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'][0]['w:rPr'].push(
                                                {'w:rFonts': '', attr: {'w:cs': fontFamily}},
                                                {'w:rtl': ''}
                                            );
                                            this.globalTable;
                                        }
                                    } else if (checkP > 2) {
                                        let checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].length;
                                        checkR;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].splice(0, 0,
                                                {
                                                    'w:rPr': [
                                                        {'w:rFonts': '', attr: {'w:cs': fontFamily}},
                                                        {'w:rtl': ''}
                                                    ]
                                                }// 'w:rPr'
                                            );
                                            this.globalTable;
                                        } else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'][0]['w:rPr'].push(
                                                {'w:rFonts': '', attr: {'w:cs': fontFamily}},
                                                {'w:rtl': ''}
                                            );
                                            this.globalTable;
                                        }
                                    }
                                }else{// check note
                                    if (checkP == 1) {
                                        let checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].length;
                                        checkR;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].splice(0, 0,
                                                {
                                                    'w:rPr': [
                                                        {'w:rFonts': '', attr: {'w:cs': fontFamily}},
                                                        {'w:rtl': ''}
                                                    ]
                                                }// 'w:rPr'
                                            );
                                            this.globalTable
                                        } else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'][0]['w:rPr'].push(
                                                {'w:rFonts': '', attr: {'w:cs': fontFamily}},
                                                {'w:rtl': ''}
                                            );
                                            this.globalTable
                                        }
                                    } else if (checkP > 1) {
                                        let checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].length;
                                        checkR
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].splice(0, 0,
                                                {
                                                    'w:rPr': [
                                                        {'w:rFonts': '', attr: {'w:cs': fontFamily}},
                                                        {'w:rtl': ''}
                                                    ]
                                                }// 'w:rPr'
                                            );
                                            this.globalTable
                                        } else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'][0]['w:rPr'].push(
                                                {'w:rFonts': '', attr: {'w:cs': fontFamily}},
                                                {'w:rtl': ''}
                                            );
                                            this.globalTable
                                        }
                                    }
                                }

                            }// if  check font
                            //////////////////////////////////////////END FontFamily//////////////////////////////////////////////


                            ///////////////////////////////////////////////// FontColor /////////////////////////////////////
                            if (fontColor != undefined) { // if  fontColor
                                let checkP = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].length;
                                if (checkP == 1) {
                                    let checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].length;
                                    if (checkR == 1) {
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].splice(0, 0,
                                            {
                                                'w:rPr': [
                                                    {'w:color': '', attr: {'w:val': fontColor}}
                                                ]
                                            }// 'w:rPr'
                                        );
                                    } else if (checkR > 1) {
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'][0]['w:rPr'].push(
                                            {'w:color': '', attr: {'w:val': fontColor}}
                                        );
                                    }
                                } else if (checkP > 1) {
                                    let checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].length;
                                    if (checkR == 1) {
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].splice(0, 0,
                                            {
                                                'w:rPr': [
                                                    {'w:color': '', attr: {'w:val': fontColor}}
                                                ]
                                            }// 'w:rPr'
                                        );
                                    } else if (checkR > 1) {
                                        this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'][0]['w:rPr'].push(
                                            {'w:color': '', attr: {'w:val': fontColor}}
                                        );
                                    }
                                }
                            }// if check fontColor
                            /////////////////////////////////////////////////End FontColor /////////////////////////////////////



                            ///////////////////////////////////////////////// FontSize //////////////////////////////////////
                            if (fontSize != undefined) { // if check fontSize
                                let checkP = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].length;
                                fontSize = 2 * fontSize;
                                checkP;
                                if(checkNote){
                                    if (checkP == 2) {
                                        let checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].length;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].splice(0, 0,
                                                {
                                                    'w:rPr': [
                                                        {'w:szCs': '', attr: {'w:val': fontSize}}
                                                    ]
                                                }// 'w:rPr'
                                            );
                                            this.globalTable;
                                        } else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'][0]['w:rPr'].push(
                                                {'w:szCs': '', attr: {'w:val': fontSize}}
                                            );
                                            this.globalTable;
                                        }
                                    } else if (checkP > 2) {
                                        let checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].length;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].splice(0, 0,
                                                {
                                                    'w:rPr': [
                                                        {'w:szCs': '', attr: {'w:val': fontSize}}
                                                    ]
                                                }// 'w:rPr'
                                            );
                                            this.globalTable;
                                        } else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'][0]['w:rPr'].push(
                                                {'w:szCs': '', attr: {'w:val': fontSize}}
                                            );
                                            this.globalTable;
                                        }
                                    }
                                }else{ // checkNote
                                    if (checkP == 1) {
                                        let checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].length;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].splice(0, 0,
                                                {
                                                    'w:rPr': [
                                                        {'w:szCs': '', attr: {'w:val': fontSize}}
                                                    ]
                                                }// 'w:rPr'
                                            );
                                            this.globalTable;
                                        } else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'][0]['w:rPr'].push(
                                                {'w:szCs': '', attr: {'w:val': fontSize}}
                                            );
                                            this.globalTable
                                        }
                                    } else if (checkP > 1) {
                                        let checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].length;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].splice(0, 0,
                                                {
                                                    'w:rPr': [
                                                        {'w:szCs': '', attr: {'w:val': fontSize}}
                                                    ]
                                                }// 'w:rPr'
                                            );
                                            this.globalTable;
                                        } else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'][0]['w:rPr'].push(
                                                {'w:szCs': '', attr: {'w:val': fontSize}}
                                            );
                                            this.globalTable;
                                        }
                                    }
                                } // else checkNote
                            }//  if check fontSize
                            //////////////////////////////////////////////////END FontSize ////////////////////////////////////////



                            ///////////////////////////////////////////////// Check Background //////////////////////////////////////
                            if (backgroundCell != undefined) { // if check background cell table
                                this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][0]['w:tcPr'].push(
                                    {'w:shd': '', attr: {'w:val': 'clear', 'w:color': 'auto', 'w:fill': backgroundCell}}
                                );
                            }// if check background cell table
                            ///////////////////////////////////////////////// END Check Background //////////////////////////////////////




                            /////////////////////////////////////////////////  Bold //////////////////////////////////////
                            if (bold ) { // if for check bold
                                let checkP = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'].length;
                                if(checkNote){
                                    if (checkP == 2) {
                                        let checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].length;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].splice(0, 0,
                                                {
                                                    'w:rPr': [
                                                        {'w:bCs': ''}  // <w:bCs/>
                                                    ]
                                                }// 'w:rPr'
                                            );
                                            this.globalTable;
                                        } else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'][0]['w:rPr'].push(
                                                {'w:bCs': ''}  // <w:bCs/>
                                            );
                                            this.globalTable;
                                        }

                                    } else if (checkP > 2) {
                                        let checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].length;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].splice(0, 0,
                                                {
                                                    'w:rPr': [
                                                        {'w:bCs': ''}  // <w:bCs/>
                                                    ]
                                                }// 'w:rPr'
                                            );
                                            this.globalTable;
                                        } else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'][0]['w:rPr'].push(
                                                {'w:bCs': ''}  // <w:bCs/>
                                            );
                                            this.globalTable;

                                        }
                                    }
                                }else{
                                    if (checkP == 1) {
                                        let checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].length;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'].splice(0, 0,
                                                {
                                                    'w:rPr': [
                                                        {'w:bCs': ''}  // <w:bCs/>
                                                    ]
                                                }// 'w:rPr'
                                            );
                                        } else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][0]['w:r'][0]['w:rPr'].push(
                                                {'w:bCs': ''}  // <w:bCs/>
                                            );
                                        }
                                        this.globalTable;
                                    } else if (checkP > 1) {
                                        let checkR = this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].length;
                                        if (checkR == 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'].splice(0, 0,
                                                {
                                                    'w:rPr': [
                                                        {'w:bCs': ''}  // <w:bCs/>
                                                    ]
                                                }// 'w:rPr'
                                            );
                                            this.globalTable;
                                        } else if (checkR > 1) {
                                            this.globalTable['w:tbl'][i]['w:tr'][j]['w:tc'][1]['w:p'][1]['w:r'][0]['w:rPr'].push(
                                                {'w:bCs': ''}  // <w:bCs/>
                                            );
                                            this.globalTable;

                                        }
                                    }
                                }  //  else checkNote
                            }// if for check bold
                            ///////////////////////////////////////////////////////END Bold ///////////////////////////////////////////////
                        }// check newStyle
                    }// for j
                }// for i
                return  this.globalTable;

            } else {
                throw "Type of style is not object";
            }// else
        } else {
            return this.globalTable;
        }//  else

    }




    callingMethod(body: any, data: any, style?: any) {
        let objTr = this.createTr(body, data);
        let objTc = this.createTc(objTr, data);
        let objP = this.createPtable(objTc, data);
        let objNote = this.createNote(objP);
        let objMerge = this.createMerge(objNote, data);
        let objStyle = this.tableStyle();
        //return objMerge;
        return objStyle;
        // return objNote;
        // next(json2xml(objMerge,{ attributes_key:'attr' } ));
    }


}//  class