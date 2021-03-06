# EduTECH

[EduTech](https://edutech.vercel.app) is a MERN Full Stack project developed in the Make it Real Bootcamp.

## Stack

This project is structured in a monorepo with the following stack:

- Frontend: React, Vite, Tailwindcss
- Backend: Node.js, Express.js, MongoDB

## Requests Flow

```mermaid
flowchart LR
A[HTTP Endpoint] -- Middleware --> B[Controller]
B[Controller] --> C[Service]
C[Service] --> D[(Database)]
```

## Deployment

- Client: Vercel
- Server: Heroku

## Development

```bash
# Clone the repository
git clone https://github.com/paolorossig/edu-tech.git
cd edu-tech
# Create your own feature branch
git checkout dev
git checkout -b feat/NAME
yarn install
# Then open a PR explaining your contribution
```
