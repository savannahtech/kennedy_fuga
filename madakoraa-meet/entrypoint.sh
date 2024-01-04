#!/bin/bash

# Start Gunicorn 
npm start

# Start Nginx
nginx -g 'daemon off;'