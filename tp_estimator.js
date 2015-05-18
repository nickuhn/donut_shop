(function(){
  var downtown, capitolHill, southLakeUnion, wedgewood, ballard;

  function Shop(minCustHour, maxCustHour, donutPerCust){
    this.minCustPerHour = minCustHour;
    this.maxCustPerHour = maxCustHour;
    this.avgDonutPerCust = donutPerCust;
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
    for (var i = 0; i < 12; i++) {
      hourly = this.hourlyDonuts();
      this.byHour[i].textContent = hourly;
      total += hourly;
      this.byHour[12].textContent = total;
    }
  }

  downtown = new Shop(8, 43, 4.50);
  downtown.byHour = document.getElementsByClassName('downtown');
  downtown.custPerHour(downtown.minCustPerHour, downtown.maxCustPerHour);
  downtown.dailyDonuts();

  capitolHill = new Shop(4, 37, 2.00);
  capitolHill.byHour = document.getElementsByClassName('capitol-hill');
  capitolHill.custPerHour(capitolHill.minCustPerHour, capitolHill.maxCustPerHour);
  capitolHill.dailyDonuts();

  southLakeUnion = new Shop(9, 23, 6.33);
  southLakeUnion.byHour = document.getElementsByClassName('south-lake-union');
  southLakeUnion.custPerHour(southLakeUnion.minCustPerHour, southLakeUnion.maxCustPerHour);
  southLakeUnion.dailyDonuts();

  wedgewood = new Shop(2, 28, 1.25);
  wedgewood.byHour = document.getElementsByClassName('wedgewood');
  wedgewood.custPerHour(wedgewood.minCustPerHour, wedgewood.maxCustPerHour);
  wedgewood.dailyDonuts();

  ballard = new Shop(8, 58, 3.75);
  ballard.byHour = document.getElementsByClassName('ballard');
  ballard.custPerHour(ballard.minCustPerHour, ballard.maxCustPerHour);
  ballard.dailyDonuts();

})();
