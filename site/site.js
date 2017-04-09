$("svgElement").ready(function () {
  'use strict';
  
  var svg = document.getElementById('svgElement');
  
  svgdraw(svg);
});

document.getElementById("site-footer").innerHTML =
  "<p>&copy;  " + new Date().getFullYear() + " Kammer Sites.</p>";

//document.getElementById("nav01").innerHTML =
//"<ul id='menu'>" +
//"<li><a href='index.html'>Home</a></li>" +
//"<li><a href='customers.html'>Data</a></li>" +
//"<li><a href='about.html'>About</a></li>" +
//"</ul>";
