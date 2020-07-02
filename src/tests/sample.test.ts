process.env.NODE_ENV = "test";
import * as request from 'supertest';
import * as jest from 'jest';
import * as app from '../app';

test("It adds two numbers", () => {
    expect(1 + 1).toBe(2);
});