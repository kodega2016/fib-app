Here the application has mainly three main components:
a) server
b) worker
c) client
d) nginx

The server is a simple node js server which listens on port 8080 and handles the incoming requests. and publishes the message to the worker.

The worker is a simple node js worker which listens to the messages from the server and processes the message and performs the required operation.

The client is a simple react application which renders the UI and sends the request to the server.

- we need to create a security group for postgres,redis and server(elastic beanstalk) and allow the incoming traffic from the client security group.
