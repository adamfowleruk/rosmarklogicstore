
## Provides a test service and client using roslibjs via Node.js

To execute these, first use the createdb.sh file on the MarkLogic machine to create a MarkLogic database and REST server.

Now run Node.js for the service, then for the test client. If all is well two documents will appear in the MarkLogic database.

node marklogicstoreservice.js

In a separate terminal:-

node testmlstore.js

Any questions, please email adam dot fowler at gmail dot com
