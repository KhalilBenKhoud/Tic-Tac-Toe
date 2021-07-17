
var cases = document.getElementsByClassName("case")
var cart = document.getElementsByClassName("cart")[0]
var alert = document.getElementsByClassName("alert")[0]
var header = document.getElementsByTagName("header")[0]
var btnFriend = document.getElementsByClassName("friend")[0]
var btnComputer = document.getElementsByClassName("computer")[0]
var starting = document.getElementsByClassName("starting")[0]

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

document.addEventListener("DOMContentLoaded",startGame()) // start game when DOM is loaded

function startGame()
{
    
    for(let i=0; i< cases.length ; i++)
    {
        cases[i].style.cursor = "not-allowed"
    }
     btnFriend.addEventListener("click", (e) =>{
        
        for(let i=0; i< cases.length ; i++)
       { cases[i].style.cursor = "" }
        btnComputer.style.backgroundColor = ""
        btnComputer.style.textDecorationLine = ""
        starting.style.display = ""
        e.target.style.backgroundColor = "rgba(46, 138, 86,1)"
        e.target.style.textDecorationLine = "underline"
       
        empty()
        
      playFriend("X","O") 
        
        
    })
    btnComputer.addEventListener("click", (e) =>{
       
        btnFriend.style.backgroundColor = ""
        btnFriend.style.textDecorationLine = ""
        e.target.style.backgroundColor = "rgba(46, 138, 86,1)"
        e.target.style.textDecorationLine = "underline"
        starting.style.display = "flex"
        starting.children[2].style.fontWeight = ""
        starting.children[2].style.border = ""
        starting.children[2].style.borderLeft = ""
        starting.children[2].style.backgroundColor = ""
        starting.children[1].style.fontWeight = ""
        starting.children[1].style.border = ""
        starting.children[1].style.borderRight = ""
        starting.children[1].style.backgroundColor = ""
        empty()
        for(let i=0; i< cases.length ; i++)
        {
            cases[i].outerHTML = cases[i].outerHTML
            cases[i].style.cursor = "not-allowed"
        }
        
    })

    starting.children[1].addEventListener("click", (e) =>{
        for(let i=0; i< cases.length ; i++)
        { cases[i].style.cursor = "" }
        e.target.style.fontWeight = "1000"
        e.target.style.border = "1px solid rgb(150, 143, 143)"
        e.target.style.borderRight = "1px solid rgb(199, 20, 20)"
        e.target.style.backgroundColor = "rgba(128, 128, 128, 0.329)"
        starting.children[2].style.fontWeight = ""
        starting.children[2].style.border = ""
        starting.children[2].style.borderLeft = ""
        starting.children[2].style.backgroundColor = ""
        empty()
        humanVScomputer("X","O")
         
    })
    starting.children[2].addEventListener("click", (e) =>{
        for(let i=0; i< cases.length ; i++)
        { cases[i].style.cursor = "" }
        e.target.style.fontWeight = "1000"
        e.target.style.border = "1px solid rgb(150, 143, 143)"
        e.target.style.borderLeft = "1px solid rgb(199, 20, 20)"
        e.target.style.backgroundColor = "rgba(128, 128, 128, 0.329)"
        starting.children[1].style.fontWeight = ""
        starting.children[1].style.border = ""
        starting.children[1].style.borderRight = ""
        starting.children[1].style.backgroundColor = ""
        empty()
        computerVShuman("X","O")
    })

}

function restart(symbol,gameResult,typeOfGame) {
   
    alert.style.display = "flex"
    header.style.display = "none"
    cart.style.opacity = ".3"
    if(gameResult == "won !")
    {alert.getElementsByClassName("message")[0].innerText = symbol + "'s have " + gameResult }
    else {alert.getElementsByClassName("message")[0].innerText = gameResult}
    alert.getElementsByTagName("button")[0].addEventListener("click",() => {
      
        for(let i=0; i< cases.length ; i++)
        { erase(i)
        }
        cart.style.opacity = ""
        alert.style.display = "none"
        header.style.display = ""
        if(typeOfGame == 1) playFriend("X","O")
        if(typeOfGame == 2) humanVScomputer("X","O")
        if(typeOfGame == 3) computerVShuman("X","O")
    })
   
}


function playFriend(symbol,otherSymbol)
{   var clickCount = 0
    for(let i=0; i< cases.length ; i++)
        {
            cases[i].outerHTML = cases[i].outerHTML
        }
    
    for(let i=0; i< cases.length ; i++)
    {  // Hover
        cases[i].addEventListener("mouseover", (event) => {
           if(!event.target.classList.contains('click'))
           {   
               event.target.innerText = symbol
              
           }
       })
         cases[i].addEventListener("mouseout", (event) => {
        if(!event.target.classList.contains('click'))
        {   
            event.target.innerText = ""
        }
    })
       //Click
         cases[i].addEventListener("click",(event) => {
          event.target.classList.add('click')
          clickCount++ 
 if(clickCount > 4 && checkWin(symbol,undefined)) { restart(symbol,"won !",1) }
         
       else if(clickCount == 9 && isDraw(undefined)) {restart(symbol,"Draw !",1)   }
          else {
          var temp = symbol
          symbol = otherSymbol
          otherSymbol = temp }}, {once: true})
          }

        
     
}

function humanVScomputer(symbol,otherSymbol)
{   var clickCount = 0
    for(let i=0; i< cases.length ; i++)
    {
        cases[i].outerHTML = cases[i].outerHTML
    }

    for(let i=0; i< cases.length ; i++)
    {  // Hover
       cases[i].addEventListener("mouseover", (event) => {
           if(!event.target.classList.contains('click'))
           {   
               event.target.innerText = symbol
              
           }
       })
       cases[i].addEventListener("mouseout", (event) => {
        if(!event.target.classList.contains('click'))
        {   
            event.target.innerText = ""
        }
    })

    cases[i].addEventListener("click",(event) => {
        if(!event.target.classList.contains('click'))
       { event.target.classList.add('click')
         clickCount++
         if(clickCount > 4 && checkWin(symbol,undefined)) {  restart(symbol,"won !",2)  
         }
         else if(clickCount == 9 && isDraw(undefined)) {restart(symbol,"Draw !",2)  
        }
         else {
           var board = []
           for(let i=0; i< cases.length ; i++)
           {
               board.push(cases[i].innerText)
           }
            trace(otherSymbol,bestMove(board,otherSymbol,symbol))
            clickCount++
            if(clickCount > 4 && checkWin(otherSymbol,undefined)) {  restart(otherSymbol,"won !",2) }
            else if(clickCount == 9 && isDraw(undefined)) { restart(symbol,"Draw !",2) }
            }
         }
         
        })
        }
    

}

function computerVShuman(symbol,otherSymbol)
{   var clickCount = 0
    for(let i=0; i< cases.length ; i++)
    {
        cases[i].outerHTML = cases[i].outerHTML
    }
    
     var board = []
            for(let i=0; i< 9 ; i++)
            {
                board.push("")
            }
            var position = randomNumber()
            trace(symbol,position)
            clickCount++
           for(let i=0; i< cases.length ; i++)
     {  // Hover
        cases[i].addEventListener("mouseover", (event) => {
            if(!event.target.classList.contains('click'))
            {   
                event.target.innerText = otherSymbol
               
            }
        })
        cases[i].addEventListener("mouseout", (event) => {
         if(!event.target.classList.contains('click'))
         {   
             event.target.innerText = ""
         }
     })
 
     cases[i].addEventListener("click",(event) => {
         if(!event.target.classList.contains('click'))
        { event.target.classList.add('click')
           clickCount++
          if(clickCount > 4 && checkWin(otherSymbol,undefined)) {  restart(otherSymbol,"won !",3)  
          }
          else if(clickCount == 9 && isDraw(undefined)) {restart(symbol,"Draw !",3)  
         }
          else {
               var board = []
            for(let i=0; i< cases.length ; i++)
            {
                board.push(cases[i].innerText)
            }
             trace(symbol,bestMove(board,symbol,otherSymbol))
             clickCount++
             if(clickCount > 4 && checkWin(symbol,undefined)) {  restart(symbol,"won !",3) }
             else if(clickCount == 9 && isDraw(undefined)) { restart(symbol,"Draw !",3) }
             }
          }
          
         })
    
    
    }

}



function checkWin(symbol,board)
{   if(board != undefined)
    {
        return winningCombinations.some(combination =>{
            return combination.every(index => {
                return board[index] == symbol
            })
        })
    }
    else
   {    
       return winningCombinations.some(combination =>{
        return combination.every(index => {
            
            return cases[index].innerText == symbol
        })
    })
    }
    
      
}


function isDraw(board)
{   if(board != undefined)
    {
        for(let i=0; i< cases.length ; i++)
        {
            if(board[i] == "") return false
        } 
        return true 
    }
    else
   { for(let i=0; i< cases.length ; i++)
    {
        if(cases[i].innerText == "") return false
    }
    return true }
}





function minimax(board,symbol,otherSymbol,depth,isMax)
{ 
   
    if(checkWin(symbol,board)) return 10  - depth 
    if(checkWin(otherSymbol,board)) return -10 + depth 
    if(isDraw(board)) return 0

    if(isMax)
    {
        var best = -1000
        for(let i=0; i< board.length ; i++)
        {
            if(board[i] == "") {
                board[i] = symbol
                best = Math.max(best, minimax(board,symbol,otherSymbol,depth + 1, false))
                board[i] = ""
            }
        }
        return best
    }
    else
    {
        var best = 1000
        for(let i=0; i< cases.length ; i++)
        {
            if(board[i] == "") {
                board[i] = otherSymbol
                best = Math.min(best, minimax(board,symbol,otherSymbol,depth + 1, true))
                board[i] = ""
            }
        }
        return best
    }

}


function bestMove(board,symbol,otherSymbol)
{
   var bestVal = -1000
   var bestIndex = -1
   for(let i=0; i< board.length ; i++)
    {
     if(board[i] == "") {
      board[i] = symbol
      var moveVal = minimax(board,symbol,otherSymbol,0,false)
      board[i] = ""
      if(moveVal > bestVal)
      {
          bestIndex = i
          bestVal = moveVal
      }
    }
    }
    return bestIndex
}


function trace(symbol,index)     
{   if(cases[index])
    { cases[index].innerText = symbol
    cases[index].classList.add("click") }
}

function erase(index)
{    if(cases[index])
    { cases[index].innerText = ""
    cases[index].classList.remove("click") }
}

function empty()
{
    for(let i=0; i < cases.length ; i++)
    {
        erase(i)
        
    }
}

function randomNumber()
{
    var num = Math.floor(Math.random() * 9) 
    if(num != 1 && num != 3 && num != 5 && num != 7) return num
    else return randomNumber()

}





     
