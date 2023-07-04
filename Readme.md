DB diagram: https://www.canva.com/design/DAFmz1PrGYs/L4DHevyUmvKpW_--hJv0hQ/edit?utm_content=DAFmz1PrGYs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

| Service | Flow diagram                                                                                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Product | https://www.canva.com/design/DAFm7FOTj3M/QpidZkJ4yXAeSU7S9oZwVA/edit?utm_content=DAFm7FOTj3M&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton |
| Room    | https://www.canva.com/design/DAFm8PUCKO4/RWsPmPUOdEWUihEK0byeCQ/edit?utm_content=DAFm8PUCKO4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton |
| Review  | https://www.canva.com/design/DAFm8O6wS-w/fayNWz6QuRRJHN4e3uE0nA/edit?utm_content=DAFm8O6wS-w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton |
| Payment | https://www.canva.com/design/DAFnCac2iK0/gvY2gIFfafJDd9skmYNf_A/edit?utm_content=DAFnCac2iK0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton |

| Env val                | Purpose                        |
| ---------------------- | ------------------------------ |
| DATABASE_URL           | url link to db                 |
| SERVICE_JWT_SECRET_KEY | secret for service token       |
| USER_JWT_SECRET_KEY    | secret for internal user token |

Simple conventions:

- Name of file: use '-' to separate words. With file service, repo -> put name of service to first. Example: user-service.
- Name of func: clear purpose on name, use camelCase: Example: verifyToken
- Name of folder: follow name of file
- Every code convention has added in eslint configuration.
