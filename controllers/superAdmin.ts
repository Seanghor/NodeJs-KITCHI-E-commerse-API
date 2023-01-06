import express, { NextFunction, Request, Response, Router } from 'express';
const router: Router = express.Router();
import { isAuth } from '../middlewares/auth';
import { findCustomerById } from '../services/test';


