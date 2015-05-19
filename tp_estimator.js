(function(){
  //declare all the variables and the column headers.
  var downtown, capitolHill, southLakeUnion, wedgewood, ballard;
  var tableValues = [' ', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', 'Total']

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
    var hourly    = 0;
    var hoursOpen = close - open;
    for (var i = hoursOpen; i > 0; i--) {
      hourly          = this.hourlyDonuts();
      this.byHour[i]  = hourly;
      total          += hourly;
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

  //Initializes the table. An array of column headers is passed in and then
  //iterated over to build a row of <th> elements
  tableInit = function() {
    var tableHead  = document.getElementById('table-head');
    var row        = document.createElement('tr');
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
  tableInit();

  downtown       = new Shop(8, 43, 4.50);
  downtown.custPerHour(downtown.minCustPerHour, downtown.maxCustPerHour);
  downtown.dailyDonuts(7, 18);
  downtown.render("Downtown");

  capitolHill    = new Shop(4, 37, 2.00);
  capitolHill.custPerHour(capitolHill.minCustPerHour, capitolHill.maxCustPerHour);
  capitolHill.dailyDonuts(7, 18);
  capitolHill.render("Capitol Hill");

  southLakeUnion = new Shop(9, 23, 6.33);
  southLakeUnion.custPerHour(southLakeUnion.minCustPerHour, southLakeUnion.maxCustPerHour);
  southLakeUnion.dailyDonuts(7, 18);
  southLakeUnion.render("South Lake Union");

  wedgewood      = new Shop(2, 28, 1.25);
  wedgewood.custPerHour(wedgewood.minCustPerHour, wedgewood.maxCustPerHour);
  wedgewood.dailyDonuts(7, 18);
  wedgewood.render("Wedgewood");

  ballard        = new Shop(8, 58, 3.75);
  ballard.custPerHour(ballard.minCustPerHour, ballard.maxCustPerHour);
  ballard.dailyDonuts(7, 18);
  ballard.render("Ballard");
})();
