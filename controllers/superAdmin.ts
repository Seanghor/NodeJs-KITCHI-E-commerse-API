import express, { NextFunction, Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { addRefreshTokenToWhitelist} from '../services/auth';
const router: Router = express.Router();




/**
 * POST /register
 * @summary  register a school
 * @param {string} email the email of the new school
 * @param {string} password the password of the new school
 * @param {string} name the name of the new school
 * @param {string} address the address of the new school
 * @param {string} phone the phone of the new school
 * @param {string} website the website of the new school
 * @param {string} logo the logo of the new school
 * @param {string} description the description of the new school
 * @returns {object} 200 - success response
 * @returns {object} 400 - Bad request response
 * @example response - 200 - success response example
 *  {
 *   "accessToken":"accessToken",
 *  "refreshToken":"refreshToken"
 */

  

export default router;


