var arrOfWorkTime = ['09 AM','10 AM','11 AM','12 PM','01 PM','02 PM','03 PM','04 PM','05 PM'];
var today = moment();
var startingTime = moment(today).set({hour: 9}).format('hh a');
var timeNow = moment().startOf('hour').format('hh a');

for(let i=0;i<9;i++){
    let row = $('<div class="row">');

    //column 1
    let col1 = $('<div>');
    col1.addClass('col-sm-2 col-md-2');
    //append col1 to row
    $(row).append(col1);
    //create row inside col1
    col1Row = $('<div class="row">');
    //append col1row to col1
    col1.append(col1Row);
    //create two columns and add inside col1Row
    let newColumn1OfCol1= $('<div class="col-md-6"></div>');
    let newColumn2OfCol1= $('<div class="col-md-6 hour"></div>');
    newColumn2OfCol1.attr('data-time',arrOfWorkTime[i]);
    newColumn2OfCol1.text(arrOfWorkTime[i]);
    col1Row.append(newColumn1OfCol1);
    col1Row.append(newColumn2OfCol1);

    //column 2
    let col2 = $('<div>');
    col2.addClass('col-sm-8 col-md-8');
    //append col2 to row
    $(row).append(col2);
    //create row inside col2
    col2Row = $('<div class="row">');
    //append col2row to col2
    col2.append(col2Row);
    //create one column that displays text area
    let textAreaEl = $('<textarea class="col-md col-sm"></textarea>');
    col2Row.append(textAreaEl);
    if(moment(timeNow,'hh a').format('hh a') == moment(arrOfWorkTime[i],'hh a').format('hh a')){
        col2Row.addClass('present');
    }
    else if(moment(timeNow,'hh a').isAfter(moment(arrOfWorkTime[i],'hh a'))){
        console.log('After');
        col2Row.addClass('past');
    }
    else if(moment(timeNow,'hh a').isBefore(moment(arrOfWorkTime[i],'hh a'))){
        console.log('Before');
        col2Row.addClass('future');
    }


    //column 3
    let col3 = $('<div>');
    col3.addClass('col-sm-2 col-md-2');
    //append col3 to row
    $(row).append(col3);
    //create row inside col1
    col3Row = $('<div class="row">');
    //append col1row to col1
    col3.append(col3Row);
    //create two columns and add inside col3Row
    let newColumn1OfCol3= $('<div class="col-md-6 saveBtn"></div>');
    let newColumn2OfCol3= $('<div class="col-md-6"></div>');
    col3Row.append(newColumn1OfCol3);
    col3Row.append(newColumn2OfCol3);


    //append row to container
    $('.container').append(row);

}

function extractTimeFromString(str){
    var time;
    if(str[0] == 0){
        time = str[1];
    }
    else{
        time = str[0]+str[1];
    }
    return time;
}