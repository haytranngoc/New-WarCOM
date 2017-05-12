#!/bin/bash

git add -A
git commit -m "DEPLOY HEROKU"
git push origin master
git push heroku master
