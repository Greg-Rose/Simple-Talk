<h1 style="text-align: center;">
  SimpleTalk
</h1>

![alt text](/demo-screenshot.png "Demo Screenshot")

<p style="text-align: center;">
  Medical Jargon Transcription and Simplification App
</p>
<p style="text-align: center;">
  Try it out: https://simpletalkdoc.herokuapp.com
</p>

## Contributors

* Ja'naysha Hamilton
* Sabrina Ibarra
* Greg Rose
* Bethany Dubois
* Natacha Lou Comandante


## How To Use

 1. Click the microphone icon/button to start recording
 2. Say what you want transcribed and simplified
 3. Click the Stop button when you're finished talking


## How To Run Locally

To clone and run this application (on Mac), you'll need [Git](https://git-scm.com), Ruby and Python installed on your computer. From your command line:

```bash
# Install Ruby
$ brew install ruby-install
$ ruby-install ruby 2.4.1
$ gem install rubygems-bundler
$ gem regenerate_binstubs

# Install Python 2.7.10
$ brew install python

# Install Python dependencies
$ sudo easy_install pip
$ sudo pip install -U python-dotenv
$ sudo easy_install --upgrade watson-developer-cloud

# Clone this repo or optionally fork the repo and then clone your fork
#   (install git first if not already installed)
$ git clone https://github.com/Greg-Rose/Simple-Talk.git
  or
$ git clone (your forked repo address here)

# Go into the repository
$ cd Simple-Talk

# Install Rails and other Ruby dependencies
$ bundle install

# Setup database
$ rake db:create
$ rake db:migrate

# Run the server
$ rails s

# In your browser, visit localhost:3000
```

## How To Contribute

 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that your changes can be reviewed
