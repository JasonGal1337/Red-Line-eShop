## PROJECT NAME ##

Red Line E-Shop

## DESCRIPTION ##

It's a pretty standard e-shop with products, categories, add to cart & checkout via STRIPE functionality.
Two sides one for the users and one for admins.

## INSTALLATION ##
# This guide assumes you have a code editor & NODE.js installed in your local machine. #
# This guide assumes you have MONGODB installed in your local machine. #
# Guides: https://ruslan.rocks/posts/how-to-install-node-js-in-visual-studio-code , https://www.mongodb.com/docs/mongodb-vscode/install/#

To get started with this project, you can fork it from GitHub in your code editor or your integrated development environment of choice and then follow these steps:

   1. Fork this repository by clicking the "Fork" button at the top right of the GitHub page.

   2. Connect your own MONGODB database and create .env file with your credentials OR ask me directly for the project's mongoDB credentials that aren't uploaded for security reasons.

   3. Clone your forked repository to your local machine using the following command:
      ```
      git clone https://github.com/JasonGal1337/Red-Line-eShop/your-fork.git
      ```
   4. Navigate to the project directory:
      
      # cd your-fork #
      
   5. Navigate to the backend directory and install its dependencies:
 
      # cd server # 
      # npm install #

   6. Launch the backend server:
    
      # npm start #
    
   7. Navigate to the frontend directory and install its dependencies:

      # cd.. #
      # cd client #
      # npm install #

   8. Launch the website to test on your local machine browser:

      # npm start #


## FEATURES & HOW TO USE ##

   A. Admin Side 

      1. Navigate to localhost:4000/admin & login with the admin account: acc: admin, pass: admin.
     
      2. It's pretty straightforward here, you can see the create / edit / delete products & categories buttons and make the changes that you wish.

   B. User Side

      1. Navigate to localhost:4000/signup and create a user account. You're logged in after creation.

      2. If you log out you can login again from localhost:4000

      3. Navbar features: 
     
         a. You can edit your user information by navigating to "profile" from the navbar.

         b. You can check what you've added to cart by navigating to "cart" from the navbar.

         c. You can use the search component to browse products and categories relative to your query.

      4. You can navigate to "home" by clicking the e-shop's logo. From there you can navigate

      to products and categories intuitively like you would in any other e-shop.

      5. When you go to a specific product's page, you can choose to add it to cart & choose to leave a review.

      The rest of the functionality you can see in the product page is not yet implemented.

      6. On the "cart" page you can add or reduce quantity of your added products or completely remove them via the relative intuitive buttons.
   
      You can see similar products which are drawn from relevant or same categories. You can also see a bought before tab with previous purchases.

      If you're ready to make a purchase proceed to checkout via the checkout button and fill in your payment information.

## TECHNOLOGIES USED ##

# MERN stack (MongoDB, Express.js, React, Node.js) #
# bcrypt #
# cloudinary #
# cors #
# dotenv #
# jsonwebtoken #
# mongoose #
# multer #
# stripe #
# react-stripe-checkout #
# uuid #
# bootstrap # 
# react-bootstrap #
# nodemon #

## CONTACT INFORMATION ##

made by Jason Galanis

Thank you for checking out my project!

Feel free to contact me @linkedin at https://www.linkedin.com/in/jason-galanis-06772a14a/
Feel free to contact me @github at https://github.com/JasonGal1337