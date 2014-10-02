var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = Generator;

function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // custom mocha generator
  this.testFramework = 'mocha-amd2';

  this.templateFramework = 'handlebars';

  this.hookFor(this.testFramework, { as: 'app' });

  this.on('end', function () {
    if (['app', 'backbone', 'marionette'].indexOf(this.generatorName) >= 0) {
      this.installDependencies({ skipInstall: this.options['skip-install'] });
    }
  });
}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |' + chalk.red('--(o)--') + '|   .--------------------------.' +
  '\n   `---------´  |    ' + chalk.yellow.bold('Welcome to Yeoman') + ',    |' +
  '\n    ' + chalk.yellow('(') + ' _' + chalk.yellow('´U`') + '_ ' + chalk.yellow(')') + '   |   ' + chalk.yellow.bold('ladies and gentlemen!') + '  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     ' + chalk.yellow('|  ~  |') +
  '\n   __' + chalk.yellow('\'.___.\'') + '__' +
  '\n ´   ' + chalk.red('`  |') + '° ' + chalk.red('´ Y') + ' `\n';

  console.log(welcome);
  console.log('Out of the box I include HTML5 Boilerplate, jQuery, Backbone.js, Marionette, Handlebars, Require and Modernizr.');

  this.bowerDirectory = 'bower_components';

  //dummy vars for legacy
  this.compassBootstrap = true;
  this.includeRequireJS = true;

  cb();
};

Generator.prototype.git = function git() {
    this.template('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
};

Generator.prototype.bower = function bower() {
    this.template('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
};

Generator.prototype.jshint = function jshint() {
    this.copy('jshintrc', '.jshintrc');
};

Generator.prototype.editorConfig = function editorConfig() {
    this.copy('editorconfig', '.editorconfig');
};

Generator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

Generator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

Generator.prototype.mainStylesheet = function mainStylesheet() {
  if (this.compassBootstrap) {
    this.write('app/styles/main.scss', '@import \'sass-bootstrap/lib/bootstrap\';\n\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 400px;\n}');
  } else {
    this.write('app/styles/main.css', 'body {\n    background: #fafafa;\n}\n\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 300px;\n}');
  }
};


Generator.prototype.bootstrapJs = function bootstrapJs() {
  var _rootDir = 'app/';

  if (this.includeRequireJS && this.compassBootstrap) {
    this.copy('bootstrap.js', _rootDir + 'scripts/vendor/bootstrap.js');
  }
};

Generator.prototype.setupEnv = function setupEnv() {
  var _rootDir = 'app/';

  // templates
  this.mkdir( _rootDir + 'templates' );
  this.copy( 'app/welcome.hbs', _rootDir + 'templates/welcome.hbs');

  //html
  this.template( 'app/index.html', _rootDir + 'index.html' );

  // js
  this.mkdir( _rootDir + 'scripts' );
  this.copy( 'app/main.js', _rootDir + 'scripts/main.js' );
  this.template( 'app/init.js', _rootDir + 'scripts/init.js' );
  this.copy( 'app/regionManager.js', _rootDir + 'scripts/regionManager.js' );
  this.copy( 'app/application.js', _rootDir + 'scripts/application.js' );
  this.copy( 'app/communicator.js', _rootDir + 'scripts/communicator.js' );

  this.mkdir('test');
  this.mkdir('app/styles');
  this.mkdir('app/images');
  this.template('app/404.html');
  this.template('app/favicon.ico');
  this.template('app/robots.txt');
  this.copy('app/htaccess', 'app/.htaccess');

};

