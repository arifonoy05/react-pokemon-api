import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

import About from "./components/About";
import Home from "./components/Home";

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=898")
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
                const results = data.results.map((pokemon, idx) => {
                    // console.log(pokemon);
                    return { ...pokemon, idx: idx + 1 };
                });
                setPokemon({ ...data, results });
            });
    });

    useMemo(() => {
        if (text.length === 0) {
            // setFilteredPokemon([]);
            // return;
        }
        setFilteredPokemon(() =>
            pokemon.results?.filter((pokemon) => pokemon.name.includes(text))
        );
    }, [pokemon.results, text]);

    return (
        <Router>
            <div className="mt-10 mb-4">
                <div className="flex flex-col items-center">
                    <Link to="/">
                        <header className="text-4xl text-yellow-700">
                            Pokemon Picker
                        </header>
                    </Link>
                </div>
            </div>

            <Switch>
                <Route exact path="/">
                    <div className="w-100 flex justify-center">
                        <input
                            type="text"
                            placeholder="Enter Pokemon here"
                            className="p-2 border-blue-500 border-2"
                            onChange={($event) => setText($event.target.value)}
                        />
                    </div>
                    {pokemon && <Home pokemon={filteredPokemon} />}
                </Route>
                <Route path="/about/:slug">
                    <About />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
