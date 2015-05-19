(function(){
  //declare all the variables and the column headers.
  var downtown, capitolHill, southLakeUnion, wedgewood, ballard, open, close, submitButton;
  open  = 7;
  close = 18;
  //Shop object constructor with prototype methods for determining a random
  //customer per hour count, and based on that the donuts needed per hour and
  //per day. The results of these methods are then used in the render and
  //tableInit function to write a table to the index.html page dynamically.
  function Shop(minCustHour, maxCustHour, donutPerCust){
    this.minCustPerHour  = minCustHour;
    this.maxCustPerHour  = maxCustHour;
    this.avgDonutPerCust = donutPerCust;
    this.byHour          = [];
  }

  Shop.prototype.custPerHour = function(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  Shop.prototype.hourlyDonuts = function() {
    return parseInt((this.avgDonutPerCust * this.custPerHour(this.minCustPerHour, this.maxCustPerHour)));
  }
  //Calculates the daily donuts needed by calling the hourly method for each hour
  //the store is open. It stores each of the hourly calls in an array for reference
  //in the render method. And then stores the total to the object.
  //Open and close times need to be in military time rounded to nearest hour.
  Shop.prototype.dailyDonuts = function(open, close) {
    var total     = 0;
    var hoursOpen = close - open;
    for (var i = hoursOpen; i > 0; i--) {
      this.byHour[i]  = this.hourlyDonuts();
      total          += this.byHour[i];
    }
    this.byHour[0] = total;
  }
  //Creates a row on the table for each object call. The first element is the
  //location name in a <th> element tag. The rest are iterated over and stored
  //in <td> elements. The row is then appended to the table.
  Shop.prototype.render = function(name) {
    var table    = document.getElementById('table-body');
    var row      = document.createElement('tr');
    var cell     = document.createElement('th');
    var cellText = document.createTextNode(name);
    cell.appendChild(cellText);
    row.appendChild(cell);
    for (var i = this.byHour.length - 1; i >= 0; i--) {
      cell       = document.createElement('td');
      cellText   = document.createTextNode(this.byHour[i]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  //Initializes the table given and open and closing time in military time.
  //Creates and array and converts to nonmilitary time.
  tableInit = function(open, close) {
    var tableValues = [];
    var tableHead   = document.getElementById('table-head');
    var row         = document.createElement('tr');
    for(var j = 0; j < close - open; j++) {
      var time = (j + open + 1);
      if (time <= 12){
        tableValues[j] = time + ':00am ';
      } else {
        tableValues[j] = (time - 12) + ':00pm';
      }
    }
    tableValues.unshift(' ');
    tableValues.push('Total');
    for (var i = 0; i < tableValues.length; i++) {
      var cell     = document.createElement('th');
      var cellText = document.createTextNode(tableValues[i]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tableHead.appendChild(row);
  }

  //Initialize the table and instantiates 5 shop locations. The daily method is
  //called to create the estimates and then the renders is called to print them
  //to the table on the index.html page.
  tableInit(open, close);

  downtown       = new Shop(8, 43, 4.50);
  downtown.custPerHour(downtown.minCustPerHour, downtown.maxCustPerHour);
  downtown.dailyDonuts(open, close);
  downtown.render("Downtown");

  capitolHill    = new Shop(4, 37, 2.00);
  capitolHill.custPerHour(capitolHill.minCustPerHour, capitolHill.maxCustPerHour);
  capitolHill.dailyDonuts(open, close);
  capitolHill.render("Capitol Hill");

  southLakeUnion = new Shop(9, 23, 6.33);
  southLakeUnion.custPerHour(southLakeUnion.minCustPerHour, southLakeUnion.maxCustPerHour);
  southLakeUnion.dailyDonuts(open, close);
  southLakeUnion.render("South Lake Union");

  wedgewood      = new Shop(2, 28, 1.25);
  wedgewood.custPerHour(wedgewood.minCustPerHour, wedgewood.maxCustPerHour);
  wedgewood.dailyDonuts(open, close);
  wedgewood.render("Wedgewood");

  ballard        = new Shop(8, 58, 3.75);
  ballard.custPerHour(ballard.minCustPerHour, ballard.maxCustPerHour);
  ballard.dailyDonuts(open, close);
  ballard.render("Ballard");


  var createRow = function() {
    var locationFull = document.getElementById('location').value;
    var minCustPerHour = parseInt(document.getElementById('min-cust-hour').value);
    var maxCustPerHour = parseInt(document.getElementById('max-cust-hour').value);
    var donutPerCust = parseInt(document.getElementById('donut-cust').value);
    var location = new Shop(minCustPerHour, maxCustPerHour, donutPerCust);
    location.custPerHour(location.minCustPerHour, location.maxCustPerHour);
    location.dailyDonuts(open, close);
    location.render(locationFull);
  }

  submitButton = document.getElementById('submit-new-store');
  submitButton.addEventListener('click', createRow, false);


})();

