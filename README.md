# Manabu

An application that attempts to make learning more efficient by consolidating flashcards, notes and reminders. Goal of this application is to reduce the number of applications a user has to maintain. Additionally, a student can check the weather, news and MBTA train times to more efficiently prepare in the mornings. Online demonstration of the app can be found at [manabu.page](https://www.manabu.page).

## Getting Started
1. Clone the repository to your computer.
2. In command line go to the directory of the project that you cloned.
3. Run the following to install the necessary dependencies. Yarn can be installed [here](https://yarnpkg.com/en/docs/install).
```
$ bundle install
$ yarn install
```

4. Create and prepare the database.
```
$ bundle exec rake:db create
$ bundle exec rake:db migrate
```

5. Start the server by running the following. Then visit `localhost:3000` in a browser.
```
$ rails server
```
6. In a new command line window run the following.
```
$ yarn run start
```

## Tests
- Run RSpec tests by running:
```
$ bundle exec rspec
```
- Run Enzyme tests by running
```
$ yarn run test
```

## Frameworks
- [Devise](https://github.com/plataformatec/devise) - User authentications.
- [Draft.js](https://draftjs.org/) - Rich-text editor.
- [React Flatpickr](https://github.com/coderhaoxin/react-flatpickr) - Calendar for reminders.
- [FontAwesome](https://fontawesome.com) - Provides icons.
- [Foundation](https://foundation.zurb.com/) - A CSS framework.
- [Geocoder](https://github.com/alexreisner/geocoder) - Geocoding.
- [MakeItSo](https://github.com/LaunchAcademy/make_it_so) - A framework for starting Rails apps.

## APIs
- [Bing Maps](https://msdn.microsoft.com/en-us/library/dd877180.aspx) - Location based on coordinates.
- [DarkSky](https://darksky.net/dev) - Weather data.
- [MBTA](https://www.mbta.com/developers/v3-api) - MBTA train predictions.
- [News API](https://newsapi.org/) - News with descriptions and images.
- [Skycons](https://darkskyapp.github.io/skycons/) - Weather icon.

## Potential Additions to Existing Features
- Flashcards
  - Reorder cards.

## Potential New Features
- Classes/subject to assign to flashcards, notes, reminders, and etc.
- User to user interaction.
  - Sharing flashcards, notes, reminders, and etc with other users.
  - Chats to study together remotely.
  - Classroom where students can share files/content.
  - A teacher user who would maintain a classroom.
- Practice problems.
  - Teachers can create practice tests to assign to students.
