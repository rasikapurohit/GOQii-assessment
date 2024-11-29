### Assumptions

- The application is using inbuilt mysql along with xammp to start web server for apache and mysql
- There is basic validation for user form
- the database contains only 1 table for users with columns(id, name, email, dob, password and creation_date)
- Node_modules has been added .gitignore
- There are no initial users added
- Application is using latest versions/inbult version of modules
- PHP version is 8.3.6 and inbuilt mysql database
- Email must be unique for all users


## To run the application

### Create DB 

create db goqii_assessment

### Create table

CREATE TABLE users ( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, dob DATE NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );

### Run the application

`cd frontend`

`npm start`

## Flow of application

The application has two tabs
1. View Users
2. Add User

### View Users

- This tab displays the list if all users added in database.
- There are two options for users
- Edit - Upon clicking edit, user details can be updated
- Delete - click the delete button to delete the user from database

### Add User

- This is a form to add new users
- Provide details such as Name, email, DOB, password and click on Submit

## Demo

[![Video](https://png.pngtree.com/png-vector/20190215/ourmid/pngtree-play-video-icon-graphic-design-template-vector-png-image_530833.jpg)](https://youtu.be/w_Q7uOD8qx8)
