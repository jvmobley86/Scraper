function displayResults(scrapedData) {
    // First, empty the table
    $("tbody").empty();
  
    // Then, for each entry of that json...
    scrapedData.forEach(function(animal) {
      // Append each of the animal's properties to the table
      var tr = $("<tr>").append(
        $("<td>").text(scrapedData.title),
        $("<td>").text(scrapedData.link),
      );
  
      $("tbody").append(tr);
    });
  }
  
  // 1: On Load
  // ==========
  
  // First thing: ask the back end for json with all articles
  $.getJSON("/all", function(data) {
    // Call our function to generate a table body
    displayResults(data);
  });
  
  // 2: Button Interactions
  // ======================
  
  // When user clicks the scrape new articles  button, display table data
  $("#date-sort").on("click", function() {
  
    // Do an api call to the back end for json with all articles sorted by date
    $.getJSON("/date", function(data) {
      // Call our function to generate a table body
      displayResults(data);
    });
  });
  
  // When user clicks the clear button, empty table
  $("#clear").on("click", function displayResults(scrapedData) {
        
        $("tbody").empty();
      
  });