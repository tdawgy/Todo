# ToDo

## Running the site
First you'll need to install the dependencies
* Ensure you have npm installed
* open a console window
* Navigate to /todo
* use the command "npm install"

To run the site after dependencies are installed you'll need to use the angular-cli
* use the command "ng serve"
* Should be hosted at http://localhost:4200

## Running the tests
Running tests is a little inconvenient due to an issue with the current version of angular-cli
* First ensure you have chrome installed
* Next you'll need a console window running "ng serve"
* With a separate console window run "ng test --watch=false"

When that completes you should see the message "Executed XX of XX SUCCESS"

Code coverage reports are saved to ./todo/coverage/chrome XX.X.XXXX

## Known issues
* The coverage isn't reporting correctly for the task-service, I wasn't able to determine why. But it may have something to do with using the inject service to initialize the task-service in tests.
* Sometimes the new task form will show red validation styling too soon. This is a known issue with the angular2 team and is being tracked here: https://github.com/angular/angular/issues/4933