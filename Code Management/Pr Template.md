# Pr Template
- In a large organization where microteams work on different projects, it becomes challenging to maintain consistency.
- There are various levels on which we want the organization to function consistently, and one such area is code review.
- You want only reviewed codes to get merged and deployed on the production to avoid as many bugs as possible. Engineering is an expensive operation and utilizing the resource will help to save both organizations time and money.
- In large organizations, the set of rules or instructions is defined upfront, which helps to streamline the process.
- PR templates are one of those tiny instruction templates that play a large role in having a better code review.
- As a senior engineer, in the interviews, you could be asked to define the steps that can be followed to make things better, and discussing the PR template is a good topic.

## Why use the PR template ?
- Using a PR template ensures that all necessary information is included in the code review, making it easier for reviewers to provide feedback and for developers to make necessary changes before deployment. Additionally, consistent use of PR templates helps maintain code quality and adherence to coding standards across the organization.
- A general rule of thumb to follow while defining a PR template is that your colleagues in your absence should be able to modify or make changes in the code, so you should be providing sample information that will help them.

## Things to include in a PR template
### Pr Title
- **Ticket ID:** 
- The PR should reflect the task you are doing, and to track the tasks, we use tools like the JIRA board that integrate very well with the Github or Bitbucket. The title of the PR should include the JIRA, or ticket ID. Example: [TASK-1234] Added a to-do-remove option.
- **PR Description:** 
- The code owner should clearly describe the changes that they have made and why they have made them. Is there any dependency change with this current change?
- Have a separate section to describe each.
1. What is the current behavior? What is the new behavior?
2. Why is this change required? What problem does it solve?
3. List any dependencies that are required for this change.How has this been tested?
- **How has this been tested?** 
- It is important that only tested code is merged, and the person who is reviewing the code should clearly understand how these new code changes have been tested.
Have a separate section to describe each.Include details of the tests you ran to see how your change affects other areas of the code, etc.
- Include details of the tests you ran to see how your change affects other areas of the code, etc.Please describe any relevant performance impacts of this change. This can have a positive or negative impact. How did you characterize or test the performance impact?
- 