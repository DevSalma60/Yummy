/// <reference types="../@types/jquery" />

//------------------- sideBar ------------------------//

$(".open").on("click", function () {
  $(".open").css("display", "none");
  $(".close").css("display", "block");
  $("#sideBar").animate({ left: "0" }, 500);
  $("#menus").animate(
    { left: "0px", top: "0px", height: "180px" },
    450,
    function () {
      $("#menus li")
        .eq(0)
        .animate({ top: "0px", opacity: "1" }, 150, function () {
          $("#menus li")
            .eq(1)
            .animate({ top: "0px", opacity: "1" }, 100, function () {
              $("#menus li")
                .eq(2)
                .animate({ top: "0px", opacity: "1" }, 100, function () {
                  $("#menus li")
                    .eq(3)
                    .animate({ top: "0px", opacity: "1" }, 100, function () {
                      $("#menus li")
                        .eq(4)
                        .animate({ top: "0px", opacity: "1" }, 100);
                    });
                });
            });
        });
    }
  );
});

$(".close").on("click", function () {
  $(".open").css("display", "block");
  $(".close").css("display", "none");
  $("#sideBar").animate({ left: "-260px" }, 600);
  $("#menus").animate({ left: "-110px", top: "120px", height: "10px" }, 500);
  $("#menus li").animate({ top: "90px", opacity: "0" }, 200);
});
// ------------------------------------------------------------------------------------------------

//------------------- Main Section ------------------------//

let mainRow = document.getElementById("mainRow");
let dataMeal = [];
$(function () {
  $(".load .loader").fadeOut(200, function () {
    $(".load").fadeOut(500);
    $("body").css("overflow", "auto");
  });
  display();
});
async function display() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  let finalResponse = await response.json();
  dataMeal = finalResponse.meals;

  let col = "";
  for (let i = 0; i < dataMeal.length; i++) {
    col += `
          <div class="col-md-3 mt-5">
                      <div class="food">
                        <div class="card border-0">
                          <img src="${dataMeal[i].strMealThumb}" class="card-img w-100" alt="meal">
                        </div>
                        <div class="nameLayer">
                          <h2 class="ps-2">${dataMeal[i].strMeal}</h2>
                        </div>
                      </div>
          </div>
          `;
  }
  mainRow.innerHTML = col;
  $(".food").on("click", function (e) {
    instructionDisplay(e.target.innerText);
  });
}

//------------------- Search Section ------------------------//
$("#search").on("click", async function () {
  $(".open").css("display", "block");
  $(".close").css("display", "none");
  $("#sideBar").animate({ left: "-260px" }, 600);
  $("#menus").animate({ left: "-110px", top: "120px", height: "10px" }, 500);
  $("#menus li").animate({ top: "90px", opacity: "0" }, 200);

  mainRow.innerHTML = `
    <div class="row gy-3 inputRow mt-4 mx-5">
              <div class="col-md-6">
                <div class="searching">
                  <input type="text" id="searchName" placeholder="Search By Name" class="form-control searchinput">
                </div>
              </div>
              <div class="col-md-6">
                <div class="searching">
                  <input type="text" maxlength="1" id="searchFL" placeholder="Search By First Letter" class="form-control searchinput">
                </div>
              </div>
            </div>
            <div id="searchRow" class="row gy-4">
            </div>
    `;
  let SearchName = document.getElementById("searchName");
  let SearchFL = document.getElementById("searchFL");

  SearchName.addEventListener("input", async function () {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${SearchName.value}`
    );
    document.getElementById("searchRow").innerHTML = `
    <div class="loading">
      <span class="loader"></span>
    </div>
    `;
    $(response).ready(async function () {
      let finalResponse = await response.json();
      dataMeal = finalResponse.meals;
      searchDisplay();
      $(".food").on("click", function (e) {
        instructionDisplay(e.target.innerText);
      });
    });
  });
  SearchFL.addEventListener("input", async function () {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${SearchFL.value}`
    );
    document.getElementById("searchRow").innerHTML = `
    <div class="loading">
      <span class="loader"></span>
    </div>
    `;
    $(response).ready(async function () {
      console.log("hi");
      let finalResponse = await response.json();
      dataMeal = finalResponse.meals;
      searchDisplay();
      $(".food").on("click", function (e) {
        instructionDisplay(e.target.innerText);
      });
    });
  });
});

function searchDisplay() {
  let col = "";
  for (let i = 0; i < dataMeal.length; i++) {
    col += `
        <div class="col-md-3">
                    <div class="food">
                      <div class="card border-0">
                        <img src="${dataMeal[i].strMealThumb}" class="card-img w-100" alt="meal">
                      </div>
                      <div class="nameLayer">
                        <h2 class="ps-2">${dataMeal[i].strMeal}</h2>
                      </div>
                    </div>
        </div>
        `;
  }
  document.getElementById("searchRow").innerHTML = col;
}

async function instructionDisplay(currentMeal) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${currentMeal}`
  );
  let finalResponse = await response.json();
  dataMeal = finalResponse.meals;
  let col = "";
  for (let i = 0; i < dataMeal.length; i++) {
    col += `
        <div class="col-md-4 mt-5">
              <div class="instImg">
                <div class="card border-0">
                  <img src="${dataMeal[i].strMealThumb}" class="card-img w-100" alt="meal">
                </div>
                <h2>${dataMeal[i].strMeal}</h2>
              </div>
            </div>
            <div class="col-md-8 my-5">
              <div class="instContent">
                <h3>Instructions</h3>
                <p>${dataMeal[i].strInstructions}</p>
                <h3><span class="fw-bold">Area :</span> ${dataMeal[i].strArea}</h3>
                <h3><span class="fw-bold">Category :</span> ${dataMeal[i].strCategory}</h3>
                <h3>Recipes :</h3>
                <div class="d-flex flex-wrap">
                  <p class="alert alert-info ms-2 p-1">${dataMeal[i].strMeasure1} ${dataMeal[i].strIngredient1}</p>
                  <p class="alert alert-info ms-2 p-1">${dataMeal[i].strMeasure2} ${dataMeal[i].strIngredient2}</p>
                  <p class="alert alert-info ms-2 p-1">${dataMeal[i].strMeasure3} ${dataMeal[i].strIngredient3}</p>
                  <p class="alert alert-info ms-2 p-1">${dataMeal[i].strMeasure4} ${dataMeal[i].strIngredient4}</p>
                  <p class="alert alert-info ms-2 p-1">${dataMeal[i].strMeasure5} ${dataMeal[i].strIngredient5}</p>
                  <p class="alert alert-info ms-2 p-1">${dataMeal[i].strMeasure6} ${dataMeal[i].strIngredient6}</p>
                  <p class="alert alert-info ms-2 p-1">${dataMeal[i].strMeasure7} ${dataMeal[i].strIngredient7}</p>
                  <p class="alert alert-info ms-2 p-1">${dataMeal[i].strMeasure8} ${dataMeal[i].strIngredient8}</p>
                  <p class="alert alert-info ms-2 p-1">${dataMeal[i].strMeasure9} ${dataMeal[i].strIngredient9}</p>
                  <p class="alert  alert-info ms-2 p-1">${dataMeal[i].strMeasure10} ${dataMeal[i].strIngredient10}</p>
                  <p class="alert  alert-info ms-2 p-1">${dataMeal[i].strMeasure11} ${dataMeal[i].strIngredient11}</p>
                  <p class="alert  alert-info ms-2 p-1">${dataMeal[i].strMeasure12} ${dataMeal[i].strIngredient12}</p>
                  <p class="alert  alert-info ms-2 p-1">${dataMeal[i].strMeasure13} ${dataMeal[i].strIngredient13}</p>
                  <p class="alert  alert-info ms-2 p-1">${dataMeal[i].strMeasure14} ${dataMeal[i].strIngredient14}</p>
                  <p class="alert  alert-info ms-2 p-1">${dataMeal[i].strMeasure15} ${dataMeal[i].strIngredient15}</p>
                  <p class="alert  alert-info ms-2 p-1">${dataMeal[i].strMeasure16} ${dataMeal[i].strIngredient16}</p>
                  <p class="alert  alert-info ms-2 p-1">${dataMeal[i].strMeasure17} ${dataMeal[i].strIngredient17}</p>
                  <p class="alert  alert-info ms-2 p-1">${dataMeal[i].strMeasure18} ${dataMeal[i].strIngredient18}</p>
                  <p class="alert  alert-info ms-2 p-1">${dataMeal[i].strMeasure19} ${dataMeal[i].strIngredient19}</p>
                  <p class="alert  alert-info ms-2 p-1">${dataMeal[i].strMeasure20} ${dataMeal[i].strIngredient20}</p>
                </div>
                <h3>Tags :</h3>
                <div class="d-flex mt-3 mb-2">
                  <p id="tag" class="alert alert-danger ms-2 p-1">${dataMeal[i].strTags}</p>
                </div>
                <a href="${dataMeal[i].strSource}" target="_blank"><button class="btn btn-success">Source</button></a>
                <a href="${dataMeal[i].strYoutube}" target="_blank"><button class="btn btn-danger">Youtube</button></a>
              </div>
            </div>
        
            `;
  }

  mainRow.innerHTML = col;

  let IngAlret = Array.from(document.querySelectorAll(".alert-info"));

  for (let i = 0; i < IngAlret.length; i++) {
    if (
      IngAlret[i].innerHTML == " " ||
      IngAlret[i].innerHTML == "  " ||
      IngAlret[i].innerHTML == "   "
    ) {
      IngAlret[i].classList.add("d-none");
    }
  }

  if (document.getElementById("tag").innerText == "null") {
    $("#tag").remove();
  }

  $(".btn-success").on("click", function () {
    $(".btn-danger").removeClass("btnd");
    $(".btn-success").addClass("btns");
  });
  $(".btn-danger").on("click", function () {
    $(".btn-success").removeClass("btns");
    $(".btn-danger").addClass("btnd");
  });
}
// ------------------------------------------------------------------------------------------
//------------------- Categories Section ------------------------//
$("#categories").on("click", async function () {
  $(".open").css("display", "block");
  $(".close").css("display", "none");
  $("#sideBar").animate({ left: "-260px" }, 600);
  $("#menus").animate({ left: "-110px", top: "120px", height: "10px" }, 500);
  $("#menus li").animate({ top: "90px", opacity: "0" }, 200);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );

  mainRow.innerHTML = `
    <div class="loading">
      <span class="loader"></span>
    </div>
    `;
  $(response).ready(async function () {
    let finalResponse = await response.json();
    dataMeal = finalResponse.categories;
    catDisplay();
    $(".food").on("click", function (e) {
      let MealCat = $(e.target)
        .parents(".food")
        .children(".catLayer")
        .children("h3")
        .html();
      catMealDisplay(MealCat);
    });
  });
});

function catDisplay() {
  let col = "";
  for (let i = 0; i < dataMeal.length; i++) {
    col += `
      <div class="col-md-3 mt-5">
                  <div class="food">
                    <div class="card border-0">
                      <img src="${dataMeal[i].strCategoryThumb}" class="card-img w-100" alt="meal">
                    </div>
                    <div class="catLayer">
                      <h3 class="ps-2">${dataMeal[i].strCategory}</h3>
                      <p  class="p-1">${dataMeal[i].strCategoryDescription}</p>
                    </div>
                  </div>
      </div>
      `;
  }
  mainRow.innerHTML = col;
}

async function catMealDisplay(mealCat) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCat}`
  );
  let finalResponse = await response.json();
  dataMeal = finalResponse.meals;

  let col = "";
  for (let i = 0; i < dataMeal.length; i++) {
    col += `
        <div class="col-md-3 mt-5">
                    <div class="food">
                      <div class="card border-0">
                        <img src="${dataMeal[i].strMealThumb}" class="card-img w-100" alt="meal">
                      </div>
                      <div class="nameLayer">
                        <h2 class="ps-2">${dataMeal[i].strMeal}</h2>
                      </div>
                    </div>
        </div>
        `;
  }
  mainRow.innerHTML = col;
  $(".food").on("click", function (e) {
    instructionDisplay(e.target.innerText);
  });
}

// -------------------------------------------------------------------------------------------------
//------------------- Area Section ------------------------//

$("#area").on("click", async function () {
  $(".open").css("display", "block");
  $(".close").css("display", "none");
  $("#sideBar").animate({ left: "-260px" }, 600);
  $("#menus").animate({ left: "-110px", top: "120px", height: "10px" }, 500);
  $("#menus li").animate({ top: "90px", opacity: "0" }, 200);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );

  mainRow.innerHTML = `
    <div class="loading">
      <span class="loader"></span>
    </div>
    `;
  $(response).ready(async function () {
    let finalResponse = await response.json();
    dataMeal = finalResponse.meals;
    AreaDisplay();
    $(".food").on("click", function (e) {
      let MealCat = $(e.target).parent().children("h2").html();
      AreaMealDisplay(MealCat);
    });
  });
});

function AreaDisplay() {
  let col = "";
  for (let i = 0; i < dataMeal.length; i++) {
    col += `
      <div class="col-md-3 mt-5">
              <div class="food text-center instContent">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h2>${dataMeal[i].strArea}</h2>
              </div>
            </div>
      `;
  }
  mainRow.innerHTML = col;
}

async function AreaMealDisplay(mealCat) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealCat}`
  );
  let finalResponse = await response.json();
  dataMeal = finalResponse.meals;

  let col = "";
  for (let i = 0; i < dataMeal.length; i++) {
    col += `
        <div class="col-md-3 mt-5">
                    <div class="food">
                      <div class="card border-0">
                        <img src="${dataMeal[i].strMealThumb}" class="card-img w-100" alt="meal">
                      </div>
                      <div class="nameLayer">
                        <h2 class="ps-2">${dataMeal[i].strMeal}</h2>
                      </div>
                    </div>
        </div>
        `;
  }
  mainRow.innerHTML = col;
  $(".food").on("click", function (e) {
    instructionDisplay(e.target.innerText);
  });
}
// ----------------------------------------------------------------------------------------------------------
//------------------- ingredient Section ------------------------//
$("#ingredients").on("click", async function () {
  $(".open").css("display", "block");
  $(".close").css("display", "none");
  $("#sideBar").animate({ left: "-260px" }, 600);
  $("#menus").animate({ left: "-110px", top: "120px", height: "10px" }, 500);
  $("#menus li").animate({ top: "90px", opacity: "0" }, 200);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );

  mainRow.innerHTML = `
    <div class="loading">
      <span class="loader"></span>
    </div>
    `;
  $(response).ready(async function () {
    let finalResponse = await response.json();
    dataMeal = finalResponse.meals;
    intDisplay();
    $(".food").on("click", function (e) {
      let MealCat = $(e.target).parent().children("h3").html();
      console.log(MealCat)
      instMealDisplay(MealCat);
    });
  });
});
function intDisplay() {
  let col = "";
  for (let i = 0; i < dataMeal.length; i++) {
    col += `
      <div class="col-md-3 mt-5">
              <div class="food text-center instContent">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${dataMeal[i].strIngredient}</h3>
                <p>${dataMeal[i].strDescription}</p>
              </div>
            </div>
      `;
  }
  mainRow.innerHTML = col;
}

async function instMealDisplay(mealCat) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealCat}`
  );
  let finalResponse = await response.json();
  dataMeal = finalResponse.meals;

  let col = "";
  for (let i = 0; i < dataMeal.length; i++) {
    col += `
        <div class="col-md-3 mt-5">
                    <div class="food">
                      <div class="card border-0">
                        <img src="${dataMeal[i].strMealThumb}" class="card-img w-100" alt="meal">
                      </div>
                      <div class="nameLayer">
                        <h2 class="ps-2">${dataMeal[i].strMeal}</h2>
                      </div>
                    </div>
        </div>
        `;
  }
  mainRow.innerHTML = col;
  $(".food").on("click", function (e) {
    instructionDisplay(e.target.innerText);
  });
}

// ----------------------------------------------------------------------------------------------------------
//------------------- Contact Section ------------------------//

$("#contact").on("click", function () {
  $(".open").css("display", "block");
  $(".close").css("display", "none");
  $("#sideBar").animate({ left: "-260px" }, 600);
  $("#menus").animate({ left: "-110px", top: "120px", height: "10px" }, 500);
  $("#menus li").animate({ top: "90px", opacity: "0" }, 200);
  mainRow.innerHTML = `<div class="col-md-11 cont">
  <form id="form" class="text-center">
    <div class="row gy-3">
      <div class="col-md-6 ">
        <div class="nameinput">
          <input id="nameinput" type="text" placeholder="Enter Your Name" class="form-control">
          <div id="nameAlret" class="d-none mt-1 alert alert-danger">Special characters and numbers not allowed</div>
        </div>
      </div>
      <div class="col-md-6 ">
        <div class="emailinput">
          <input id="emailinput" type="email" placeholder="Enter Your Email" class="form-control">
          <div id="emailAlret" class="d-none mt-1 alert alert-danger">Email not valid *exemple@yyy.zzz</div>
        </div>
      </div>
      <div class="col-md-6 ">
        <div class="phoneinput">
          <input id="phoneinput" type="tel" placeholder="Enter Your Phone" class="form-control">
          <div id="phoneAlret" class="d-none mt-1 alert alert-danger">Enter valid Phone Number</div>
        </div>
      </div>
      <div class="col-md-6 ">
        <div class="ageinput">
          <input id="ageinput" type="number" placeholder="Enter Your Age" class="form-control">
          <div id="ageAlret" class="d-none mt-1 alert alert-danger">Enter valid age</div>
        </div>
      </div>
      <div class="col-md-6 ">
        <div class="passinput">
          <input id="passinput" type="password" placeholder="Enter Your Password" class="form-control">
          <div id="passAlret" class="d-none mt-1 alert alert-danger">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
        </div>
      </div>
      <div class="col-md-6 ">
        <div class="repassinput">
          <input id="repassinput" type="password" placeholder="Repassword" class="form-control">
          <div id="repassAlret" class="d-none mt-1 alert alert-danger">Enter valid repassword</div>
        </div>
      </div>
    </div>
    <button id="submitbtn" disabled="true"  class="btn mx-auto mt-3 btn-outline-danger">Submit</button>
  </form>
</div>`;
  $("#form").on("submit", function (e) {
    e.preventDefault();
  });

  let nameInput = document.getElementById("nameinput");
  let nameAlret = document.getElementById("nameAlret");
  function valName() {
    let nameval = nameInput.value;
    let regexName = /^[A-Za-z ]{3,}$/gm;
    if (regexName.test(nameval) == true) {
      nameAlret.classList.add("d-none");
      return true;
    } else {
      nameAlret.classList.remove("d-none");
      return false;
    }
  }

  nameInput.addEventListener("input", function () {
    valName();
  });

  let emailInput = document.getElementById("emailinput");
  let emailAlret = document.getElementById("emailAlret");
  function valEmail() {
    let emailval = emailInput.value;
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (regex.test(emailval) == true) {
      emailAlret.classList.add("d-none");
      return true;
    } else {
      emailAlret.classList.remove("d-none");
      return false;
    }
  }
  emailInput.addEventListener("input", function () {
    valEmail();
  });

  let phoneInput = document.getElementById("phoneinput");
  let phoneAlret = document.getElementById("phoneAlret");
  function valphone() {
    let phoneval = phoneInput.value;
    let regex = /^(012|010|011|015)[0-9]{8}$/g;
    if (regex.test(phoneval) == true) {
      phoneAlret.classList.add("d-none");
      return true;
    } else {
      phoneAlret.classList.remove("d-none");
      return false;
    }
  }
  phoneInput.addEventListener("input", function () {
    valphone();
  });

  let ageInput = document.getElementById("ageinput");
  let ageAlret = document.getElementById("ageAlret");
  function valage() {
    let ageval = ageInput.value;
    let regex = /^([1-9]{1,2}|[1-9][0-9]|100)$/g;
    if (regex.test(ageval) == true) {
      ageAlret.classList.add("d-none");
      return true;
    } else {
      ageAlret.classList.remove("d-none");
      return false;
    }
  }
  ageInput.addEventListener("input", function () {
    valage();
  });

  let passInput = document.getElementById("passinput");
  let passAlret = document.getElementById("passAlret");
  function valpass() {
    let passval = passInput.value;
    let regex = /^^(?=.*\d)(?=.*[a-zA-z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (regex.test(passval) == true) {
      passAlret.classList.add("d-none");
      return true;
    } else {
      passAlret.classList.remove("d-none");
      return false;
    }
  }
  passInput.addEventListener("input", function () {
    valpass();
  });

  let repassInput = document.getElementById("repassinput");
  let repassAlret = document.getElementById("repassAlret");

  function rePass() {
    if (repassInput.value === passInput.value) {
      repassAlret.classList.add("d-none");
      return true;
    } else {
      repassAlret.classList.remove("d-none");
      return false;
    }
  }

  repassInput.addEventListener("input", function () {
    rePass();
  });

  $("#mainRow").on("keyup", function () {
    if (
      valName() &&
      valEmail() &&
      valphone() &&
      valage() &&
      valpass() &&
      rePass()
    ) {
      document.getElementById("submitbtn").removeAttribute("disabled");
    } else {
      document.getElementById("submitbtn").setAttribute("disabled", "true");
    }
  });
});
