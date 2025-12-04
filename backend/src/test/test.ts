import jwt from 'jsonwebtoken';
import { JWT } from "../../keys";

// yarn ts-node-dev src/test/test.ts

interface IdField {
  id: number | string
}

const header = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzYzMDYwNzIyLCJleHAiOjE3NjMwNjQzMjJ9.L5jEf5NavjwCi1v0WHGOtzRblyzz0H2DuVLUNyTo5Yg';

const words = header.split(' ')[1];

const decoded = jwt.verify(words, JWT.JWT_SECRET);

const {id} = decoded as IdField

console.log(words);
console.log(id);
