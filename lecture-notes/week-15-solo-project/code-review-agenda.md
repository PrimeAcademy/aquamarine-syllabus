# Code Review Guide

**Ask students to take turns walking through the features they are most familiar with**

1. Walk through all of the features currently present in the application
2. Walk through an authenticated route from the HTML through to SQL. Make sure `.isAuthorized()` is present and if only specific users are intended to have access, `req.user.id` should be used to validate Authorization.
3. Consistency throughout code
    - Formatting
    - Style
    - Naming
4. DRY code
5. Opportunities to simplify code
6. Conversation about Trello Board and remaining tasks
