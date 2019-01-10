# GraphnomiQL
----
# Motivation
GraphnomiQL is an Interactive Visualizer for GraphQL API

  - Visualize your GraphQL schema
  - Allow editing types and fields *
  - Generate updated schema in SDL 
  - Provide a GraphQL server file to test your schema using GraphiQL
  
**currently GraphnomiQL is not compatible with mutations*  

# Getting Started
- Fork and Clone this Repository
- Open project directory
```sh
cd GraphnomiQL
```
- Install dependencies
```sh
npm install
```
-Open Electron app to run our project
```sh
npm start
```

# How To Use

  - Select one of our demo GraphQL introspection results OR enter your own
   ![modal-screenshot](./src/assets/screenshots/screenshot1.png?raw=true "screenshot1")  
  - Let the magic happen! Put your GraphQL schema in graph!
   ![graph-screenshot](./src/assets/screenshots/screenshot3.png?raw=true "screenshot3")
  - Add a new type or delete an existing type
  - Add a new field to a type (and add a relationship) or delete an existing type
  - Finished updating your schema? Simply click on *Export Schema* or *Export Server* to save the new schema and test it using GraphiQL with provided server.
   ![exportFile-screenshot](./src/assets/screenshots/screenshot4.png?raw=true "screenshot4")


### Build With

GraphnomiQL uses a number of open source projects to build:

* [React] - A JavaScript library for building user interfaces
* [Redux] - A predictable state container for JavaScript apps
* [Electron] - Build cross platform desktop apps with JavaScript, HTML, and CSS
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [Webpack] - an open-source JavaScript module bundler
* [Vis.js] - A dynamic, browser based visualization library
* [React-Graph-Vis] - A react component to render nice graphs using vis.js
* [Material UI] - React components that implement Google's Material Design

And of course GraphnomiQL itself is open source with a [public repository][dill]
 on GitHub.

### Authors

- [Danni Ballena] - [@dlballena]
- [Donté Nall] - [@Code4Zelda]
- [Jason Wong] - [@jwasosnogn]
- [Victor Wang] - [@vwang4536]
  ##### Want to contribute? Great! We actively welcome pull requests.


### Credits
GraphnomiQL is inspired by [Graphql-Visualizer] and [GraphQL Voyager].

### License
----
This project is licensed under the [MIT License](https://opensource.org/licenses/mit-license.php).


   [dill]: <https://github.com/GraphnomiQl/GraphnomiQL>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [Material UI]: <https://material-ui.com/>
   [Redux]: <https://redux.js.org/>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [express]: <http://expressjs.com>
   [React]: <https://reactjs.org/>
   [Webpack]: <https://webpack.js.org/>
   [Electron]: <https://electronjs.org/>
   [Vis.js]: <http://visjs.org/>
   [React-Graph-Vis]: <https://github.com/crubier/react-graph-vis>
   [Danni Ballena]: <https://www.linkedin.com/in/danni-ballena>
   [Donté Nall]: <https://www.linkedin.com/in/donte-nall-b1801445/>
   [Jason Wong]: <https://www.linkedin.com/in/jwong1995/>
   [Victor Wang]: <https://www.linkedin.com/in/vwang4536>
   [@dlballena]: <https://github.com/dlballena>
   [@Code4Zelda]: <https://github.com/Code4Zelda>
   [@jwasosnogn]: <https://github.com/jwaosnogn>
   [@vwang4536]: <https://github.com/vwang4536>
   [Graphql-Visualizer]: <https://github.com/NathanRSmith/graphql-visualizer>
   [GraphQL Voyager]: <https://github.com/APIs-guru/graphql-voyager>
   


