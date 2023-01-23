import { useState } from "react"

const PokeCard = (props)=>{ 
    const dicio ={
        superStrong: `1/4 `,
        strong: `1/2 `,
        weak: `2 `,
        superWeak: `4 `,
        immune: `0X`
    }

    const typeStyles = {
        normal : `gray-400`,
        fighting : `orange-400`,
        flying : `slate-200`,
        poison : `purple-400`,
        ground : `amber-400`,
        rock : `orange-700`,
        bug : `lime-500`,
        ghost : `fuchsia-700`,
        steel : `neutral-500`,
        fire : `red-500`,
        water : `cyan-600`,
        plant : `green-700`,
        electric : `yellow-300`,
        psychic : `rose-800`,
        ice : `indigo-300`,
        dragon : `blue-500`,
        dark : `orange-900`,
        fairy : `rose-400`,
        "1/4": `bg-red-800`

    }

    const { pokemon } = props;
    console.log(pokemon)

    return(
        <div className={`flex flex-col items-center justify-center`}>
            <div className="w-[100%] text-center justify-center text-[20px] bold">
                <div className={`bg-${typeStyles[pokemon.types[0].type.name]}`}>{pokemon.types[0].type.name}</div>
                {
                    pokemon.types.length == 2 ? <div className={`bg-${typeStyles[pokemon.types[1].type.name]}`}>{pokemon.types[1].type.name}</div> : null
                }
            </div>
            {<img src={pokemon.sprites.other.home.front_default} alt="" className={`my-2 bg-[url(https://user-images.githubusercontent.com/9741252/81717987-83b84000-947b-11ea-9ac9-5ad1d59adf7a.png)] bg-contain max-w-[80%]`}/>}
            
            {
             Object.keys(pokemon.weakness).map(item=>{
                if(pokemon.weakness[item].length > 0) return(<div><span className={`text-[30px]`}>{dicio[item]}</span> {pokemon.weakness[item].map(itms =>{return <span className={`bg-${typeStyles[itms]} capitalize text-white w-fit px-[10px] mx-[5px] rounded-lg font-bold h-[26px]`}>{itms}</span>})}</div>)
             })
            }
        </div>
    )
}

export default PokeCard