<img src="https://i.ibb.co/BZWtCfQ/logo.png" alt="logo" border="0">

[Crop, Top, and Roll (Click Me!)](https://netflex80s.herokuapp.com/#/login)

## Background and Overview

This time warp is totally tubular!! Get fit with your favorite 80s workout crazes— or relive iconic moments, like the Miracle on Ice! Netflex is your go-to, neon-sheathed, Gen-X, fever-dream; sign up now!

<img src="https://i.ibb.co/qjMh2Yy/login.png" alt="login" border="0">


Site-wide thematic styling provides the comfort of a traditional Netflix clone, and the high-octane energy of America's most nostalgic decade. Throughout, one will find our elements are similar, but different-- starting with the background montage on the login page, all the way through button indicators, so a user can save a video!

Users who sign up for our service can browse and watch a variety of videos from different thematic categories, like Jazzercise or Hula Hoop. They can save favorites to a list, and then remove those movies, from that list, at the push of a button! Users can also search through our video database via the nav bar; we'll begin our search as soon as you start typing!

To keep our users interested, dynamic movie segments have been built into our pages with AWS. Longer, selectable, videos have been embedded to save on overall project costs. Start watching with one click!


## Technologies and Libraries Used

* Node JS
* Express
* MongoDB
* HTML
* CSS
* React JS
* Redux
* Mongoose
* BCrypt, JSONWebToken, Passport for user authentication
* Validator
* Bodyparser middleware

---

## Tricky Issues and Solutions

### Responsive Search

<img src="https://i.ibb.co/Ydc0ZBS/searchbar.png" alt="searchbar" border="0">

One of our goals was to create a Search function that is responsive and flexible-- one that would display results as users type and be a bit lenient of the user input. We utilized an onkeyup event to initiate search function; both the key pressed and the current input of the search bar affects the behavior of the method. Chaining a .then() allows us to push the results of the search into a show component via the route "/search". By pressing "return" or "enter", the user can clear the bar for the next search.

```javascript
  showResults(e) {
    e.preventDefault();
    let val = e.currentTarget.value;
    if (e.keyCode === 13){
      e.currentTarget.value = ""
      this.props.search(val).then(() => this.props.history.push("/search"));
    } else if ((val === "" || val.length <= 0) ) {
      return <div className="loading-background">
      <i className="fas fa-spinner"></i>
    </div>;
    } else {
      this.props.search(val).then(() => (this.props.history.push("/search")));
    }
  }
  ```
  
Below is the query used to retrieve information from our database. We added an index on the 'title' header of our database via the MongoDB Shell so users can query that information directly, with full or partial guesses. Utilizing regex in the query also makes the function unperturbed by capialization or special characters.

```javascript
const express = require('express');
const router = express.Router();
const movies = require('../../models/Movie');

router.post('/', function(req, res, next) {
  let q = req.body.body;
  movies.find({title : {$regex: q, $options: 'i'}}, function (err, data) {res.json(data)}).sort({ date: -1 })
    .then(movies)
  ;
});

module.exports = router;
```

### Integrating Custom Lists 
The my list feature allows a user to add any movie from the index or search page to their list to watch at a later time. With the little plus button in the bottom corner of each movie tile as seen below the user can add the movie to their list:

<a href="https://imgbb.com/"><img src="https://i.ibb.co/x2wPcym/AE8-FF105-AD45-412-C-A90-B-19-B283-CD67-BA.png" alt="AE8-FF105-AD45-412-C-A90-B-19-B283-CD67-BA" border="0"></a>

The plus icon only shows up on movies which are not already on the list. This worked well enough but the icon did not disappear when clicked. This was solved by setting the local state of the movie tile using react hooks to a boolean signifiying if the movie is in the list or not. See below for a code snippet showing the conditional logic for displaying or hiding the button. This code is located in the React functional component responsible for displaying each movie tile: 

```javascript
  let { movie, inList, addNewItem, user } = props;
  // inList is a boolean passed down as props to the component
  let [inListState, setInListState] = useState(inList);
  // addButton is set to a default of null
  let addButton = null;
  {
    // if the movie is not already in the list addbutton will display the icon
    if (!inListState) {
      addButton = (
        <i
          onClick={(e) => {
            // stop the event propagation so that the when clicked the movie is
            // added to the list but the movie show page is not also opened
            e.stopPropagation();
            setInListState(true); 
            // add item to list
            return addNewItem({
              user: user.id,
              movie: movie._id
            })
          }}
          className="fas fa-plus-circle"
        ></i>
      );
    }
  }
```

### Left-and-Right Scroll 
Each genre's movie previews were made to be side-scrollable lists, but we concluded that it was necessary to add buttons to shift the scroll position for users who are not able to scroll sideways as easily on their devices. 
To achieve this, we added an event listener to all the left and right buttons of each genre list which would invoke either the `scrollLeft` or `scrollRight` function. These functions are as follows:

```javascript 
  scrollLeft(elementId) {
    findDOMNode(this.refs[elementId]).scrollLeft -= 600;
  }

  scrollRight(elementId) {
    findDOMNode(this.refs[elementId]).scrollLeft += 600;
  }
```

Here, we used the `findDOMNode` function from the `react-dom` library. Each genre list element was given a ref as their section number (or `elementId` above). These two functions are responsible for finding the specific genre list and incrementing or decrementing its scroll position. 


