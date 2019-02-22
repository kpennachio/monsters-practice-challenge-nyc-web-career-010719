document.addEventListener("DOMContentLoaded", function(event) {


    const monsterContainer = document.querySelector("#monster-container")
    const monsterForm = document.querySelector("#create-monster")

    // console.log(monsterContainer)
    let monsters = []
    let page = 1


    function getAllMonsters() {
      fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        monsters = myJson
        addAllMonstersToContainer(myJson)
        // console.log(monsters)
      });
    }

    getAllMonsters()



    function addAllMonstersToContainer(monsters) {
      monsterContainer.innerHTML = ""
      monsters.forEach(monster => addMonsterToContainer(monster))
    }


    function addMonsterToContainer(monster) {
      monsterContainer.innerHTML += `<div>
      <h1>${monster.name}</h1>
      <p>${monster.age}</p>
      <p>${monster.description}</p>
      </div>`
    }


    function addForm() {
    monsterForm.innerHTML =
      ` <form id="form">
      Name:<br>
      <input type="text" id="name"><br>
      Age:<br>
      <input type="text" id="age" ><br><br>
      Description:<br>
      <input type="text" id="description" ><br><br>
      <input type="submit" value="Submit">
      </form> `
    }

    addForm()



    const form = document.querySelector("#form")

    // console.log(form)

    form.addEventListener("submit", event => {
      let name = form.querySelector("#name").value
      let age = form.querySelector("#age").value
      let description = form.querySelector("#description").value
      // console.log(name, age, description)
      //update db
      //upate dom
      //update local variables
      fetch("http://localhost:3000/monsters/", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name,
          age: age,
          description: description
        })
      })
      .then(function (response) {
        return response.json()
      })
      .then(function (newMonster) {
        monsters.push(newMonster)
        // addAllMonstersToContainer(monsters)
        getAllMonsters()
      })

      event.preventDefault()
      // console.log(event)
    })




    function pageUp() {
      page++
      getAllMonsters()
    }

    function pageDown() {
      page--
      getAllMonsters()
    }

    document.addEventListener("click", function (event) {
      if (event.target.id === "back") {
        page > 1 ? pageDown() : alert("no monsters here")
      }
      else if (event.target.id === "forward") {
        console.log(event.target)
        pageUp()
      }
    })









}); //end of dom content load
