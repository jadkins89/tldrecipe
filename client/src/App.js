import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loader from "react-loader-spinner";

import "./App.css";

const RecipeComponent = props => {
  const [recipe, setRecipe] = useState("");
  const url = props.match.params.url;
  const [error, setError] = useState(false);

  useEffect(() => {
    if (url) {
      (async () => {
        try {
          let response = await fetch(`api/recipe/${url}`);
          let data = await response.json();
          setRecipe(data);
        } catch (err) {
          setError(true);
        }
      })();
    }
  }, [url]);

  if (recipe) {
    return (
      <div className="App">
        <h1>{recipe.name}</h1>
        <img src={recipe.image} style={{ maxWidth: `50%` }} alt="Recipe" />
      </div>
    );
  } else if (error) {
    return (
      <div className="App">
        Something bad happened 😭. We didn't find anything at{" "}
        {decodeURIComponent(url)}.
      </div>
    );
  } else {
    return (
      <div
        style={{
          width: `100%`,
          height: `100%`,
          display: `flex`,
          justifyContent: `center`,
          alignItems: `center`
        }}
      >
        <Loader type="ThreeDots" height="100" width="100" />
      </div>
    );
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
