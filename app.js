$(document).ready(function () {

    //create array of duration of time you want to plan for
    var arrOfWorkTime = [];
    createWorkDurationArr(9,9); // starting time is 9am and plan for 9hours a day

    var today = moment();
    var todayFormatted = moment().format('LLLL');
    var startingTime = moment(today).set({ hour: 9 }).format('hh A');
    var timeNow = moment().startOf('hour').format('hh A');
    var planner = JSON.parse(localStorage.getItem('planner')) || [];

    $('#currentDay').text(todayFormatted);

    for (let i = 0; i < 9; i++) {
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
        let newColumn1OfCol1 = $('<div class="col-md-6"></div>');
        let newColumn2OfCol1 = $('<div class="col-md-6 hour"></div>');
        newColumn2OfCol1.attr('data-time', arrOfWorkTime[i]);
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
        var textAreaEl = $('<textarea class="col-md col-sm"></textarea>');
        textAreaEl.attr('class', 'task description');
        if (planner[i]) {
            textAreaEl.text(planner[i]);
        }
        col2Row.append(textAreaEl);
        if (moment(timeNow, 'hh a').format('hh a') == moment(arrOfWorkTime[i], 'hh a').format('hh a')) {
            col2Row.addClass('present');
        }
        else if (moment(timeNow, 'hh a').isAfter(moment(arrOfWorkTime[i], 'hh a'))) {
            col2Row.addClass('past');
        }
        else if (moment(timeNow, 'hh a').isBefore(moment(arrOfWorkTime[i], 'hh a'))) {
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
        let newColumn1OfCol3 = $('<div class="col-md-6 saveBtn"></div>');
        let newColumn2OfCol3 = $('<div class="col-md-6"></div>');
        col3Row.append(newColumn1OfCol3);
        col3Row.append(newColumn2OfCol3);
        let icon = $('<i class="fa fa-save"></i>');
        icon.addClass('saveBtn');
        icon.attr('data-row', i);
        newColumn1OfCol3.append(icon);

        //append row to container
        $('.container').append(row);

    }

    $('.saveBtn').on('click', function () {
        var rowClicked = $(this).attr('data-row');
        var task = $('.task').get(+rowClicked);
        planner[rowClicked] = $(task).val();
        localStorage.setItem('planner', JSON.stringify(planner));
    });

    
    function createWorkDurationArr(startTime,duration){
        var time = startTime;
        var formattedTime;
        
        for(let d=0;d<duration;d++){
            formattedTime = moment(today).set({ hour: time }).format('hh A');
            arrOfWorkTime.push(formattedTime);
            time++;
        }
    }

});
