let pokemonInput = document.getElementById("pokemonName")
let pokemonMoveInput = document.getElementById("moveName")

//This Object represents the types that are supereffecive, not effecive, and normally effective against the chose move type
typeDefinitions = {
    water: {
        superEffective: ["ground", "rock", "fire"],
        notEffective: ["water", "grass", "dragon"],
        normalEffective: ["dark","normal","steel","psychic","fighting","flying","ghost","ice", "poison", "electric"]
    },
    grass: {
        superEffective: ["ground", "rock", "water"],
        notEffective: ["grass","fire","flying", "steel", "dragon","poison","bug" ],
         normalEffective: ["nornal", "psychic", "dark", "fighting","ghost","ice","electric"]
    },

    fire: {
        superEffective: ["grass", "bug", "ice ","steel"],
        notEffective: ["fire", "dragon","water", "rock" ],
        normalEffective: ["nornal", "psychic", "dark", "fighting","ghost","poison","electric", "flying", "ground"]

    },
    ice: {
        superEffective:["flying", "grass", "ground", "dragon"],
        notEffective: ["rock", "fire", "steel", "water"],
        normalEffective: ["normal", "ghost", "poison", "rock", "fighting", "dark", "psychic", "bug", "electric"]
    },
    psychic: {
        superEffective:["poison", "fighting"],
        notEffective: ["steel", "bug", "psychic"],
        normalEffective: ["fire", "water", "dragon", "rock", "ground", "ice","ghost", "normal", "flying", "electric"]
    },
    dark: {
        superEffective: ["psychic", "ghost"],
        notEffective: ["fighting", "dark"],
         normalEffective: ["fire", "water", "dragon", "rock", "ground", "ice","nomral", "flying", "grass", "steel", "electric"]
    },
    normal: {
        superEffective: [],
        notEffective: ["rock", "steel"],
        normalEffective: ["psychic", "fighting", "fire", "water", "grass", "dragon", "bug", "dark", "normal", "ice", "ground", "flying", "electric"]
    },
    dragon: {
        superEffective: ["dragon"], 
        notEffective: ["steel", "rock"],
        nomralEffective: ["water", "fire", "ice", "grass", "psychic", "dark","ghost", "bug", "ground", "nomral", "fighting", "flying", "electric"]
    },
    ground: {
        superEffective: ["fire", "rock", "steel", "poison", "electric"],
        notEffective: ["grass", "bug"],
        normalEffective: ["normal", "water","dragon", "psychic", "dark", "normal", "ghost","ice", "ground","fighting" ]
    },
    rock: {
        superEffective: ["fire", "ice", "flying", "bug"],
        notEffective: ["fighting", "ground", "steel"],
        normalEffective: ["water", "normal", "grass", "electric", "poison", "psychic", "dark", "rock", "dragon"]

    },
    fighting: {
        superEffective: ["dark", "normal", "steel", "rock", "ice"],
        notEffective: ["poison", "flying", "psychic", "bug"],
        normalEffective: ["fire", "water", "grass", "electric", "fighting", "ground", "dragon"]

    },
    poison: {
        superEffective: ["grass"],
        notEffective: ["poison", "ground", "rock", "ghost"],
        normalEffective: ["normal", "fire", "water", "electric", "ice", "fighting", "flying", "psychic", "bug", "dragon", "dark"]
    },
    bug: {
        superEffective: ["psychic", "grass", "dark"],
        notEffective: ["fire", "fighting", "poison", "flying", "ghost", "steel"],
        normalEffective: ["water", "normal", "electric", "ice", "ground", "bug", "dragon"]
    },
    ghost: {
        superEffective: ["ghost","psychic"],
        notEffective: ["dark"],
        normalEffective: ["fire", "water", "grass", "electric","ice", "bug", "dragon", "fighting", "poison", "ground", "flying", "rock","steel"]
    },
    steel: {
        superEffective: ["rock", "ice"],
        notEffective: ["fire", "water", "electric", "steel"],
        normalEffective: ["normal", "electric", "fighting", "poison", "ground", "flying", "psychic", "dark", "bug", "ghost", "dragon"]
    }
}

    

const selectedPokemon = {}
function getPokemonData(e) {
    e.preventDefault()
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput.value}/`,
    {
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/vnd.github.v3+json",
     }
    }
)
.then(response => response.json())
.then(pokemon => renderPokemon(pokemon))



}
pokemonSearch.addEventListener("submit", getPokemonData)


function renderPokemon(data) {
  console.log(data)
  selectedPokemon.types = data.types
  
  if (data.types.length === 1){
    let pokemonTypeStatement = `This pokemon is a ${data.types[0].type.name} type!`
    const pokemonTypeDiv = document.getElementById("pokemon-type")
    pokemonTypeDiv.append(pokemonTypeStatement)
  }
    else if (data.types.length ===2) {
        let pokemonTypeStatement = `This pokemon is ${data.types[0].type.name} and ${data.types[1].type.name} type!`
        const pokemonTypeDiv = document.getElementById("pokemon-type")
        pokemonTypeDiv.append(pokemonTypeStatement)
    }
  
   
   
    const pokemonSpriteURL = data.sprites.front_default
    const pokemonSprite = document.getElementById("pokemonSprite")
    
    pokemonSprite.src = pokemonSpriteURL
    
    
    
   pokemonInput.disabled = true
}




function getPokemonMoveData(e){
    e.preventDefault()
    
    fetch(`https://pokeapi.co/api/v2/move/${pokemonMoveInput.value}/`,
    {
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/vnd.github.v3+json",

    }
    }
)
.then(response => response.json())
.then(pokemon => renderPokemonMove(pokemon))
}



function renderPokemonMove (moveData) {
    console.log(moveData)
    console.log (moveData)
   
    const  moveType = moveData.type.name // This variable represents the type of the move
    const moveBaseDamage = moveData.power // This variable represents the power of the move
    
    const moveMessage = `This move is a ${moveType} move and it's base damage is ${moveBaseDamage}!` //represents the message that would be sent when a certain move was entered. 
    const moveDamageMessageDiv = document.getElementById("totalDamage")
    const moveInfo = document.getElementById("moveData")
    moveInfo.append(moveMessage)
    pokemonMoveInput.disabled = true
    const superEffectiveTyping = typeDefinitions[moveType].superEffective //This variable represents the array of types that the chosen movetype is supereffective against
    const notEffectiveTyping = typeDefinitions[moveType].notEffective //This variable represents the array of types that the chosen movetype is not effective against
    const normalEffectiveTyping = typeDefinitions[moveType].normalEffective //This variable represents the array of types that the chosen movetype is normal effective against
    const pokemonType0 = selectedPokemon.types[0].type.name //Represents the type or the 1st type of a chosen pokemon
    const numberOfTypes = selectedPokemon.types.length // Used to determine whether or not a pokemon has multiple types or not. 
  
    
   console.log(numberOfTypes)
 
        if (numberOfTypes === 1 && superEffectiveTyping.includes(pokemonType0)) {
           
                const newDamage = moveBaseDamage *2
                console.log(newDamage)
                moveDamageMessageDiv.append(`This move would do ${newDamage} damage!`)
                return newDamage
                
            }
        else if (numberOfTypes === 1 && notEffectiveTyping.includes(pokemonType0)){
                const newDamage = moveBaseDamage * .5
                console.log(newDamage)
                
                moveDamageMessageDiv.append(`This move would do ${newDamage} damage!`)
                return newDamage

            }
        else if (numberOfTypes === 1 && normalEffectiveTyping.includes(pokemonType0)){
                const newDamage = moveBaseDamage 
                console.log(newDamage)
                moveDamageMessageDiv.append(`This move would do ${newDamage} damage!`)
                return newDamage
            }
        
        
        else if (numberOfTypes ===2){
            const pokemonType1 = selectedPokemon.types[1].type.name
            console.log(pokemonType1)
            if (superEffectiveTyping.includes(pokemonType0) && superEffectiveTyping.includes(pokemonType1)){
                const newDuelTypeDamage = moveBaseDamage *4
                console.log(newDuelTypeDamage)
                moveDamageMessageDiv.append(`This move would do ${newDuelTypeDamage} damage!`)
                return newDuelTypeDamage
            }
            else if (notEffectiveTyping.includes(pokemonType0) && notEffectiveTyping.includes(pokemonType1)){
                const newDuelTypeDamage = moveBaseDamage * .25
                console.log(newDuelTypeDamage)
                moveDamageMessageDiv.append(`This move would do ${newDuelTypeDamage} damage!`)
                return newDuelTypeDamage
            }
            else if (normalEffectiveTyping.includes(pokemonType0) && normalEffectiveTyping.includes(pokemonType1)){
                const newDuelTypeDamage = moveBaseDamage
                console.log(newDuelTypeDamage)
                moveDamageMessageDiv.append(`This move would do ${newDuelTypeDamage} damage!`)
                return newDuelTypeDamage
            }
            else if (superEffectiveTyping.includes(pokemonType0) && notEffectiveTyping.includes(pokemonType1)){
                const newDuelTypeDamage = moveBaseDamage 
                console.log(newDuelTypeDamage)
                moveDamageMessageDiv.append(`This move would do ${newDuelTypeDamage} damage!`)
                return newDuelTypeDamage
            }
            else if (superEffectiveTyping.includes(pokemonType0) && normalEffectiveTyping.includes(pokemonType1)){
                const newDuelTypeDamage = moveBaseDamage * 2
                console.log(newDuelTypeDamage)
                moveDamageMessageDiv.append(`This move would do ${newDuelTypeDamage} damage!`)
                return newDuelTypeDamage
            }
            else if (notEffectiveTyping.includes(pokemonType0) && normalEffectiveTyping.includes(pokemonType1)){
                const newDuelTypeDamage = moveBaseDamage * .5
                console.log(newDuelTypeDamage)
                moveDamageMessageDiv.append(`This move would do ${newDuelTypeDamage} damage!`)
                return newDuelTypeDamage
            }
            else if (notEffectiveTyping.includes(pokemonType0) && superEffectiveTyping.includes(pokemonType1)){
                const newDuelTypeDamage = moveBaseDamage 
                console.log(newDuelTypeDamage)
                moveDamageMessageDiv.append(`This move would do ${newDuelTypeDamage} damage!`)
                return newDuelTypeDamage
            }
            else if (normalEffectiveTyping.includes(pokemonType0) && superEffectiveTyping.includes(pokemonType1)){
                const newDuelTypeDamage = moveBaseDamage * 2
                console.log(newDuelTypeDamage)
                moveDamageMessageDiv.append(`This move would do ${newDuelTypeDamage} damage!`)
                return newDuelTypeDamage
            }
            else if (normalEffectiveTyping.includes(pokemonType0) && notEffectiveTyping.includes(pokemonType1)){
                const newDuelTypeDamage = moveBaseDamage * .5 
                console.log(newDuelTypeDamage)
                moveDamageMessageDiv.append(`This move would do ${newDuelTypeDamage} damage!`)
                return newDuelTypeDamage
            }
        }
   
}
    
     

    
function clearFunction (e) {
    e.preventDefault()
    const emptyDiv = document.getElementById("pokemon-type")
    const emptyDiv1 = document.getElementById("moveData")
    const emptyDiv2 = document.getElementById("totalDamage")
    let pokemonInput = document.getElementById("pokemonName")
    let pokemonMoveInput = document.getElementById("moveName")
    const pokemonSprite = document.getElementById("pokemonSprite")
    
    emptyDiv.innerHTML = ""
    emptyDiv1.innerHTML = ""
    emptyDiv2.innerHTML = ""
    pokemonInput.value = ""
    pokemonMoveInput.value = ""
   pokemonSprite.src = ""
   pokemonMoveInput.disabled = false
   pokemonInput.disabled = false
   
    
}
pokemonMoveSearch.addEventListener("submit", getPokemonMoveData)
clearButton.addEventListener("click", clearFunction)


