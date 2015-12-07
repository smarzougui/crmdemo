# CRM Demo with AngularJS and FireBase

This is a starting demo project to demostrate the capabilities
of Angular and FireBase for making real time scueduling application.

Built don top of Angular-Material


### TODOs
* ~~Creating Firebase~~
* ~~Integrating FireBase into Angular~~
* ~~Making simple connection to FireBase~~

* ~~Link (read write)Data to connected Candidate~~ !
* Link (read write)Data to connected Recruiter
* Link (read write) Data to Hiring Manager.

* ~~Persist connection for authentication auth0~~

* ~~Integrating Auth0~~
* ~~Using Auth0 Google to connect to FireBase~~
* ~~create data for each connected user~~
* ~~Conceive a stored relations betweens users (to be defined)~~
* ~~Make 3 way binding for booking slots (no user identification)~~
* ~~Integrate the scheduling~~
* ~~add user ito the data by email.~~
* Persist connection for authentication login/pass
* Adding types of users: candidate, recruiter and hiring manager.
* Using Auth0 with others: Twitter, facebook ...to connect to FireBase
* fix the issue of success message do not appear.

### Installing procedure

Grunt server is not yet installed (In progress).

1. put the application In unix server,
2. point to the /app folder of the project
3. Open console F12
4. Sign in
5. In the console, Copy the token from: idToken=
6. go here: https://auth0.com/docs/auth-api#delegated and click on Post /delegation
7. paste the token in the id_token area
8. put target (default app) and api_type = firebase then click on try me
9. copy paste this generated token into the home controller

You can now connect to Firebase without Passwords !

##############
FireBase logins strategy:
login: company1@gmail.com
pass: company1

login: candidate1@gmail.com
pass: candidate1

login: employee1@gmail.com
pass: employee1