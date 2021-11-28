# Security Police

## About

As seen the purpose of the application at [README.md](../../README.md),
this document is intended to define the access of each type of user to the applications
and its routes.

## Who should read?

This document's main objective is to make all users aware of it's level of access at certain points of the application.

## Roles and permissions

| Role | Action | Entity |
| --- | --- | --- |
| Admin | Create, Read, Delete, Update | Note |
| Admin | Create, Read, Delete, Update | User |
| User | Create Own, Read Any (public), Read Own, Delete Own, Update Own | Note |
| User | Create Own, Read Any (public), Read Own, Delete Own, Update Own | User |

## Critical Actions

In order to avoid human errors in critical administrative actions, a double verification of the user's objective will also be used through a password validation in these critical actions.
