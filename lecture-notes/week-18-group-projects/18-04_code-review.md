# Project Code Review

A very thorough code review early on can help catch wonky shit and set expectations on code quality and organization.

This should be sometime near the end of this week (18) or whenever you are seeing solid progress.

Your goal is to re-direct or adjust but also to encourage, teach, advise, and answer questions. **Keep it positive but detailed.**


## Set-up

You will meet with each entire team. Set aside 1.5 - 2 hours for this. You'll want to give them some heads up (see below) so you can ideally review off a single branch.

It can be helpful for another Instructor to be there as extra eyes. (Kris digs doing these). Your powers combined can offer a lot of valuble perspective to the teams.


### Direction To Students: 

Slackable to each team:

```
Code Reviews/Check in with `instructor-name`:  Thurs 10am `team-name`, etc. These will be 60-90 minutes.

We're going to see all the things working or partially working, discuss where you're at, and take a swing thru the actual code.

In Preparation:

- Get application ready to present
    - Instructors will want to look at entire route from HTML to database
    - Instructors will want to see all functioning features (in the browser)
        - Merge all code together so it is ready and you don’t need to sscramble to get it prepped before code review
        - All things to be reviewed should be in a single branch on a single computer (shouldn’t need to switch out computers for walkthrough)
    - Styling not required or expected
```

---

# During Code Review

Step through the application in actual usage. Have the students click through, use forms, etc. You want to see everything that is "working." In particular you want a good grasp on what is hard-coded and what is not, general progress.


## Review Security, Auth Handling

Make sure routes are checking for proper authentication and authorization

If AuthZ/roles are needed, recommend a module vs copy/pasting. Students can follow the `rejectUnauthenticated` example. These middleware run in order.

For instance:
    
```js
router.get('/', rejectUnauthenticated, rejectNonAdminUser, (req, res) => ... 
```

## Review Architecture and Organization

- Sagas/Reducers align with router (CRUD) files per entity. Look for lots of files each with a single saga or reducer.
- Component organization/size
    - Folders/Components can be changed from our template
    - Organize into "pages", with Components within
    - Don't need to have a folder for each Component
- Gnarly SQL
    - Poke at or ask about any queries that seem especially complicated.
        - How do they know the results are correct?

## Review Compared to Scope

- Ask how they feel they are doing based on the scope they made
- Have they diverged? Added features? Changed things?
- These are all normal but they should be aware of any divergence.

## Closing

Close out with praise, encouragement, and any action items you need to take. For instance, maybe you want to check back in on something you asked to get changed. 

Make sure you follow up!