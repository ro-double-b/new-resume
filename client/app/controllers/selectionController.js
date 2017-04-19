angular.module('fantasyDragRace')
.controller('SelectionController', function($scope, $window, $http, $rootScope, $modal) {
  $scope.queens = [
    { appID: 1,
      name: "neARby",
      photo: "neARby.jpg",
      photo2: "neARby2.jpg",
      description: "An augmented Reality iOS application which allows users to see nearby events and places",
      stack: "Tech Stack: React Native, Redux, three.js, Node.js, Express ",
      point1: "-  Constructed the entire modular backend that successfully routes request from the frontend, based on user’s location",
      point2: "−  Used Google Maps/Directions, Eventful and Flickr APIs to create a simplistic UI, aggregating relevant data",
      point3: "− Implemented an algorithm which calculated the position and distance so POIs were rendered correctly in AR view",
      point4: "−  Designed a database that expired or persisted user created places/events based on user input"
    },
    { appID: 2,
      name: "ReelTime",
      photo: "ReelTime.jpg",
      photo2: "ReelTime2.jpg",
      description: "Peer to peer video streaming service using WebRTC with video and text chats",
      stack: "Tech Stack: React, Node.js, Express, WebRTC, Socket.IO",
      point1: "−  Expand features from sending video via links to sending video/gif individual users through an online portal",
      point2: "− Implemented authentication for the application using bcrypt and express-session",
      point3: "− Introduced gif search functionality using the Giphy API, allowing users to send gif messages"

    },
    { appID: 3,
      name: "Vime",
      photo: "Vime.jpg",
      photo2: "Vime2.jpg",
      description: "A messaging platform where you can only send videos and gifs messages to friends",
      stack: "Tech Stack: React, React Router, Node.js, Express, PostgreSQL, WebGL" ,
      point1: "−  Created a peer-to-peer connection using PeerJS to transmit text and video files between two client browsers",
      point2: "− Designed a simplistic user interface easily allowing users to connect with each other and stream video by drag a file"
     },
    { appID: 4,
      name: "RuPaul Fantasy Drag Race",
      photo: "RuPaul3.jpg",
      photo2: "RuPaul2.jpg",
      description: "An interactive game where players earn points each week based on predictions of who will be eliminated",
      stack: "Tech Stack: AngularJS, Node.js, Express, PostgreSQL",
      point1: "−  Designed a database schema which records user votes and updates a player’s score each week",
      point2: "− Implemented a scoreboard, allowing users to see how they rank with their friends and other users"
    },

  ];
});
