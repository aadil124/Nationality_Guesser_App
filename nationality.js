const btnUser = document.querySelector("#getUser");
const showUserData = document.querySelector(".showUserData");
const restCountryUrl = `https://restcountries.com/v3.1/all`;

// Functionality for User data results
btnUser.addEventListener("click", async () => {
  const userName = document.querySelector("#userName").value;
  if (userName === "") {
    alert("Please Enter Any Name !!!");
  } else {
    const userUrl = `https://api.nationalize.io/?name=${userName}`;
    //   showUserData.innerHTML = `Loading data for ${inputValue} ...`;
    //   console.log(inputValue);
    try {
      let res = await fetch(userUrl);
      let userData = await res.json();
      // console.log(userData);
      displayUserData(userData);
    } catch (error) {
      showUserData.innerHTML = `Error in Loading the data...`;
    }
  }
});

const displayUserData = async (userData) => {
  showUserData.innerHTML = "";
  let countryData;
  let flagImg;
  let countryId;
  let countryName;
  let probability;
  try {
    let res = await fetch(restCountryUrl);
    countryData = await res.json();
    // console.log(countryData);
    // console.log(countryData[0].flag);
    // console.log(countryData[0].flags.png);
    // displayUserData(countryData);
  } catch (error) {
    showUserData.innerHTML = `Error in Loading the data...`;
  }

  userData["country"].map((val) => {
    countryId = val.country_id;
    probability = (val.probability * 100).toFixed(1);
    // console.log(countryId, probability);
    countryData.map((item) => {
      // console.log(item);
      const flagValue = item.cca2;
      if (flagValue === countryId) {
        flagImg = item.flags.png;
        console.log(flagImg);
        countryName = item.name.common;
      }
    });

    showUserData.innerHTML += `
  <div class="col-sm-12 col-md-6 col-lg-4 mb-3 mb-sm-3 ">
              <div class="card h-100 bg-white text-dark border-info">
              <div class = "card-header text-center">
                <img src="${flagImg}" class="card-img-top" width="280" height="280" alt="country image">
</img>  
              </div>
                  <div class="card-body text-center">
                      <h3 class="mt-2">${countryId}-${countryName}</h3>
                      <h3 class="card-text">Probability: ${probability} %</h3>
                  </div>
              </div>
  </div>
  `;
  });

  document.querySelector("#userName").value = "";
};
