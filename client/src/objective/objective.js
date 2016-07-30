var Objective = function(params){
  this.clue = params.clue;
  this.hints =  params.hints;
  this.hintCount = 0;
  this.latLng = params.latLng;
  this.tolerance =  params.tolerance;
  this.found = [];
  this.foundMessage = params.foundMessage;
  this.points = 0;
  this.circle = params.circle;

  // var latLng = this.marker.getPosition();
  //    var center = this.circle.getCenter();
  //    var radius = this.circle.getRadius();
  //    if (this.circleBounds.contains(latLng) &&
  //        (google.maps.geometry.spherical.computeDistanceBetween(latLng, center) <= radius)) {
  //        this.lastMarkerPos = latLng;
  //        this._geocodePosition(latLng);
}

Objective.prototype = {
  // creates a range using the tolerance and checks if given coords fall within this.
  checkFound: function(latLng, team){
    var lat = this.latLng.lat
    var lng = this.latLng.lng
    if(this.tolerance < 10){var toleranceConvert = "0.000" + this.tolerance}else{ var toleranceConvert = Number("0.0" + this.tolerance/10)}
    var latRange = {upper: lat + toleranceConvert ,lower: lat - toleranceConvert}
    var lngRange = {upper: lng + toleranceConvert ,lower: lng - toleranceConvert}

    if(latLng.lat < latRange.upper && latLng.lat > latRange.lower && latLng.lng < lngRange.upper && latLng.lng >lngRange.lower ){
      console.log("Success!")
    }else{
      console.log("Fail!")
    }
    // should compare latLng of selection to coordinates latlng
    // will need to factor in tolerance to see if correct 
    // if found will need to addFound for the team and give points
  },


  // returns next hint in the array or a directional hint if all used.  charges penalty for use
  giveHint: function(latLng, team){
    team.addPenalty(2)
    this.hintCount +=1;

    if(this.hintCount > this.hints.length){
      this.directionHint(latLng);
    }else{
      return this.hints[this.hintCount-1];
    }
  },

  directionHint: function(latLng){

    // should give an arrow directional hint that then dissapears
  },

  // adds point with info to the given team
  addFound: function(team){
    this.found.push(team);
    var point = {clue: this.clue, latLng: this.latLng, value: this.givePoints(team)}
    team.addPoints(point)
  },

  // returns points base on order found for the addFound function
  givePoints: function(team){
    this.found.forEach(function(foundTeam, index){
      if(foundTeam.name === team.name){
        this.points = 5 - index
        if(this.points < 0){ this.points = 0}
      }
    }.bind(this))
        return this.points
  }
}

module.exports = Objective;