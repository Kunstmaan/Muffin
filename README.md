## Muffin v0.1.0

Muffin is a Grunt scaffolding tool to build static email templates with modern workflow.

### Includes

- [Jekyll](http://jekyllrb.com/): Transform your plain text into static websites and blogs.
- [SFTP Deploy](https://github.com/thrashr888/grunt-sftp-deploy): Grunt task for image deployment over sftp
- [Premailer](http://premailer.dialect.ca/): Grunt wrapper task for Premailer
- [Litmus](https://litmus.com/): Grunt task for email previews, analytics and spam filter testing

### Requirements

- [Bower](http://bower.io/) (`npm install -g bower`)
- [Grunt](http://gruntjs.com/) (`npm install -g grunt-cli`)
- [Jekyll](http://jekyllrb.com/) (`gem install jekyll`)
- [Premailer](http://premailer.dialect.ca/) (`gem install premailer` and, most of the time, `gem install hpricot`)


### Getting Started

```
bower install
npm install
```
```
set-up
  update the .ftppass and config.json files with your account information
```

```
Available tasks
        jshint  Validate files with JSHint. *
       connect  Start a connect web server. *
        jekyll  This triggers the `jekyll` command. *
         clean  Clean files and folders. *
          sass  Compile Sass to CSS *
          copy  Copy files. *
        cssmin  Minify CSS files *
      imagemin  Minify PNG, JPEG and GIF images *
   sftp-deploy  Deploy code over SFTP *
     premailer  Grunt wrapper task for premailer *
        litmus  Send test to Litmus *
       doWatch  Run predefined tasks whenever watched files change.
         build  Alias for "clean", "jshint", "jekyll", "sass", "cssmin",
                "imagemin", "copy", "clean:tmp" tasks.
         watch  Alias for "build", "connect", "doWatch" tasks.
          test  Alias for "build", "sftp-deploy", "premailer", "litmus" tasks.
       default  default
```


### Contribution

##### Git Flow
Muffin works with [git-flow](https://github.com/nvie/gitflow).

For a contribution to muffin, you need to follow the [following workflow](https://github.com/nvie/gitflow#initialization) with the addtion of a pull-request.

Example for adding a feature:
- Start from develop (make sure to pull first)
- `git flow feature start -your feature name-`
- `git flow feature publish -your feature name-`
- start making your changes (commit and push regularly)
- when done, make a pull-request from your feature branch to develop
- after the pull-request is accepted, do `git flow feature finish -your feature name-`


### License
Muffin is licensed under the [MIT license](http://opensource.org/licenses/MIT).
