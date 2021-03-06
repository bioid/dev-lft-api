const express = require('express');
const { requireAuth } = require('../middleware/jwt-auth');
const { requireOwner } = require('../middleware/user-role-verification');
const ProjectsService = require('../projects/projects-service');
const VacanciesService = require('../vacancies/vacancies-service');
const RequestsService = require('./requests-service');

/**
 * Router to handle all requests to /api/requests
 */
const requestsRouter = express.Router();
requestsRouter.use(express.json());

// POST `/requests` creates a new request
requestsRouter.post('/:vacancy_id', requireAuth, (req, res, next) => {
  const db = req.app.get('db');
  const { vacancy_id } = req.params;
  const user_id = req.user.id;

  // check if request by user already exists for given vacancy
  RequestsService.getItemWhere(db, { user_id, vacancy_id })
    .then(request => {
      // if one exists, user already requested to join the team
      if (request)
        return res.status(400).json({
          error: `Request for same vacancy by this user already exists`
        });

      // otherwise, create it
      const newRequest = {
        vacancy_id,
        user_id,
        date_created: 'now()'
      };

      // store the request data
      RequestsService.insertItem(db, newRequest)
        .then(request => {
          // send 'em back the request
          return res.status(201).json(request);
        })
        .catch(next);
    })
    .catch(next);
});

// PATCH `/requests/:request_id` marks a request as approved or denied
requestsRouter.patch('/:id', requireAuth, requireOwner, (req, res, next) => {
  const db = req.app.get('db');
  const request_id = req.params.id;
  const { status } = req.body;

  // check that a status was provided
  if (!status)
    return res.status(400).json({
      error: 'Request body must contain status'
    });

  const updatedRequest = { status: status.toLowerCase() };

  // check the validity of the status provided
  if (
    updatedRequest.status !== 'approved' &&
    updatedRequest.status !== 'denied'
  ) {
    return res.status(400).send({
      error: `Status must be either 'approved' or 'denied'`
    });
  }

  // update the request
  RequestsService.updateItem(db, request_id, updatedRequest)
    .then(request => {
      if (!request) return;
      // if the status was approved
      if (status === 'approved') {
        // put the user into the vacancy
        const { user_id, vacancy_id } = request;
        const updatedVacancy = { user_id };
        VacanciesService.updateItem(db, vacancy_id, updatedVacancy).catch(next);

        // deny all other requests for the same vacancy
        const deniedRequest = { status: 'denied' };
        RequestsService.updateItemsWhere(db, { vacancy_id }, deniedRequest)
          .whereNot({ id: request.id })
          .catch(next);
      }

      // send 'em back a thing
      return res.status(204).end();
    })
    .catch(next);
});

// GET `/requests/:project_id` gets all requests for a specific project
requestsRouter.get(
  '/:project_id',
  requireAuth,
  requireOwner,
  (req, res, next) => {
    const db = req.app.get('db');
    const { project_id } = req.params;

    // send 'em a list
    RequestsService.getRequests(db, project_id)
      .then(requests => {
        if (res.headersSent) return;
        return res
          .status(200)
          .json(requests.map(RequestsService.serializeRequest));
      })
      .catch(next);
  }
);

module.exports = requestsRouter;
