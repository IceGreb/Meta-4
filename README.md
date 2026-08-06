This project is a full-stack database application containing the results of enzyme discovery through metagenomic sequence analysis, as conducted for my Master's thesis. It includes protein domains of 4 superfamilies:
 Nattokinase, Feruloyl Esterases, Cocaine Esterases, Petases Pet Hydrolases, features and metadata of them (UniParc IDs and cross-ref links to known protein databases) as well as 3d models predicted with the use of AlphaFold2.

## Stack

- **Backend**: Spring Boot 3.3 (Java 21), Maven — `backend/`
- **Frontend**: Angular 17 — `frontend/`
- **Database**: MongoDB — seed data in `mongo-data/`

## Prerequisites

- Java 21
- Node.js (v18+, matching Angular 17's requirement) and npm
- MongoDB running locally on the default port (27017), or a MongoDB Atlas connection string

## Database setup

The backend expects Mongo at `mongodb://localhost:27017/backend` by default (see `backend/src/main/resources/application.properties`). To use Atlas instead, override `spring.data.mongodb.uri`.

Import the seed data (requires `mongoimport` from the MongoDB Database Tools):

```bash
for f in mongo-data/backend.*.json; do
  collection=$(basename "$f" .json | sed 's/^backend\.//')
  mongoimport --db backend --collection "$collection" --file "$f"
done
```

## Running the app

**Backend** (from `backend/`):
```bash
./mvnw spring-boot:run
```
Starts on `http://localhost:8081`.

**Frontend** (from `frontend/`):
```bash
npm install
npm start
```
Starts on `http://localhost:4200`, proxying `/api` requests to the backend (see `proxy.conf.json`).
