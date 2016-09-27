# Node Tutorial For Projects

* Init node in project
    * npm init / npm init -y
    * node_modules is created.
    * make app folder / public folder (for project organization not npm)
    * if using Angular in the app folder will be all the controllers and extra files..
    * if using .git --> in .gitignore --> node_module/ --> this will not upload de node_module folder
    * install any package of npm and use --save to *save them on the package.json as dependencies*
    * create a package.json
    * npm init -y (this create the package.json)
    * install webpack on npm (Webpack let you use a vendor link to all the scripts and dependencies)
    * create a webpack.config.js file and add *any code template I have made*, the routes for the project are with the index.js
    * if not exist the index.js make the router *by your own*


* Node
    * package.json -- is the file with all the dependencias and dev dependencies of package npm installed / plugins
    * webpack is a package of npm that runs the entire code and save them in two files vendor/webpack, this help a lot because you will not have a tons of <scripts>
    * webpack lets you to have all your dependencies runs. make the router is valid so any *error* is going out. 