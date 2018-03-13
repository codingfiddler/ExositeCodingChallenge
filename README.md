# Exosite Coding Challenge
This app was created in response to a coding challenge for a basic product marketplace.

## Running the App
Make sure that Node.js is installed (tested with v8.10.0) and that bower is installed globally 
through `npm install bower -g`.

1. run `npm install && bower install` to install all dependencies.
2. Run `npm start` to start the app. By default it will run on `http://localhost:3000` unless a different PORT environment
   variable is set.

## Design Choices
Here are the major design choices that influenced how I built this app:

* **Start with known templates**: I used the Express generator to quickly create a default backend and then added the Angular
  seed starter to quickly bootstrap a working app. This approach can make a huge difference in starting a project
  with good best-practices and also let me focus on the unique elements of the app and less on basic wiring.

* **Mobile-first design**: I used Bootstrap 4 to make sure the app was responsive on all devices. 
Using a framework like Bootstrap allowed a much faster implementation with already available
UI components.

* **User-experience**: I think it's really important to think of how a customer would interact with an app in addition to
 what technology is being used behind the scenes. Helpful features like saving a customer's order 
until they complete the purchase, or even just saving shipping details until a purchase is complete, helps
 avoid any frustration with data re-entry and make it easier for someone to buy one of the listed products. 

* **AngularJS**: The vast majority of my JS framework experience has been in Angular so it was a natural fit
for a project with a tight timeline. Some notable features include:
    * An Order service that handles data storage, both in-memory and in local storage to maintain
      application state even on page reloads. It also saves customer shipping details until they 
      finish a purchase so they don't have to re-enter that information unnecessarily. 
    * A Shipping service to calculate dynamic shipping rates and make it easy to update rules for future
      use.
    * A shipping form that requires all fields to be entered before allowing an order to be completed,
      as well as live zip code validation to immediately alert the customer if an invalid zip code is entered. 
    * A Dynamic list of products retrieved from the API server.
      
* **Express**: I love using Express as my backend API server due to it's flexibility and an excellent ecosystem of 
extra modules, in this case I've also used it to serve the front-end app for simplicity. I only needed one route
to handle serving my list of sample products, but made sure to add some basic logging through Winston. The API 
is also set up to easily serve multiple versions of itself if needed.

## Opportunities for Improvement
If I were to do this project again I would do a few things differently to improve the app and the overall experience:
* Add a set of production Gulp build tasks to generate a minified and concatenated version of the client for easy distribution.
* Improve styling of the product cards to better handle arbitrary lengths of feature content.
* Use something like webpack to manage front-end dependencies. Bower was a good fit to get started quickly on this project 
  but isn't sustainable for any future projects.
* Add additional transitions for app navigation events to improve app look and feel.
* Use Sass for styling to clean up styling code, CSS was quicker to implement but Sass would provide a better long-term
  option to efficiently manage styling.