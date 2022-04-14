document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(dogs => renderAllDogs(dogs))
})

    // Add pups to dog bar  
function renderAllDogs(dogsArray) {
    // Select the dog-bar
    const dogBar = document.getElementById("dog-bar")
    // Add a span with the pup's name to the dog-bar
    dogsArray.forEach(dog => {
        const newSpan =document.createElement("span")
        newSpan.innerHTML = dog.name
        dogBar.append(newSpan)
        newSpan.addEventListener("click", function() {
            const dogInfo = document.getElementById("dog-info")
            dogInfo.replaceChildren()
            const dogImage = document.createElement("img")
            dogImage.src = dog.image
            dogInfo.append(dogImage)

            const dogName = document.createElement("h2")
            dogName.innerHTML = dog.name
            dogInfo.append(dogName)

            const dogButton = document.createElement("button")
            dogInfo.append(dogButton)
            if (dog.isGoodDog === true) {
                dogButton.innerText = "Good Dog!"
            } else dogButton.innerText = "Bad Dog!"

            dogButton.addEventListener("click", () => {
                fetch(`http://localhost:3000/pups/${dog.id}`, {
                    method: "PATCH", 
                    header: {"Content-Type": "application/json"}, 
                    body: JSON.stringify(dog.isGoodDog)   
            })
            .then(response => response.json)
            .then(dog => console.log(dog))
            })
        })
    })
}