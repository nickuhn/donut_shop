(function(){
  var downtown, capitolHill, southLakeUnion, wedgewood, ballard;
  var tableValues = [' ', '7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', 'Total']

  function Shop(minCustHour, maxCustHour, donutPerCust){
    this.minCustPerHour = minCustHour;
    this.maxCustPerHour = maxCustHour;
    this.avgDonutPerCust = donutPerCust;
    this.byHour = [];
  }
  Shop.prototype.custPerHour = function(min,max){
    var total = 0
    total = Math.floor(Math.random() * (max - min + 1)) + min;
    return total;
  }
  Shop.prototype.hourlyDonuts = function() {
    var donutsNeeded = 0;
    donutsNeeded = parseInt((this.avgDonutPerCust * this.custPerHour(this.minCustPerHour, this.maxCustPerHour)));
    return donutsNeeded;
  }
  Shop.prototype.dailyDonuts = function() {
    var total = 0;
    var hourly = 0;
    for (var i = 12; i > 0; i--) {
      hourly = this.hourlyDonuts();
      this.byHour[i] = hourly;
      total += hourly;
    }
    this.byHour[0] = total;
  }
  Shop.prototype.render = function(name) {
    var table = document.getElementById('main-table');
    var row = table.insertRow(1);
    for (i = 0; i < this.byHour.length; i++) {
      row.insertCell(0).textContent = this.byHour[i];
    }
    row.insertCell(0).textContent = name;
  }

  tableInit = function() {
    var table = document.getElementById('main-table');
    var row = table.insertRow(0);
    for (i = tableValues.length; i >= 0; i--) {
      row.insertCell(0).textContent = tableValues[i];
    }
  }


  tableInit();

  downtown = new Shop(8, 43, 4.50);
  downtown.custPerHour(downtown.minCustPerHour, downtown.maxCustPerHour);
  downtown.dailyDonuts();
  downtown.render("Downtown");

  capitolHill = new Shop(4, 37, 2.00);
  capitolHill.custPerHour(capitolHill.minCustPerHour, capitolHill.maxCustPerHour);
  capitolHill.dailyDonuts();
  capitolHill.render("Capitol Hill");

  southLakeUnion = new Shop(9, 23, 6.33);
  southLakeUnion.custPerHour(southLakeUnion.minCustPerHour, southLakeUnion.maxCustPerHour);
  southLakeUnion.dailyDonuts();
  southLakeUnion.render("South Lake Union");

  wedgewood = new Shop(2, 28, 1.25);
  wedgewood.custPerHour(wedgewood.minCustPerHour, wedgewood.maxCustPerHour);
  wedgewood.dailyDonuts();
  wedgewood.render("Wedgewood");

  ballard = new Shop(8, 58, 3.75);
  ballard.custPerHour(ballard.minCustPerHour, ballard.maxCustPerHour);
  ballard.dailyDonuts();
  ballard.render("Ballard");
})();
