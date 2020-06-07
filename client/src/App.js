import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

const RecipeComponent = props => {
  const [recipe, setRecipe] = useState("");
  useEffect(() => {
    let url = props.match.params.url;
    if (url) {
      (async () => {
        let response = await fetch(`api/recipe/${url}`);
        let data = await response.json();
        console.log(data);
        setRecipe(data);
      })();
    }
  }, [props.match.params.url]);

  if (recipe) {
    return (
      <div className="App">
        <h1>{recipe.name}</h1>
        <img src={recipe.image} style={{ maxWidth: `50%` }} alt="Recipe" />
      </div>
    );
  } else {
    return <div className="App">LOADING</div>;
  }
};

const AppComponent = props => {
  const [url, setUrl] = useState("");

  const handleChange = event => {
    setUrl(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.history.push(`/${encodeURIComponent(url)}`);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" value={url} onChange={handleChange} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:url" component={RecipeComponent} />
        <Route path="/" component={AppComponent} />
      </Switch>
    </Router>
  );
};

export default App;
