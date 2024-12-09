import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (searchName) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    // useEffect can't return anything and async returns promise. Wrap and call later
    const wrap = async () => {
      try {
        const resp = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${searchName}`)
        console.log(`Setting data for '${searchName}'`);
        console.log({resp});
        const country = { 
          found: true,
          data: {
            name: resp.data.name.common,
            capital: resp.data.capital[0],
            population: resp.data.population,
            flag: resp.data.flags.svg
          }
        }
        console.log({country});
        setCountry(country)
      } catch (e) {
        console.log(`'${searchName}' not found`);
        setCountry({
          found: false,
          data: {name: searchName}
        })
      }
    }
    wrap()
  }, [searchName])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }
  console.log({country});
  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App