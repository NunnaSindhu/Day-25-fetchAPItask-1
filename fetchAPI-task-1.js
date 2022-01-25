//select the target element to display the data
const result = document.querySelector(".result");
const tableHeading = document.querySelector(".table-heading");

//select input element for search
let searchBox = document.querySelector(".search-box");
let searchButton = document.querySelector(".searchbtn");

//select the button for clear the search results
let clearButton = document.querySelector(".clearbtn");
tableHeading.style.display = "none";

//for fetching data create getData function
const url = "https://www.balldontlie.io/api/v1/players";

const getData = async () => {
  try {
    const playersData = await fetch(url);
    const response = await playersData.json();
    displayData(response.data);
    return response.data;
  } catch (error) {
    result.innerHTML = error;
  }
};

//logic for search functionality

searchButton.addEventListener("click", async () => {
  const playersData = await getData();
  let enteredText = searchBox.value;
  let filteredPlayers = [];
  if (enteredText != "")
    //write the logic to filter the players data
    filteredPlayers = playersData.filter((player) =>
      player.first_name
        .toLocaleLowerCase()
        .includes(enteredText.toLocaleLowerCase())
    );
  result.innerHTML = "";
  displayData(filteredPlayers);
});

//logic for clear search DATA
clearButton.addEventListener("click", () => {
  searchBox.value = "";
  displayData(getData());
});

// create displayData function for displaying data
function displayData(player) {
  result.innerHTML = "";
  tableHeading.style.display = "inline";
  player.forEach((player) => {
    result.innerHTML += `
        <div class="table-container table-responsive-sm">
        <table class="table table-striped">                    
    <tbody class="table-content">
      <tr>
        <td>${player.id}</td>
        <td>${player.first_name}</td>
        <td>${player.last_name}</td>
        <td>${player.position}</td>
        <td>${player.team.full_name}</td>
        <td>${player.team.city}</td>
        <td>${player.team.conference}</td>
        <td>${player.team.division}</td>        
      </tr>      
    </tbody>
  </table>
        </div>
        `;
  });
}
