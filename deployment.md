### Frontend Deployment ( Vercel )

* first clone the repo on vercel account
* vercel detect the react.js framework automatically so just select the thier folder (i.e frontend)
* it will auto run the npm run build for using codes as a production ready code
* and hit the deployment button it will genrate a public url where u can view the website

### Database Deployment ( Railway )

* choose mysql blueprint for the mysql deployment
* deploy it
* get the variables from the deployment of the database

### Backend Deployment ( Render )

* click on add new Web service
* select the source code provide
* fill the name of web service
* select the language ( i.e node.js )
* select the branch of the repo
* add root directory of the backend ( i.e backend )
* add build command ( i.e npm install )
* add start command ( i.e npm start )
* add env variables of the database to link the railway mysql database with the nodejs backend at render
* after deploy the webservice of render by choosing plan
