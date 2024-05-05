#!/bin/bash

mongoimport --host localhost --db bookLibraryTool --collection books --type json --file /docker-entrypoint-initdb.d/bookLibraryTool.books.json --jsonArray
