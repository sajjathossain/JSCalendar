import LeapYear from './leapYear.js';
import FirstDay from './firstDay.js'

function fetchData(givenId) { 

    $.ajax({
        url: `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=${givenId}`,
        headers: { 
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        method: 'GET',
        dataType: 'jsonp',
        data: '',
        success: function (data) {
            
            let dataNum = Object.keys(data.query.pages)[0];

            document.getElementById("modalLongTitle").innerHTML = `Things happened on : ${data.query.pages[dataNum].title}`;

            document.getElementById("modalBody").innerHTML = data.query.pages[dataNum].extract;
        
        }
    }); 

// the modal html
    const modalView = `
        <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            
            <div class="modal-dialog border border-danger rounded" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title font-weight-bold text-info" id="modalLongTitle"></h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            
                <div class="modal-body" id="modalBody">
                    <div class="alert alert-warning h3">Please Wait..</div>
                </div>
            
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    `;

    const modalArea = document.getElementById("modalArea");
    modalArea.innerHTML = modalView;
    
 }

 function getSpaces(index){
    
    const dN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daySpaces = [1, 2, 3, 4, 5, 6, 7];
    const date = new Date()
    let fd = new FirstDay(date.getFullYear(), index, 0);
    fd = fd.firstDay()
    console.log(dN.indexOf(fd))

    let spaces = ""
    for(let i=0; i<daySpaces[dN.indexOf(fd)]; i++){
        spaces += '<div class="date p-2 bg-info text-light text-center font-weight-bold"><div>'
    }

    return spaces;

 }

document.addEventListener("DOMContentLoaded", () => {
   const  months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
    ];

    const monthSize = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daySpaces = [1, 2, 3, 4, 5, 6, 7];
    const date = new Date();


    document.getElementById("year").innerHTML = `<img type="svg" src="./dist/images/date.svg" alt="" class="img"/>Year : ${date.getFullYear()}`;
    const checkLeap = new LeapYear(date.getFullYear());
    const isLeapYear = checkLeap.leap();
    
    if (isLeapYear) {
        monthSize[1] = 29;
    }



// to add all the days of a week
    let days = '';
    dayNames.forEach((dayName) => {
        days += `
        <div class="date p-2 bg-info text-light text-center font-weight-bold">${dayName}</div>
        `
    });


    const month = date.getMonth();

    let currentMonth = '';
``
    for (let i = 0; i < months.length; i++) {
        
        let output = '';
        let fd = new FirstDay(date.getFullYear(), i, 0);
        fd = fd.firstDay()
        fd = daySpaces[dayNames.indexOf(fd)]

        for (let index = 1; index < monthSize[i]+fd; index++) {
            
            if(index < fd){
                output += `<div> </div>`
            }
            else if (i === month && index === date.getDate()) {
            
                output += `
                    <div data-toggle="modal" data-target="#exampleModalLong" class="date p-2 bg-dark text-light text-center font-weight-bold" id="${months[i]}_${index}">${index-fd+1}</div>
                `;

            
            } else {

                output += `
                <div data-toggle="modal" data-target="#exampleModalLong" class="date p-2 bg-info text-light text-center font-weight-bold" id="${months[i]}_${index}">${index-fd+1}</div>
            `;

            }

        }



// Printing current month along with dates
        currentMonth += `
        <div class="d-flex flex-column thisMonth">            
            <div class="bg-dark monthName text-center h3 p-2 text-light rounded">${months[i]}</div>
            <div class="daysAndDate">
                ${days}
            </div>
            <div class="daysAndDate">
                ${output}
            </div>
        </div>
        `;
  
    }
   
    document.getElementById("outputField").innerHTML = currentMonth;

// to add event and fetch data
    const clickedBTN = document.querySelectorAll(".date");
    for (let i = 0; i < clickedBTN.length; i++) {
        
        clickedBTN[i].addEventListener("click", (e) => {
            const dateById = e.target.id;

            fetchData(dateById);
        });
    }


});