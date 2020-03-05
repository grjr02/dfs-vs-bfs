import React from 'react';
import "./Board.css";
import {Spring} from "react-spring/renderprops";

import {getDfsAnimations } from "./dfsSearch";
import {getBfsAnimations } from "./bfsFunctions";
import {randomChar, makeWord } from "./mainFileFunctions";


//getBfsAnimations
export default class Board extends React.Component{

    constructor(prop){
        super();
        this.state = {
            dGrid: [],
            bGrid: [],
            stringV: ""
        }
    }

    componentDidMount(){
        this.createGrid();
    }

    //Function to create grid and add grid values
    createGrid(){

        const outer = [];

        for(let i = 0; i < 15; i++){
            const inner = [];
            for(let j = 0; j < 15; j++){

                inner.push(randomChar());
            }
            outer.push(inner);
        }

        this.setState({dGrid: outer});
        this.setState({bGrid: outer});

        let word = makeWord(outer);
        console.log("Word: " + word);
        this.setState({stringV: word});
    }

    
    searchD(){
        this.clearGrid();

        const set = new Set();
        const animations = getDfsAnimations(this.state.dGrid, this.state.stringV);
        

        for(let k = 0; k < animations.length +1; k++){

            if(k === animations.length){
                
                for(let i = animations.length-1; i > animations.length-this.state.stringV.length-1; i--){
                    const one = animations[i][0]; 
                    const two = animations[i][1]; 
                    const val = one*(this.state.dGrid).length+two;
                    
                    const div = document.getElementsByClassName("colD");
                    const divstyle = div[val].style;

                    setTimeout(()=>{

                        divstyle.background = "lightgreen";
                        divstyle.color = "yellow";
                    
                    }, k*50);
                }

                break;
            }

            const one = animations[k][0]; 
            const two = animations[k][1]; 
            const val = one*(this.state.dGrid).length+two;
            
            const div = document.getElementsByClassName("colD");
            const divstyle = div[val].style;
            const color = "#7296A4";

            if(set.has(val)){
                setTimeout(()=>{

                    divstyle.background = "#7296A4";

                
                }, k*50);

                set.delete(val);
                
            }else{

                setTimeout(()=>{

                    divstyle.background = color;
                    divstyle.color = "lightblue";
                    // divstyle.transform = "scale(1.5)";

                
                }, k*50);
                set.add(val);

            }
        
        }
        
    }
    newWordFunc(){
        this.clearGrid();
        let word = makeWord(this.state.dGrid);
        console.log("Word: " + word);
        this.setState({stringV: word});

    }

    clearGrid(){

        const divD = document.getElementsByClassName("colD");
        const divB = document.getElementsByClassName("colB");

       

        for(let i = 0; i < 225; i++){
            divD[i].style.background = "white";
            divB[i].style.background = "white";
            divD[i].style.color = "black";
            divB[i].style.color = "black";

        }


    }

    searchB(){
        this.clearGrid();
        const set = new Set();
        const animations = getBfsAnimations(this.state.bGrid, this.state.stringV);

        for(let k = 0; k < animations.length+1; k++){

            if(k === animations.length){
                
                for(let i = animations.length-1; i > animations.length-(this.state.stringV.length+1); i--){
                    const one = animations[i][0]; 
                    const two = animations[i][1]; 
                    const val = one*(this.state.dGrid).length+two;
                    
                    const div = document.getElementsByClassName("colB");
                    const divstyle = div[val].style;

                    setTimeout(()=>{

                        divstyle.background = "lightgreen";
                        divstyle.color = "yellow";
                    
                    }, k*50);
                }

                break;
            }

            const one = animations[k][0]; 
            const two = animations[k][1]; 
            const val = one*(this.state.bGrid.length)+two;

            
            const div = document.getElementsByClassName("colB");
            const divstyle = div[val].style;
            const color = "#7296A4";

            if(set.has(val)){
                setTimeout(()=>{

                    divstyle.background = "#7296A4";
                    //divstyle.color = "yellow";
                
                }, k*50);

                set.delete(val);
                
            }else{

                setTimeout(()=>{

                    divstyle.background = color;
                    divstyle.color = "lightblue";
                
                }, k*50);
                set.add(val);

            }
        
        }
        
    }

    render(){

        const { dGrid } = this.state;
        const { bGrid } = this.state;
        const { stringV } = this.state;

        return(
            <div className="backG">
                <div className="header_button">
                    <h2> {stringV} </h2>
                    <button className="newGrid" onClick={()=> {this.createGrid()}}>New Grid</button>
                </div>
                <br/>
                <button className ="changebutton" onClick={()=> {this.newWordFunc()}}>Press to Change Text</button>
                <br/>
                <div className="dfs">
                    {
                        dGrid.map((outer,oIdx)=>(
                        
                            <div className="row" key={oIdx}>
                                {
                                outer.map((inner,iIdx)=>(
                                    <div className="colD" key={iIdx}>
                                        {inner} 
                                    </div>
                                ))}
                            </div>

                        ))}

                </div>
                <div className="bfs" >
                {
                    bGrid.map((outer,oIdx)=>(
                    
                        <div className="row" key={oIdx}>
                            {
                            outer.map((inner,iIdx)=>(
                                <div className="colB" key={iIdx}>

                                <Spring from={{opacity:1}} to={{opacity:1}}>
                                    {props =>(
                                        <div style ={props}>
                                            {inner} 
                                        </div>
                                    )

                                    }
                                </Spring>
                                    


                                </div>
                            ))}
                        </div>

                    ))}

                </div>
                <br/>
                <button onClick={()=> {this.searchD();this.searchB(); }}> Search</button>

            </div>


        );
    }



} 