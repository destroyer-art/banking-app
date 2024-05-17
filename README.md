# banking-app
This is a Full Stack JS App (,Node.js, Hapi.js, React.js, TypeScript)


## How to run Database Locally with Docker? 

#### They are 2 options: 

1. Postgres
2. MS SQL Server

There are detailed informations about each service:   
Check README.MD file inside the specific(database/mssql-server, database/postgres-pgadmin) folders


## Security Appraches

1. Authentication (Register, Login)
2. Authorization (Protected Routes)
3. CORS Configuration for Browsers
4. API Rate Limiter Middleware (429 TOO Many Requests)
5. Input Validations (Front and Back)
6. Password Hashing and Strong Password validation
7. Adding Secority Headers



## Main Libraries

1.  @hapi/hapi            -> The Hapi framework.
2.  @hapi/joi             -> Payload validation.
3.  @hapi/boom            -> Error Handling
4.  bcrypt                -> For hashing passwords.
5.  hapi-auth-jwt2        -> For JWT authentication.
6.  typeorm               -> ORM
7.  nodemon               -> Auto Restart
8.  pg                    -> Connection to Postgres
9.  mssql                 -> Connection to MSSQL
10. jsonwebtoken          -> Authentication and Authorization
11. rate-limiter-flexible -> Rate Limit Middleware



## Backend Endpoints and Logics:
 

### LOGIN Endpoint Logic:

1. Extract the email and password from the req.payload object
2. Find a customer with the specified email address.
3. If the customer logins first time and customer's email has not been verified, update customer's emailVerified = true
4. Check if the password is valid.
5. If the password is invalid, return a 403 status code.
6. Generate a JWT token using the generateJwtTokenAsync function based on customer's information.
7. Return the JWT token back.




### REGISTER Endpoint Logic:

1. Extract the email and password from the req.payload object
2. Find a customer with the specified email address.
3. If the customer logins first time and customer's email has not been verified, update customer's emailVerified = true
4. Check if the password is valid.
5. If the password is invalid, return a 403 status code.
6. Generate a JWT token using the generateJwtTokenAsync function based on customer's information.
7. Return the JWT token back.




### PURCHASE Endpoint Logic:

1. Start the transaction
2. fetch the customer id from the Token
3. check if the customer has enough balance and if not return INSUFFICENT_BALANCE error
4. create a new transaction with the type PURCHASE with PENDING Status
5. make a payment (Integration with Payment Provider)
6. update the transaction status based on the payment status
7. update the customer balance (- Amount)
8. commit the transaction
9. send the Response to the end user
10. handle the errors and rollback the transaction if any error occurs




### REFUND Endpoint Logic:

1.  Start the transaction
2.  fetch the customer id from the Token
3.  fetch purchasedTransaction by transactionNumber
4.  check if the purchasedTransaction exists and if not return TRANSACTION_NOT_FOUND error
5.  check if the purchasedTransaction is already refunded and if yes return ALREADY_REFOUNDED error
6.  update the purchasedTransaction status to RETURNED
7.  create a new transaction with the type REFUND with PENDING Status
8.  make a payment (Integration with Payment Provider)
9.  update the transaction status based on the payment status
10. update the customer balance (+ Amount)
11. commit the transaction
12. send the Response to the end user
13. handle the errors and rollback the transaction if any error occurs




### TOP UP Endpoint Logic:

1. Start the transaction
2. fetch the customer id from the Token
3. create a new transaction with the type TOP_UP with PENDING Status
4. make a payment (Integration with Payment Provider)
5. update the transaction status based on the payment status
6. update the customer balance (+ Amount)
7. commit the transaction
8. send the Response to the end user
9. handle the errors and rollback the transaction if any error occurs




### TRANSFER Endpoint Logic:

1.  Start the transaction
2.  fetch the customer id from the Token
3.  fetch the target customer by GSM Number
4.  check if the customer has enough balance and if not return INSUFFICENT_BALANCE error
5.  check if the target customer exists and if not return GSM_NUmber_NOT_FOUND error
6.  check if the target customer is the same as the current customer and if yes return CAN_NOT_SEND_TO_YOURSELF error
7.  create a new transaction with the type TRANSFER with PENDING Status
8.  make a payment (Integration with Payment Provider)
9.  update the transaction status based on the payment status
10. update the customer balance (- Amount)
11. update the target customer balance (+ Amount)
12. commit the transaction
13. send the Response to the end user
14. handle the errors and rollback the transaction if any error occurs


### GET Customer(Current Customer) Endpoint Logic:

1. fetch the customer ID from the Token
2. fetch the customer from the database using the Customer ID
3. check if the customer is not found, return CUSTOMER_NOT_FOUND message
4. return the customer details excluding the password, emailVerified, createdAt

