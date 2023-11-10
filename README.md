# senators

How to run the program:

-To run the program, the user can open the folder on an IDE, and then open the index.html file using live-server.

-Another alternative is to run the program on a terminal:
1) Navigate to the directory the folder is located
2) Use the command: python -m http.server 8000
3) Open a web browser on http://localhost:8000/


Overview:
This program was developed by Eneko O'Kelly and Niall McKay, it is a web application designed to provide information on US Senators. It is implemented using HTML, CSS, and pure Javascript only.

Purpose:
This project was created for the Web-App-Development course at UCD.
The main purpose of this assignment was the use of JavaScript to read, manipulate, and present JSON data in a webpage. The data for the assignment is taken from www.govtrack.us/.

Features:

--> Leadership / Parties Section
The first section of the program focuses on leadership titles within each party. Users can also view the number of senators associated with each party.

--> The second section includes a table that displays all senators (initially grouped by party), it includes the following features:

  -Filters: Users can filter senators based on different criteria, allowing users to find senators based on different criteria.
  Filters are cumulative, allowing users to narrow down their search by applying multiple filters simultaneously. The senators can be filtered by party, gender, rank, and state.

  -Details: Every row (representing a senator) in the table is clickable. This triggers a function that displays more information about the clicked senator. The function will display a new element with the details (office, date of birth, start date,  Twitter/Youtube ID's, website), which includes a cross button to close it.


Functions:

The Javascript file includes 6 different functions (Including an async function to fetch the data) that are all necessary for all the features listed above. 

Technologies Used
HTML: For structuring the content.
CSS: For styling and layout.
Javascript: For functions and data manipulation.

Contributors:
Eneko O'Kelly
Niall McKay

