// global variables
const add = document.querySelector('add')
const sub = document.querySelector('subtract')
const multi = document.querySelector('multiply')
const dividion = document.querySelector('dividion')
const input = document.querySelector('#input')
const btn = document.querySelectorAll('.btn')
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
    console.log(n1,n2,'processed')
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
del.addEventListener('click',(e) => {
    if(stringValueStore){
        console.log(num1_flag)
        console.log(num2_flag)
        stringValueStore = stringValueStore.slice(0,stringValueStore.length-1)
        console.log(stringValueStore)
        input.value = input.value.slice(0,input.value.length-1)
        if (p.textContent){
            p.textContent = p.textContent.slice(0,input.value.length-1)
        }
        
    }
});

input.addEventListener('input',getTypeInput);

function getTypeInput(e){
    // how to deal with user input not button click
    const arr = ["+","-","*","/"]
    let userInp = e.target.value;
    
    // only accepts numer and operator
    if (!isNaN(userInp) || arr.includes(userInp)){
        console.log('asfsd')
        stringValueStore += userInp;
        input.value += userInp;
    }
}

clear.addEventListener('click',(e)=>{
    //console.log(e)
    //console.log(num)
    if(input){
        input.value = '';
        stringValueStore = ''
        p.textContent = '';
        num1 = 0;
        num2 = 0;
        num1_flag = true;
        num2_flag = false;
    }   
});


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

function displayInput(){
    let res = 0;
    // assign each buutton addEvenlister so all buttons activated
    btn.forEach(val => {
        val.addEventListener('click',(e) => {
            if (res){
                console.log(res)
                input.value = ''
                p.textContent = '';
                res = 0
            }
            let userInput = e.target.innerHTML;
            // let temp = userInput
            // check first input is number
            if(stringValueStore){
                if (userInput && userInput === '+' || userInput === '-' || userInput === '*' || userInput === '/'){
                    // if operator is pressed in the first place
                    // if ((!num1 && !num2) && (userInput.slice(-1) === '+' || userInput.slice(-1) === '-' || userInput.slice(-1) === '*' || userInput.slice(-1) === '/')){
                    //     temp = ''
                    // }
                    if(num1){
                        num1_flag = false;
                        num2_flag = true;
                        if(input){
                            //p.textContent = input.value + userInput;
                            input.value = input.value + userInput;
                        }
                    }
                    operaterChoosen = userInput 
                    //console.log(num2)
                    // switch to new operator if last input was operator
                    if (stringValueStore.slice(-1) === '+' || stringValueStore.slice(-1) === '-' || stringValueStore.slice(-1) === '*' || stringValueStore.slice(-1) === '/' ){
                        stringValueStore = stringValueStore.slice(0,stringValueStore.length-1)
                    }
                    
                }
            }
            // handle multiple edge cases
            // when string ends with number
            // when num2 is deleted but flag is still true
            if(userInput === "=" && !num1_flag && num2_flag && !isNaN(stringValueStore.slice(-1))){
                // if(input){
                //     input.value = ''
                // }
                //let a = 
                //console.log(a,'meow');
                res = processData(stringValueStore).toString()
                stringValueStore = ''
                // input.value = res
                // handle decimal
                // if rounded, cut off alll decimals 
                console.log(res,'meow',res.indexOf('.'),typeof res)
                console.log(parseFloat(res),'float')
                let processedRes = parseFloat(res).toFixed(10)
                
                // handle 0/5 and 5/0 and float
                if (res.indexOf('.') !== -1 && res !== "Error" && res !== "0"){
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
                num2 = 0;
                num1 = 0;
                num1_flag = true;
                num2_flag = false;
            }
            //e.preventDefault()
            //console.log(e.target.innerHTML);
            //const new_input = document.createElement('p');
            //new_input.textContent = e.target.innerHTML;

            // when firt input is not number
            
            // check if input is number
            if (!isNaN(userInput) || userInput === '.'){
                if (num1_flag){
                    // get string of number
                    // when calling operate function, convert it to int
                    // has to store value in string
                    num1 += userInput
                }
                if (num2_flag){
                    num2 += userInput
                }
                // hanlde when 0 is the first input
                if (!input.value && input.value.charAt(0) !== '0'){
                    console.log(stringValueStore,'firstnumbernotzero')
                    input.value += userInput // display number
                    stringValueStore += userInput
                }
                // handle if there is only one number and is 0
                else if (input.value && input.value.length === 1 &&input.value.charAt(0) === '0'){
                    console.log(stringValueStore,'swap')
                    input.value = userInput // display number
                    stringValueStore = userInput
                }
                else{
                    console.log(stringValueStore,'accept')
                    input.value += userInput // display number
                    stringValueStore += userInput
                }
                    
            }
            // check if first input is number or not
            else{
                if(stringValueStore && userInput !== "="){
                    stringValueStore += userInput
                }
            }
            
            console.log(stringValueStore)
            console.log(input.value)
            
        });
    });
    

}
displayInput()

// create display
// deals with 12 + 7 - 5 * 3