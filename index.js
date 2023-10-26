getSenators() //Function call of getSenators

async function getSenators() { //defining a async function to fetch data from the senators.json file
  const url = "senators.json"; 
  const response = await fetch(url); 
  const alldata = await response.json(); 
  const senators = alldata.objects //Collecting all the data in variable senators
  displayParty(senators) //Calling displayParty and passing the data in params
  allSenators(senators)
}
  
function displayParty (data) { //creating function to display parties information (step 1)

  partycounter = {} //Empty object that will store number of members for all parties
  const partiesObj = { //Object that regroups different parties HTML elements
  Republican: {
    partyDiv: document.getElementById('reps'),
    leadersList: document.getElementById('repLeaders'),
  },
  Democrat: {
    partyDiv: document.getElementById('dems'),
    leadersList: document.getElementById('demLeaders'),
  },
  Independent: {
    partyDiv: document.getElementById('indep'),
    leadersList: document.getElementById('indLeaders'),
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
    container.querySelector("h1").innerHTML = party;
    container.querySelector("p").innerHTML = `Number of members: ${count}`;
  }
}

function allSenators(data) {
  for (let i = 0; i < data.length; i++) {
    const senator = data[i];  //Delcaring some constants to simplify 
    firstname = senator.person.firstname
    lastname = senator.person.lastname
    const party = senator.party; 
    const gender = senator.person.gender
    const rank = senator.senator_rank
    const state = senator.state
  }
}
