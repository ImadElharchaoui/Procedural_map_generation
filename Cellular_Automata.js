



//denisty noise => how much wall(black ,green place cells) generated 50 =>50% 



const make_noise_grid = (density =50 , height ,width) =>{
    let noise_grid  = []
    
    

    for(let i =0; i<height;i++){
        noise_grid[i] = []
        for(let j=0; j<width; j++){
            let random = Math.random() *100
            random> density ? noise_grid[i][j] = 0 : noise_grid[i][j] = 255
        }
    }

    return noise_grid
}

const Cellular_Automata = (denisty, height, width , iter) =>{
    let grid = make_noise_grid(denisty,height,width)
    grid = grid.concat()
    const hL = height
    const wL = width
    for(let k = 0 ; k<=iter ; k++){
        
        console.log(`w: ${wL} , h: ${hL}`)
        let temp_grid = JSON.parse(JSON.stringify(grid))

        for(let i = 0 ; i<hL ; i++){
            for(let j = 0 ; j<wL; j++){
                let Nneighbor_black = 0;
                for(let y = i-1; y<=i+1 ;y++){
                    for(let x = j-1; x<=j+1; x++){
                        if(x<0 || y<0 || x>wL-1 || y>hL-1){
                            Nneighbor_black++
                        }else{
                            if( y != i || x!=j ){
                                if(temp_grid[y][x] == 255){
                                    Nneighbor_black++
                                }
                            }
                        }
                    }
                }
                Nneighbor_black>4 ? grid[i][j] = 255 : grid[i][j] = 0;
            }
        }
    }

    return grid
}


export default Cellular_Automata