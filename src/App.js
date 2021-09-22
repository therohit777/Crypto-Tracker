import './App.css';
import React, { useEffect,useState } from 'react';
import {TiArrowSortedUp, TiArrowSortedDown  } from "react-icons/ti";



function App() {

  const [coins, setcoins] = useState([])
  const [search, setsearch] = useState('')

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
    .then(response=>response.json()) 
    .then((data)=>{
      setcoins(data)
    })     
  }, [])


  

  const searchcoins= coins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )




  


  const style1={
    color:"lightgreen"
  }
  
  const style2={
    color:"red"
  }

  console.log(coins)

  return (
    <div className="App">
     
      <p className="mainhed">Crypto Tracker App</p>
     <div className="display">

       <div className="inobox">
       <input type="text" className="ino" placeholder="Enter Cryptoname"  onChange={(e)=>setsearch(e.target.value)}/>
       <button className="search">Search here</button>
       </div>
       
    

     <div className="boxot">
       <p className="cryp">Cypto Market</p>
     {
     searchcoins.map((x)=>{
       return(
       <>
       <br />
       <br />
       <div className="box">
        <div className="imager">
       <img src={x.image} alt="" width="200px" />
       </div><div className="content">
        <p>Market Rank: {x.market_cap_rank}</p>
        <p>Name: {x.name}</p>
        <p>Symbol: {x.symbol}</p>
        <p>Total volume: ${x.total_volume}</p>
        <p>Market cap: ${x.market_cap}</p>
        <p>Current Price: ${x.current_price}</p>
        {
          (x.market_cap_change_percentage_24h>0)?<p>Change: <span style={style1}>{x.market_cap_change_percentage_24h.toFixed(2)} <TiArrowSortedUp/> </span></p>:<p>change: <span style={style2}>{x.market_cap_change_percentage_24h.toFixed(2)}<TiArrowSortedDown/></span></p>
        }
        </div>
        </div>
       </>
       )
     })
     }
     </div>

     </div>




    </div>
  );
}

export default App;
