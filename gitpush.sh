#!/bin/bash
git add .
echo input message:
read mess
git commit -m "$mess"
git push

