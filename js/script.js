/*
enhance the look with JQuery mobile. This done mostly in the index.html file.
Add two folders: css and js and add the jquery and jquery mobile files.
add some data-roll divs for header, content, and footer.
*/
window.onload = function(){
  //===================================
    //data
    var rawCsvData = "";
    var ajax = new XMLHttpRequest();
    var recordsArray = [];
  //===================================
    //event handlers
    //get csv and populate email list
    ajax.onload = function(){
      if( ajax.status === 200 || ajax.status === 0){
        rawCsvData = ajax.responseText;//capture raw csv and..
        //split it into records array and ...
        recordsArray = rawCsvData.split("\r");
        populateDropdownList(recordsArray)
      }
      else{
        alert("You've got ajax problems or remote file problems");
      }
    }
    
    //select a friend to email
    id('selNumber').onchange = function(){
      var i = id('selNumber').selectedIndex;
      var chosenPerson = id('selNumber').options[i].text;
      
      //here's where we "fix" the name
      //===============================
      var pieces = chosenPerson.split(',');
      chosenPerson = pieces[1] + " " + pieces[0];      
      //===============================
      var yes = confirm('Call '+ chosenPerson +'?');   
      if(yes){
          call(chosenPerson + " " + pieces[2]);
      }
      id('selNumber').selectedIndex = 0;
    };

    //===================================  
    //functions
    function id(identifier){
      return document.getElementById(identifier);
    }
    
    function call(name){
      
      //=======================================
      window.location.assign("tel:"+name); 
      //========================================
    }
    
    //populate drop down list
    function populateDropdownList(lines){        
        id('selNumber').innerHTML = "";
        var heading = document.createTextNode("Choose Friend Below");
        var opt0 = document.createElement('option');
        opt0.appendChild(heading);
        id('selNumber').appendChild(opt0);
        
        //eliminate the csv header and then sort the names
        for(var i = 1; i < lines.length ; i++){
            lines[i-1] = lines[i];
        }
        lines.pop(); //pull out the redundant line at the bottom
        lines.sort();
        
        //populate dropdown list
        for(var i = 0; i < lines.length; i++){
            var opt = document.createElement('option');
            opt.appendChild(document.createTextNode(lines[i]));
            id('selNumber').appendChild(opt);
        }
    }
    //====================================     
    //actions    
    ajax.open('GET','Numbers.csv', true);
    ajax.send(null);
}






















