import './App.css';
import {YOUR_APP_ID, YOUR_APP_KEY} from "./key";
import Axios from "axios";
import { useState } from "react";
import RecipeTile from "./RecipeTile";

function App() {

  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [healthLabel, setHealthLabel] = useState('alcohol-free');

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabel}`

  async function getRecipes() {
    const result = await Axios.get(url);
    setRecipes(result.data.hits);
    console.log(result.data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  }

  return (
    <div className="app">
      <h1>Food Recipe Plaza 🍔</h1>
      <form className="app__searchForm" onSubmit={handleSubmit}>
        
        <input type="text" 
        className="app__input"
        placeholder="Enter ingredient" 
        value={query} onChange={(e) => setQuery(e.target.value)}/>

        <select className="app__healthLabels" onChange={(e) => setHealthLabel(e.target.value)}>
          <option value='alcohol-free'>Alcohol Free</option>
          <option value='vegan'>Vegan</option>
          <option value='vegetarian'>Vegetarian</option>
          <option value='low-sugar'>Low Sugar</option>
        </select>

        <input type="submit" className="app__submit" value="Search" />

      </form>
      
      {/* <div className="app__recipes_count">
        Showing {from} - {to}. Total found {count}
      </div> */}

      <div className="app__recipes">
        {recipes.map((recipe, index) => {
          return <RecipeTile recipe={recipe} key={index} />
        })}
      </div>
    </div>
  );
}

export default App;
