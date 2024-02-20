# Jinglefy

### A GrubHub clone made by [Ellie Starr].

#### Full Create, Read, Update, Delete functionality for Restaurants, Items, and Reviews, with a Cart feature coming soon.
This is a fullstack application developed as part of App Academy's 24 week software engineering bootcamp. I chose Grubhub as my site to clone because not only am I a frequent user of the service, but my sister actually works for the company. I also wanted to incorporate something with an ecommerce type of feeling for my portfolio, as my previous projects haven't had anything like it. During the development process I learned lots of useful things, such as how to use Modals more dynamically, and several CSS tricks to make my site feel satisfying to use.

#### Check our live website out [here!]
#### Documentation can be found in [this github repo's wiki]

### Technology used
- Front-end
  - React
  - Redux
  - JavaScript
  - CSS
  - HTML
  - Icons
    - FontAwesome
    - React-icons
    - GoogleFonts API
- Back-end
  - Python
  - SQL
  - SQLAlchemy
  - Alembic
  - Sqlite3 (development)
  - PostGreSQL (production)
  - Amazon Web Services (AWS)
  - Flask
  - Docker
- Tools
  - VS Code
  - GitHub and Git
  - Render for deployment and publishing

### Get Started Locally
- Clone the "main" branch of this repository.

- Install the dependencies with the following command
  ```bash
   pipenv install -r requirements.txt
   ```
	 to generate a new requirements.txt run ` pipenv install requirements > requirements.txt`
- Create a .env file based on the example with proper settings for your development environment
- Ensure that the SQLite3 database connection URL is in the .env file
- This starter organizes all tables inside the `flask_schema` schema, defined by the `SCHEMA` environment variable. Replace the value for `SCHEMA` with a unique name, **making sure you use the snake_case convention.**
- Get into your pipenv, migrate your database, seed your database and run your Flask app:
``` bash
pipenv run flask db migrate
```
``` bash
pipenv run flask db upgrade
```
``` bash
pipenv run flask seed all
```
```bash
pipenv run flask run
```
- To run the React frontend, `cd` into the **react-vite** directory and run `npm i` to install dependencies. Finally, run ` npm run dev` to open the application on the local browser.


[Elliot Starr]: https://github.com/estarr626
[here!]: https://bytebites-ev64.onrender.com
[this github repo's wiki]: https://github.com/estarr626/ByteBites/wiki
