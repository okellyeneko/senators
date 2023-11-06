getSenators() //Function call of getSenators

async function getSenators() { //defining a async function to fetch data from the senators.json file
  const url = "senators.json"; 
  const response = await fetch(url); 
  const alldata = await response.json(); 
  const senators = alldata.objects //Collecting all the data in variable senators
  displayParty(senators) //Calling displayParty and passing the data in params
  allSenators(senators) //Calling allSenators and passing the data in params
  filter(senators)
  clickSenator(senators)
}
  
function displayParty (data) { //creating function to display parties information (step 1)

  partycounter = {} //Empty object that will store number of members for all parties
  const partiesObj = { //Object that regroups different parties HTML elements
    Republican: {
      partyDiv: document.getElementById('reps'),
      leadersList: document.getElementById('repLeaders'),
      partyHeader: document.getElementById('partyHeaderRep')
    },
    Democrat: {
      partyDiv: document.getElementById('dems'),
      leadersList: document.getElementById('demLeaders'),
      partyHeader: document.getElementById('partyHeaderDem')
    },
    Independent: {
      partyDiv: document.getElementById('indep'),
      leadersList: document.getElementById('indLeaders'),
      partyHeader: document.getElementById('partyHeaderInd')
    },
  };

  for (let i = 0; i < data.length; i++) { //For loop that iterates through all the passed data (all senators)
    const senator = data[i];  //Delcaring some constants to simplify 
    const party = senator.party; 

    if (partycounter[party] === undefined ) { //Condition that checks if the current senators party is undefined in the partyounter object
      partycounter[party] = 0 //It it is, start a counter for that party at 0

    }
    partycounter[party] = partycounter[party] + 1 //For the current party being looped, add 1 to its counter

    if (senator.leadership_title != null) { //condition to check is the leadership title is not null.
      const leadersList = partiesObj[party].leadersList //if true find the current party's leaders html list
      var li = document.createElement("li")
      li.textContent = `${senator.leadership_title}: ${senator.person.firstname} ${senator.person.lastname} (${party})` //Passing the senator's info  inside new li
      leadersList.appendChild(li) //appending the new li and its content to the ul
    } 
    
  }

  for (party in partycounter) { //for each party in partycounter, insert the name of the party and its counter in corresponding html elements
    const container = partiesObj[party].partyDiv
    const count = partycounter[party]
    const header = partiesObj[party].partyHeader

    header.textContent = "Leaders in the party: "
    container.querySelector("h1").innerHTML = party;
    container.querySelector("p").innerHTML = `Number of members: ${count}`;

    // condition that checks if a party is empty. If so, it creates a new li that displays a message saying so
    if (partiesObj[party].leadersList.children.length === 0) {
      const leadersList = partiesObj[party].leadersList //if true find the current party's leaders html list
      var li = document.createElement("li")
      li.textContent = "No leaders for this party"
      leadersList.appendChild(li) //appending the new li and its content to the ul
    }

  }
}

function allSenators(data) {
  tablebody = document.getElementById('allsenators')
  attributes = document.getElementById('attributes')

  // Sort data by party
  data.sort((a, b) => {
    const partyOrder = { 'Republican': 1, 'Democrat': 2, 'Independent': 3 };
    return partyOrder[a.party] - partyOrder[b.party];
  });

  for (let i = 0; i < data.length; i++) {
    const senator = data[i]; 

    //Delcaring some constants to simplify and storing in an object:
    allAttributes = {
      firstname: senator.person.firstname.charAt(0).toUpperCase() + senator.person.firstname.slice(1), // Making it uppercase only for the first letter of the word
      lastname: senator.person.lastname.charAt(0).toUpperCase() + senator.person.lastname.slice(1),
      party: senator.party.charAt(0).toUpperCase() + senator.party.slice(1),
      gender: senator.person.gender.charAt(0).toUpperCase() + senator.person.gender.slice(1),
      rank: senator.senator_rank.charAt(0).toUpperCase() + senator.senator_rank.slice(1),
      state: senator.state.charAt(0).toUpperCase() + senator.state.slice(1)
    }


    
    
    var row = document.createElement('tr') //New row
        // Add a click event handler to the row
    row.addEventListener("click", function () {
      displaySenatorDetails(senator);
    });
      for (x in allAttributes){ //loop that iterates through all the attributes (x)
        //for all attributes, create a td and textnode (which stores the attribute value)
       var cell = document.createElement("td");
       var cellText = document.createTextNode(allAttributes[x]);
 
       //Append text to cell, cell to row, and row to tablebody
       cell.appendChild(cellText)
       row.appendChild(cell)
     }
     tablebody.appendChild(row); // Appends the row to the table
  }
}

function filter(data) {
  //Function that iterats through the table rows and displays rows according to the selected filters
  //Declare all variables: 

  const selectParty = document.getElementById("selectParty");
  const selectState = document.getElementById("selectState");
  const selectGender = document.getElementById("selectGender");
  const selectRank = document.getElementById("selectRank");

  var partyFilter = selectParty.value.toUpperCase();
  var stateFilter = selectState.value.toUpperCase();
  var genderFilter = selectGender.value.toUpperCase();
  var rankFilter = selectRank.value.toUpperCase();
  

  var table = document.getElementById("allsenatorsTable");
  var tr = table.getElementsByTagName("tr");
  const error = document.getElementById('error');
  allrows = tr.length - 2 // (-2 is because we only count the rows for the senators, not the headers)
  hiddenRows = 0
  //Create a loop that iterates through all the table rows necessary (all except other headers)

  for (var i = 2; i < tr.length; i++) {
    //Inside the for loop, declare variables for all the different cells corrsponding to the attributes
    td = tr[i].cells;


    var tdinParty = td[2].innerText.toUpperCase();
    var tdinGender = td[3].innerText.toUpperCase();
    var tdinRank = td[4].innerText.toUpperCase();
    var tdinState = td[5].innerText.toUpperCase();

    //Create conditions that check if the TD contains a substring or not according to each filter.
    //If the row doesn't meet all conditions, it changes the CSS to display none for that row

    if (
    tdinParty.indexOf(partyFilter) > -1 && 
    tdinState.indexOf(stateFilter) > -1 && 
    (!genderFilter || tdinGender.indexOf(genderFilter) === 0) && 
    tdinRank.indexOf(rankFilter) > -1) {
      tr[i].style.display = ""
    } else {
      tr[i].style.display = "none"
      hiddenRows += 1
    }
  }

  //Checks if all rows have been displayed to none. If so, it displays an error message
  if (allrows === hiddenRows) {
    error.textContent = 'No match for these filters. Chnage them to get a result';
    const detailsList = document.getElementById('listofDetails')
    detailsList.innerHTML = "";
  } else {
    error.textContent = ""
  }

  parties = []
  genders = []
  ranks = []
  states = []
  for (let i = 0; i < data.length; i++) {
    const senator = data[i];
    const party = senator.party;
    const gender = senator.person.gender;
    const rank = senator.senator_rank;
    const state = senator.state;
    
    if (!parties.includes(party)) {
      parties.push(party);
    }

    if (!genders.includes(gender)) {
        genders.push(gender);
    }

    if (!ranks.includes(rank)) {
        ranks.push(rank);
    }

    if (!states.includes(state)) {
        states.push(state);
    }
  }
  for (i in parties){
    var option = document.createElement("option");
    var optionText = document.createTextNode(parties[i]);
    option.appendChild(optionText)
    selectParty.appendChild(option)
  }
  for (i in genders){
    var option = document.createElement("option");
    var optionText = document.createTextNode(genders[i].charAt(0).toUpperCase() + genders[i].slice(1)); 
    option.appendChild(optionText)
    selectGender.appendChild(option)
  }
  for (i in ranks){
    var option = document.createElement("option");
    var optionText = document.createTextNode(ranks[i].charAt(0).toUpperCase() + ranks[i].slice(1));
    option.appendChild(optionText)
    selectRank.appendChild(option)
  }
  for (i in states){
    var option = document.createElement("option");
    var optionText = document.createTextNode(states[i]);
    option.appendChild(optionText)
    selectState.appendChild(option)
  }
}

function displaySenatorDetails(senator) {

  //function that displays all the details by appending the information to li elements that are then appended to the ul
  const detailsDiv = document.getElementById("detailsDiv");
  const detailsList = document.getElementById('listofDetails')
  const detailsName = document.getElementById("detailsName");
  //Every time the function is run (row is clicked) the list is emptied to make place for relevant information
  detailsList.innerHTML = "";
  
  //Getting all the data necessary in json 

  const party = senator.party; 
  const firstname =  senator.person.firstname.charAt(0).toUpperCase() + senator.person.firstname.slice(1)
  const lastname =  senator.person.lastname.charAt(0).toUpperCase() + senator.person.lastname.slice(1)

  detailsName.textContent = `${firstname} ${lastname}'s details:`

  const office = document.createElement("li");
  office.textContent = `Office: ${senator.extra.office}`;

  const birthday = document.createElement("li");
  birthday.textContent = `Date of birth: ${senator.person.birthday}`;

  const startdate = document.createElement("li");
  startdate.textContent = `Start date: ${senator.startdate}`;

  const twitter = document.createElement("li");
  const twitterIcon = document.createElement("i");
  twitterIcon.classList.add("fa-brands", "fa-twitter");
  twitter.appendChild(twitterIcon);

  const twitterUrl = document.createElement("a");
  twitterUrl.href = `https://twitter.com/${senator.person.twitterid} `;
  twitterUrl.textContent = ` Twitter: ${senator.person.twitterid} `
  twitterUrl.setAttribute('target', "_blank")
  twitter.appendChild(twitterUrl);
  
  const youtube = document.createElement("li");
  const youtubeIcon = document.createElement("i");
  youtubeIcon.classList.add("fa-brands", "fa-youtube");
  youtube.appendChild(youtubeIcon);

  const youtubeUrl = document.createElement("a");
  youtubeUrl.href = `https://www.youtube.com/@${senator.person.youtubeid} `;
  youtubeUrl.textContent = ` Youtube: ${senator.person.youtubeid} `
  youtubeUrl.setAttribute('target', "_blank")
  youtube.appendChild(youtubeUrl);


  const website = document.createElement("li");
  website.textContent = "Website: "
  const websiteUrl = document.createElement("a");
  websiteUrl.href = senator.website;
  websiteUrl.textContent = senator.website;
  websiteUrl.setAttribute('target', "_blank")
  website.appendChild(websiteUrl);

  detailsList.appendChild(office);
  detailsList.appendChild(birthday);
  detailsList.appendChild(startdate);
  detailsList.appendChild(twitter);
  detailsList.appendChild(youtube);
  detailsList.appendChild(website);

  detailsDiv.style.display = "block";

  if (party == "Republican") {
    detailsDiv.style.backgroundColor = "#bf0a31"
  }
  else {
    detailsDiv.style.backgroundColor = "#002868"
  }
}

function closeDetails() {
  const detailsDiv = document.getElementById("detailsDiv");
  detailsDiv.style.display = "none";
}