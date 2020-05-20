// global variables

const input = document.querySelector('#input')
// const btn = document.querySelectorAll('.btn')
const clear = document.querySelector('#clear')
const calculate = document.querySelector('#calculate')
const display = document.querySelector('.display-container')
const del = document.querySelector('#delete')
let p = document.querySelector('#para');
let stringValueStore = '';

let operaterChoosen = ''
let num1 = 0;
let num2 = 0;
let num1_flag = true
let num2_flag = false
let dot_flag = false;

function Getadd(n1,n2){
    return n1+n2;
}
function Getsubtract(n1,n2){
    return n1-n2;
}
function Getmultiply(n1,n2){
    return n1*n2;
}
function Getdivide(n1,n2){
    if (n1 === 0 || n2 === 0){
        return 'Infinity'
    }else{
        return n1/n2;
    }
}


function operate(n1,n2,o){
    // handle decimal
    n1 = n1.indexOf('.') === -1 ? parseInt(n1):parseFloat(n1)
    n2 = n2.indexOf('.') === -1 ? parseInt(n2):parseFloat(n2)
    //console.log(n1,n2,'processed')
    if (o === '+'){
        return Getadd(n1,n2)
    }
    if (o === '-'){
        return Getsubtract(n1,n2)
    }
    if (o === '*'){
        return Getmultiply(n1,n2)
    }
    if (o === '/'){
        return Getdivide(n1,n2)
    }
}


// delete functon

input.addEventListener('input',(e)=>{
    main(e);
});

// clear.addEventListener('click',main);

// // put these in main function
// del.addEventListener('click',main);
const btn = document.querySelectorAll('button')
btn.forEach(val =>{
    val.addEventListener('click',(e) =>{
        main(e)
    })
})

let cur_num = '0';
let storeVal = '0';
input.value = '0';


// input value and string value are the same
function main(e){
    
    console.log(input.value) // prints values in display
    
    const opeArr = ['+','-','*','/']
    let CantHaveZeroNextToOpe = false;
    let userInput = ''
    let res = ''
    let delete_input = false;

    if(e.type = 'input'){
        userInput = e.data;
    }

    if(e.type = 'click'){
        userInput = e.target.innerHTML;
    }

    storeVal += userInput
    console.log(storeVal)
    
    if (delete_input){
        input.value = '';
        delete_input = false;
        console.log('a')
    }

    if (userInput === "clear"){
        input.value = '0'
        cur_num = '0'
        console.log('b')
    }

    if (userInput === "Del"){
        // when delete operator, update cur_num
        if (opeArr.includes(input.value.slice(-1))){
            cur_num = '';
            let i = input.value.length-2 // starts before operator
            while(!isNaN(input.value[i])){
                cur_num = input.value[i] + cur_num
                i--
            } 
            console.log('c')
            
        } 
        else{ // when delete non operator just cut the last char off
            cur_num = cur_num.slice(0,cur_num.length-1)
            console.log('d')
        }
        input.value = input.value.slice(0,input.value.length-1)
    }

    // if input is not a number
    else if(isNaN(userInput)){
        
        if (isNaN(input.value.slice(-1))){ // if last input is not number
            if (userInput !== '.' && userInput !== '='){ // if input is strictly operator
                input.value = input.value.slice(0,input.value.length-1) + userInput // deal with operator swap
                cur_num = '0'; // update cur_num 
                console.log('e')
            }
            
        }
        else if(userInput === '.'){ // if last input is number
            if (cur_num.indexOf('.') === -1){
                input.value += userInput // if cur_num dosenst have dot, accept it
                cur_num += userInput
                console.log('f')
            }
            console.log('g')
        }
        else{ // if userinput is '='
            
            res = processData(input.value).toString() // get answer
            let processedRes = parseFloat(res).toFixed(10)
            if (res.indexOf('.') !== -1 && res !== "Error" && res !== "0" && 1 < res.slice(res.indexOf('.')+1).length){
                // round
                let dotIdx = res.indexOf('.')
                processedRes = processedRes.toString()
                // if number after dot is different, round up
                if (processedRes[dotIdx+1] !== res[dotIdx+1]){
                    input.value = parseFloat(res).toFixed(1)
                }
                // no round 
                else{
                    input.value = parseFloat(res).toFixed(10);
                }
            
            // if no float and calculatable number    
            }else{
                input.value = res
            }
            //input.value = res.indexOf('.') === -1 ? res : parseFloat(res).toFixed(10);
            // reset all accumulated values 
            cur_num = '0';
            delete_input = true; // delete result
        }
        
        
    }
    // input is number
    else{
        
        // when input is 0, deals with duplicates 
        if(userInput === '0'){
            if (cur_num.length !== 1){ 
            input.value += userInput
            cur_num += userInput
            console.log('i')
            }
            else{ // if cur_num's length is 1 and last char is not 0, accept it
                if (cur_num.slice(-1) !== '0'){
                    input.value += userInput
                    cur_num += userInput
                } 
                console.log('j')
            }
        }
        // if userinput is not 0
        else if(cur_num.length === 1 ){
            input.value = input.value.slice(0,input.value.length-1) + userInput // if cur_num is only one length, swap 0 with userinput
            console.log('k')
        }
        else{
            input.value += userInput
            cur_num += userInput 
            console.log('l')
        }
        
       
    }
}       


function checkLastChar(s){
    const ar = ['+',"-",'*','/']
    return ar.includes(s.slice(-1))
}

function processData(Str){
    
    // deal with multiply and division
    let j = 0;
    let s = '';
    let n1 = ''
    while (j < Str.length){
        if (Str[j] === '*' || Str[j] === '/'){
            let temp_idx = s.length
            // handle mutiple digits going back
            // terminates if it reaches non-number
            // float number with multiply or division
            while (!isNaN(s[temp_idx-1]) || s[temp_idx-1] === '.'){
              n1 = s[temp_idx-1] + n1
              temp_idx--
              s = s.slice(0,temp_idx)
            }
            // handle mutiple digits
            // terminates if it reaches last character
            let o = Str[j]
            let temp = '';
            while ( (j < Str.length - 1 && !isNaN(Str[j+1])) || Str[j+1] === '.'){
                temp+=Str[j+1]
                j++
            }
            // handle 0/0
            if (o === '/' && (n1 === '0' && temp === '0')){
                return "Error"
            }// handle 5/0
            if (o === '/' && (n1 !== '0' && temp === '0')){
                return "Infinity"
            } // handle 0/5
            if (o === '/' && (n1 === '0' && temp !== '0')){
                return "0"
            }
            console.log(n1,temp,'hiya')
            let sum = operate(n1,temp,o)
            n1 = '';
            // s has to be string all the time otherwise cause an error in operate function
            s = s + sum.toString();
            console.log(s,'string')
        }else{
            s+=Str[j]
        }
        j++
    }
    

    let s1 = '';
    let s2 = '';
    let s1_flag = true;
    let ope = '';
    
    for(let i = 0; i<s.length; i++){
        let a = s[i]
        // if (){
        //     console.log('yay')
        // }
        if (isNaN(s[i]) && s[i] !== '.'){
            if (s1 && s2){
                console.log(s1,s2,'hiya')
                s1 = operate(s1,s2,ope).toString();
                s2 = '';   
               
            }
            ope = s[i]
            s1_flag = false;          
        }
        else{
            if (s1_flag){
                s1+=s[i]
            }
            else{
                s2+=s[i]
            }
        }        
    }
    // when string ends with number
    if (s1 && s2){
        s1 = operate(s1,s2,ope); 
        
    }
    return s1

}

