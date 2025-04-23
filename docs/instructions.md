
## Before you begin
Throughout this course, you have gained a solid understanding of secure coding practices and the fundamentals of Identity and Access Management (IAM). As you move forward, consider the following key questions:

- **What is the difference between authentication and authorization?**  
  [Authentication vs Authorization: Key Differences (Fortinet)](https://www.fortinet.com/resources/cyberglossary/authentication-vs-authorization)

- **What is difference between session based and token based authentication?**  
  [Session vs Token Based Authentication (GeeksforGeeks)](https://www.geeksforgeeks.org/session-vs-token-based-authentication/)

- **[What is the difference between access_token and refresh_token?](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)**

- **How does JWT Tokens help in Authentication?**  
  [JSON Web Token Introduction (jwt.io)](https://jwt.io/introduction)

- **[How does Role-Based Access Control (RBAC) differ from Attribute-Based Access Control (ABAC)?](https://www.okta.com/uk/identity-101/role-based-access-control-vs-attribute-based-access-control/)**

- **[What are secure coding practices, and why are they important?](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist)**

- **How can you ensure your code is protected against the OWASP Top 10 vulnerabilities?**  
  [OWASP Top 10 Vulnerabilities (Veracode)](https://www.veracode.com/security/owasp-top-10/)


Reflecting on these questions will help you focus on the essential security features you need to implement and reinforce the concepts you’ve learned. 

## Starter code
This project does include optional starter code to get you connected to the database and some basic go API setup. If you choose to use the starter code, know that starter code will provide basic setup and you will have to write the features for your taskify application. Feel free to write your own code and seed the database with your method.

## Taskify App: Feature Requirements

To deliver a robust and user-friendly Taskify application, the following core features need to be implemented:

### 1. User Registration
- Enable seamless onboarding of new users via the `/register` endpoint.
- Users should be able to create an account and join Taskify effortlessly.

### 2. User Login
- Allow users to securely log in to the platform using the `/login` endpoint.
- Ensure proper authentication and session management.

### 3. Access Management
Implement both Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC) to govern user permissions.

| **User Role** | **Resource** | **Permissions**                                                |
|---------------|--------------|----------------------------------------------------------------|
| **User**      | Profile      | View and update own profile                                    |
|               | Task         | Create, view, and update own tasks                             |
| **Admin**     | Profile      | All permissions of a User                                      |
|               | User         | View, update, and delete any user                              |
|               | Task         | Create, view, update and delete any task across Taskify        |

- **User:** Can manage their own profile and tasks.
- **Admin:** Has full control, including managing all users and tasks across the platform.

### 4. Task Management
- Provide endpoints for users to create and update their tasks.
- Ensure task operations respect the user's role and associated permissions.


## Development strategy
You are welcome to use this overview and the rubric to create this project. Feel free to design and implement your own workflow, but if you are stuck or could use some inspiration, we've included the following walkthrough the help you get up and running:

- **Complete the Registration Endpoint:**  
  Implement user onboarding by completing the registration endpoint. The `users` table schema is already provided in the `database-migrations/migrations` folder.

- **Implement the Login Endpoint:**  
  Authenticate users and issue a JWT `access_token` for accessing protected endpoints. Also, generate a `refresh_token` to allow users to request new access tokens as needed.<br>
  The `access_token` should be securely signed using a JWT (JSON Web Token).


    >### access_token
    >An access_token is a secure, time-limited credential issued after authentication that allows a user or application to access protected resources or APIs. It typically contains encoded information about the user’s identity and permissions. for e.g.
    >```shell
    >eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmQwMDZkNDEtYWRlZC00MDQwLTk5MzQtMmJhNGU5MDllZjlhIiwicm9sZXMiOlsiYWRtaW4iXSwiaXNfYWRtaW4iOnRydWUsInBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZSI6InVzZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidGFzayIsImFjdGlvbnMiOlsiZGVsZXRlIiwicmVhZCIsIndyaXRlIl19XSwiZXhwIjoxNzQ0ODI1NTEwLCJpc3MiOiJ0YXNrLW1hbmFnZXIiLCJzdWIiOiJiZDAwNmQ0MS1hZGVkLTQwNDAtOTkzNC0yYmE0ZTkwOWVmOWEifQ.D6t3MAxEc11gyfK6mdTRVrJ8DlqzYArvN3dlLOAuEJQ
    >```
    >#### You can decode JWT access_token on local or [online](https://jwt.io/)
    >```
    >access_token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmQwMDZkNDEtYWRlZC00MDQwLTk5MzQtMmJhNGU5MDllZjlhIiwicm9sZXMiOlsiYWRtaW4iXSwiaXNfYWRtaW4iOnRydWUsInBlcm1pc3Npb25zIjpbeyJyZXNvdXJjZSI6InVzZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidGFzayIsImFjdGlvbnMiOlsiZGVsZXRlIiwicmVhZCIsIndyaXRlIl19XSwiZXhwIjoxNzQ0ODI1NTEwLCJpc3MiOiJ0YXNrLW1hbmFnZXIiLCJzdWIiOiJiZDAwNmQ0MS1hZGVkLTQwNDAtOTkzNC0yYmE0ZTkwOWVmOWEifQ.D6t3MAxEc11gyfK6mdTRVrJ8DlqzYArvN3dlLOAuEJQ"
    >
    >echo $access_token | awk '{split($0,a,"."); print a[2]}'| base64 -d
    >```

- **Build the Refresh Token Endpoint:**  
  Create an endpoint to validate the provided `refresh_token` (issued during login) against the database and issue a new JWT `access_token`.

- **Establish Role-Based Access Control (RBAC):**  
  Define two user roles: `user` and `admin`.  
  - Users can access only their own data (profile, tasks).  
  - Admins have full access to all data and actions.  
  Use the provided `tokens` table schema and store issued `refresh_token` in the database.  
  Design supporting tables such as `roles` (role definitions) and `user_roles` (user-role associations).

- **Add Resource-Based Permissions for Attribute-Based Access Control (ABAC):**  
  Define permissions at the resource and action level (e.g., `task:read`, `task:write`, `user:read`, `user:write`, `profile:read`).  
  - Example: Only admins can delete any task or manage users; regular users cannot.  
  Create supporting tables such as `permissions` (permission definitions) and `permission_roles` (role-permission associations).

> When you add a new database migration, make sure to run database migrations first and then run your code changes.
> ```shell
> cd database-migrations
> migrations -path ./migrations -database postgres://taskmanager:${DB_PASSWORD}@taskmanager:5432/taskmanager -verbose up
> ```

- **Develop Complete Tasks CRUD APIs:**  
  Implement endpoints to create, update, delete, retrieve all tasks, and fetch a task by its specific `taskId`.

- **Ensure Data Persistence:**  
  All application data should be reliably stored in the database.

- **Secure Endpoints with Access Control:**  
  Protect sensitive endpoints so that only admins have elevated privileges (e.g., viewing all users, deleting any task), while regular users have restricted access.

---

**Best Practices:**

- Test each feature with [Postman](https://www.postman.com/) (or your preferred tool) as you build, ensuring all inputs and scenarios behave as expected.
- Use Go’s logging capabilities to debug and log errors effectively.
- Continuously look for optimization opportunities, such as improving database queries, validating rate limiter behavior, and ensuring pagination efficiently handles large datasets.
- Always test edge cases, including invalid inputs and rate limit exceedances, to deliver a stable and reliable API experience.

Be on the lookout for areas to optimize. Are there places where database queries could be improved?

As a final note, do not forget to test for edge cases like invalid input. Aim for a stable and reliable API experience for your users. Happy developing!

---

**Happy developing!** 🚀