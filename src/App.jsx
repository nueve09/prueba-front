import { useEffect, useState } from 'react';
import CalculatorKeyboard from './components/CalculatorKeyboard'
import NavigationBar from './components/NavigationBar'
import Remittances from './components/Remittances'
import remittances from "./data/data";
import {parseDate} from "./utils/parseDate"
// import { useSelector } from 'react-redux';

function App() {
  const [searchString, setSearchString] = useState("")
  const [filter, setFilter] = useState("id")
  const remittancesOrdered = remittances.sort((a, b) => Date.parse(parseDate(b.charged_at))-(Date.parse(parseDate(a.charged_at))))
  console.log(remittancesOrdered)
  const remittancesFiltered = remittances.filter((remittance) =>{
    if(filter == "id"){
      return remittance.id.includes(searchString)
    }
    else if (filter == "compañia"){
      return remittance.company.includes(searchString)
    }
    else if (filter == "cantidad"){
      return remittance.amount.includes(searchString)
    }
  }
  )  
  return (
    <main className='flex flex-col sm:flex-row'>
      <NavigationBar/>
      <CalculatorKeyboard setSearchString={setSearchString}/>
      <Remittances remittances={remittancesFiltered} setFilter={setFilter}/>
    </main>
  )
}

export default App
