# Simple files activity dashboard using node.js

Track files activities and display their history in a web dashboard. This is still experimental and a work in progress at the moment because fs.watch is still marked as unstable and so I have to use Chokidar which is an awesome wrapper for fs.watch.

![Screenshot]
(https://raw.githubusercontent.com/mgalang/node-fsdash/master/screen.png)

## Getting Started
    $ npm install

#####Dependencies:

- [Express](http://expressjs.com/)
- [Ejs](https://github.com/visionmedia/ejs)
- [Chokidar](https://github.com/paulmillr/chokidar)
- [Redis](http://redis.io/)
- [Node redis](https://github.com/mranney/node_redis)
- [Moment](https://github.com/moment/moment/)
- [Forever](https://github.com/nodejitsu/forever)
- [Socket.io](https://github.com/Automattic/socket.io)

## Usage

#####Configure
Edit config.js to specify the directories that you want to track.

#####Starting

    $ npm start


#####Stopping
    
    $ npm stop

Default dashboard url is http://localhost:3000

## Testing

    $ npm test

## TODO
- Optimization
- Graph (maybe)

## License

The MIT License (MIT)

Copyright (c) 2014 Marc Galang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
