import "./App.css";
import "./components/NavBar.css";
import { useState, useEffect } from "react";
import All from "./components/All";
import NavBar from "./components/NavBar";
import Favorite from "./components/Favorite";
import Popup from "./components/Popup";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function App() {
  //array for pokemon
  const [pokemon, setPokemon] = useState([]);
  //shows grid or list
  const [grid, setGrid] = useState(false);
  //input for search
  const [searchTerm, setSearchTerm] = useState("");
  //type of pokemon
  const [types, setType] = useState(["Type"]);
  //searches for name and types
  const [searchParam] = useState(["name", "types"]);
  //array for favorited pokemon.
  const [isLiked, setIsLiked] = useState([]);
  //toggle between all and favorites from nav
  const [showFavorite, setShowFavorite] = useState(false);
  //toggle popip
  const [togglePopup, setTogglePopup] = useState(false);
  //store the info used by popup
  const [popupInfo, setPopupInfo] = useState();


  useEffect(() => {
    fetch("http://localhost:3000/pokemon")
      .then((response) => response.json())
      .then((result) => setPokemon(result));
  }, []);

  //used to change list view and grid view.
  const toggleView = () => {
    setGrid(!grid);
  };

  //Search through pokemon by name/type or use dropdown to search type.
  function search(pokemon) {
    return pokemon.filter((item) => {
      if (item.types.includes(types)) {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) > -1
          );
        });
      } else if (types == "Type") {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) > -1
          );
        });
      }
    });
  }

  //Fills heart if pokemon is liked and saves to favorite. Clicking again delete from favorties and set hear outline
  function LikeButton(id) {
    const ev = pokemon.find((x) => x.id == id.id);

    const deleteFavorite = () => {
      if(isLiked.includes(ev)){
        setIsLiked(isLiked.filter((item) => item.id !== ev.id));
        console.log(ev)
      }else{
        setIsLiked(isLiked.filter((item) => item.id !== id.id.id));
      }
           
    };

    const clickedIsLiked = () => {
      

 
      if (isLiked.includes(ev) || isLiked.includes(id.id)) {
        return;
      } else {
        return setIsLiked([...isLiked,  ev || id.id]);
      }
    };



    
    return isLiked.includes(ev) || isLiked.includes(id.id) ? (
      <AiFillHeart
        onClick={deleteFavorite}
        size="2em"
        color="#EB6383"
        className="icon"
        style={{ cursor: "pointer" }}
      />
    ) : (
      <AiOutlineHeart
        onClick={clickedIsLiked}
        size="2em"
        color="#EB6383"
        className="icon"
        style={{ cursor: "pointer" }}
      />
    );
  }

  //use to display all pokemon or just favorites. Could be moved to Navbar.js
  function ToggleAllFavotite() {
    const showFavoriteHandler = () => {
      setShowFavorite(!showFavorite);
    };
    return showFavorite ? (
      <div className="nav-button-toggle">
        <div
          className="all-btn"
          onClick={showFavoriteHandler}
          style={{
            pointerEvents: "auto",
            backgroundColor: "#FBFBFB",
            color: "seagreen",
            cursor: "pointer",
          }}
        >
          All
        </div>
        <div
          className="favorite-btn"
          style={{
            pointerEvents: "none",
            backgroundColor: "#8DB596",
            color: "#FBFBFB",
          }}
        >
          Favorite
        </div>
      </div>
    ) : (
      <div className="nav-button-toggle">
        <div
          className="all-btn"
          style={{
            pointerEvents: "none",
            backgroundColor: "#8DB596",
            color: "#FBFBFB",
          }}
        >
          All
        </div>
        <div
          className="favorite-btn"
          style={{
            pointerEvents: "auto",
            backgroundColor: "#FBFBFB",
            color: "seagreen",
            cursor: "pointer",
          }}
          onClick={showFavoriteHandler}
        >
          Favorite
        </div>
      </div>
    );
  }

  // //remove pokemon for favorite
  const deleteFavorite = (i) => {
    setIsLiked(isLiked.filter((item) => item.id !== i.id));
  };

  //popup for selected pokemon with evolutions.
  const popUp = (i) => {
    setPopupInfo(i);
    setTogglePopup(true);
  };
  // console.log(popupInfo);
  return (
    <div className="App">
      <NavBar
        types={types}
        setType={setType}
        toggleView={toggleView}
        grid={grid}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        ToggleAllFavotite={ToggleAllFavotite}
      />

      {togglePopup && (
        <Popup
          popupInfo={popupInfo}
          setTogglePopup={setTogglePopup}
          LikeButton={LikeButton}
        />
      )}

      {showFavorite ? (
        <All
          grid={grid}
          search={search}
          pokemon={pokemon}
          LikeButton={LikeButton}
          isLiked={isLiked}
          showFavorite={showFavorite}
          deleteFavorite={deleteFavorite}
          popUp={popUp}
        />
      ) : (
        <Favorite
          showFavorite={showFavorite}
          search={search}
          pokemon={pokemon}
          LikeButton={LikeButton}
          isLiked={isLiked}
          deleteFavorite={deleteFavorite}
          popUp={popUp}
          grid={grid}
        />
      )}
    </div>
  );
}

export default App;
