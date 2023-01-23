import { useRef, useState } from "react"
import axios from 'axios'
import PokeCard from '../PokeCard'

const PokeCounter = ()=>{
    const searchBar = useRef(null)
    let lastDate = null;
    const [currentPokemon, setPokemon] = useState(null)


    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    const search = (date)=>{
        setTimeout(()=>{
            if(lastDate != date) return;
            if(searchBar.current.value.length < 3) return;
            const pokeToSearch = searchBar.current.value.toLowerCase()

            if(localStorage.getItem(pokeToSearch) == null){
                axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeToSearch}`).then(res =>{
                    localStorage.setItem(pokeToSearch, JSON.stringify(res.data))
                    let pkmn = JSON.parse(localStorage.getItem(`${pokeToSearch}`))
                    pkmn.weakness = calcWeakness(pkmn.types[0].type.name, pkmn.types[1]?.type?.name)
                    setPokemon(pkmn)
                }).catch((err)=>{
                    console.log(`Error form database: ${err}`)
                    alert("Pokemon não encontrado")
                    setPokemon(null)
                    return; 
                })
            }else{
                let pkmn = JSON.parse(localStorage.getItem(`${pokeToSearch}`))
                pkmn.weakness = calcWeakness(pkmn.types[0].type.name, pkmn.types[1]?.type?.name)
                setPokemon(pkmn)
            }

        }, 1000)
    }

    var types = new Array(
        [1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//Normal
        [1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 2],//Lutador
        [1, 0.5, 1, 1, 0, 2, 0.5, 1, 1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1],//Voador
        [1, 0.5, 1, 0.5, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 2, 1, 1, 1, 0.5],//Veneno
        [1, 1, 1, 0.5, 1, 0.5, 1, 1, 1, 1, 2, 2, 0, 1, 1, 1, 1, 1],//Solo
        [0.5, 2, 0.5, 0.5, 2, 1, 1, 1, 2, 0.5, 2, 2, 1, 1, 1, 1, 1, 1],//Pedra
        [1, 0.5, 2, 1, 0.5, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1, 1, 1, 1],//Inseto
        [0, 0, 1, 0.5, 1, 1, 0.5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],//Fantasma
        [0.5, 2, 0.5, 0, 2, 0.5, 0,5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 1, 0.5],//Metal
        [1, 1, 1, 1, 2, 2, 0.5, 1, 0.5, 0.5, 2, 0.5, 1, 1, 0.5, 1, 1, 0.5],//Fogo
        [1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 0.5, 2, 2, 1, 0.5, 1, 1, 1],//Agua
        [1, 1, 2, 2, 0.5, 1, 2, 1, 1, 2, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1],//Planta
        [1, 1, 0.5, 1, 2, 1, 1, 1, 0.5, 1, 1, 1, 0.5, 1, 1, 1, 1, 1 ],//Eletrico
        [1, 0.5, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 0.5, 1, 1, 2, 1],//Psiquico
        [1, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 1, 1, 0.5, 1, 1, 1],//Gelo
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 0.5, 0.5, 1, 2, 2, 1, 2],//Dragao
        [1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 0, 1, 1, 0.5, 2],//Sombra
        [1, 0.5, 1, 2, 1, 1, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 0, 0.5, 1],//Fada
        );

    const typeWeakness = {
        normal: 0,
        fighting: 1,
        flying: 2,
        poison: 3,
        ground: 4,
        rock: 5,
        bug: 6,
        ghost: 7,
        steel: 8,
        fire: 9,
        water: 10,
        plant: 11,
        electric: 12,
        psychic: 13,
        ice: 14,
        dragon: 15,
        dark: 16,
        fairy: 17
    }

    const calcWeakness = (type01, type02)=>{
        const rtn = {
            superStrong: [],
            strong:[],
            weak: [],
            superWeak: [],
            immune: []
        }

        if(type02 == undefined){
            types[typeWeakness[type01]].map((item, index)=>{
                if(item == 0) rtn.immune.push(getKeyByValue(typeWeakness, index))
                if(item == 0.5) rtn.strong.push(getKeyByValue(typeWeakness, index))
                if(item == 2) rtn.weak.push(getKeyByValue(typeWeakness, index))
                if(item == 4) rtn.superWeak.push(getKeyByValue(typeWeakness, index))
            })
            return rtn;
        }

        let both = []
        types[typeWeakness[type01]].map((item,index)=>{
            both.push(types[typeWeakness[type01]][index] * types[typeWeakness[type02]][index])
        })

        console.log(`Both: ${both}`)

        both.map((item, index)=>{
            if(item == 0) rtn.immune.push(getKeyByValue(typeWeakness, index))
            if(item == 0.5) rtn.strong.push(getKeyByValue(typeWeakness, index))
            if(item == 0.25) rtn.superStrong.push(getKeyByValue(typeWeakness, index))
            if(item == 2) rtn.weak.push(getKeyByValue(typeWeakness, index))
            if(item == 4) rtn.superWeak.push(getKeyByValue(typeWeakness, index))
        })
        return rtn;
    }


    return(
        <div className="flex flex-col justify-center items-center">
            <div className="bg-[#ff2222] w-[100%] flex flex-col justify-center items-center">
            <input ref={searchBar} type="text" placeholder="Busque seu pokémon! " className="w-[80%] pt-1 bg-[#ffffff] rounded-lg border-solid border-neutral-50 my-3 text-center color" onInput={()=>{lastDate = Date.now(); search(lastDate)}}></input>
            </div>
            <div>
                {currentPokemon != null ?
                <PokeCard pokemon={currentPokemon}></PokeCard> : null
                }
            </div>
        </div>
    )
}

export default PokeCounter  