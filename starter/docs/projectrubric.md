# Rubrik: Taskify : Task Management API

## Starter Code
Starter code contains 
- `database-migrations` - set of scripts to initialise a `taskmanager` database's schemas.
- `backend` - GO Server API project which covers boilerplate code with all required dependencies and starter code to kickstart your jounery into Securing Taskify application.
- optional - `frontend` - React Project with several pages for Taskify application that can help you see everything in action from frontend to backend. You can optionally look at it and complete integration with your backend project once all your taskify APIs are ready and secure.

## Section 1 : User Registration and Login(Authentication)
| **Criteria**      | **Submission Requirements**                                                                                                                                       |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **User Registration** | - Complete the implementation of the registration handler and service.<br>- Store user passwords using a strong cryptographic hash function.<br > - All `users` information should be saved in postgresql `users` table                       | 
| **User Login**        | - Complete the implementation of the login handler and service.<br>- On successful login, return a JWT `access_token` and `refresh_token`, each valid for 1 hour.<br> - `tokens` table should store `refresh_token` and its validity |                                                                                                                                                                                                                                 |
| **Refresh Token**     | - Complete the implementation of the refresh token handler and service.<br>- Endpoint should return new valid JWT `access_token` and `refresh_token` with expiry when provided a valid `refresh_token`. | 

> **Note:** The `users` and `token` tables schema are already created in advance.

## Section 2 : Task Management

| **Criteria**                   | **Submission Requirements**                                                                                     |                                                                                                 
|-------------------------------|----------------------------------------------------------------------------------------------------------------|
| **Tasks Table Migration**      | - Create a new migration for the `tasks` table in the `database-migrations/migrations` folder.- Use ascending numeric prefixes for migration filenames. | 
| **Task Management Endpoints**  | - Implement CRUD operations for tasks in `handlers/tasks.go` and `services/tasks.go`. | 

## Section 3 : Authorization and Permissions (Database Design)

| **Criteria**                      | **Submission Requirements**                                                                 | 
|-----------------------------------|---------------------------------------------------------------------------------------------|
| **Roles Table Schema**            | Create a `roles` table with fields: `id` (UUID), `name` (unique).                           | 
| **User Roles Table Schema**       | Create a `user_roles` table with fields: `user_id` (UUID), `role_id` (UUID).                | 
| **Permissions Table Schema**      | Create a `permissions` table with fields: `id` (UUID), `resource` (string), `action` (string). | 
| **Role Permissions Table Schema** | Create a `role_permissions` table with fields: `role_id` (UUID), `permission_id` (UUID).    | 
| **Default Data Population**       | Populate initial data:<br>- Roles: `user`, `admin`.<br>- Admin user with `admin` role.<br>- Role-permission mappings for `user` and `admin`. | 

> **Note:**  
> - Include `CREATE TABLE` and `DROP TABLE` SQL scripts in the `database-migrations/migrations` folder.  
> - All tables belong to the `taskmanager` database schema.

## Section 4 : Authorization and Permissions (Code)

| **Criteria**                  | **Submission Requirements**                                                                                              |              
|-------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| **Add User Roles**            | - Update the registration process to assign the default `user` role.<br>- Modify the login implementation to include the user's role in the `access_token`. | 
|**Add Role Permissions** |</br>- Update login to embed the user's permissions in the `access_token`</br>|
| **Add Authorization Middleware** | - Implement middleware to verify the `access_token` on each request and enforce role- and permission-based access to resources. | - Implement middleware to verify and parse the `access_token` on every request</br>- Enforce role- and permission-based access controls at the middleware level</br>- Ensure the middleware checks the user’s role and permissions against the database</br>- Deny access by default if permissions are missing or invalid (compulsory deny-by-default policy)</br>- Prevent users from performing actions on resources they do not own (e.g., updating another user’s task)</br>- Log authorization failures for auditing and debugging</br> |


## Section 5 : OWASP Vulnerability Fix: SQL Injection

| **Criteria**             | **Submission Requirements**                                                                 |              
|--------------------------|--------------------------------------------------------------------------------------------|
| **SQL Injection Fix**    | Identify and resolve the SQL injection vulnerability in the existing `Get User Profile` endpoint implementation. | 


## Suggestions to Make your Project Stand Out
- Provide a postman collection to test your endpoints
- Document all key architectural and design decisions in the `README.md` for clear project guidance and future reference.
- Leverage Swagger to automatically generate and maintain comprehensive API documentation.
- Implement sorting and pagination features in the Tasks Management API to enhance usability and performance.
- Write unit tests for each function to ensure every piece of logic behaves as specified and to maintain code reliability.
- Develop end-to-end tests to validate complete application workflows and user journeys.
  - Utilize tools such as [Venom](https://github.com/ovh/venom) or [Newman](https://learning.postman.com/docs/collections/using-newman-cli/command-line-integration-with-newman/) for automated end-to-end testing.
- Seamlessly integrate the `frontend` and `backend` projects to deliver a unified, full-stack solution.
- Centralize common utility functions (e.g., JWT token parsing, UUID validation) in `utils/utils.go` to promote code reuse(DRY principles) and maintainability across the project.
- Add Docker Compose file for deployment
