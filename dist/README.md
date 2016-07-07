# Day 18 Assignment: To Do List Hosted on Server Using Ajax

## Sketches
1. For app sketch, see image ToDoListMockup.pdf in dist folder
2. Order sketch:
  1. first the page renders the app basic html outline
  2. then it gets (sends a get request) the current data
  3. once received, it renders the data
  4. then it listens to see if they want to add data
  5. if they want to add data, it sends a post request (and might display a loading screen until rerendering, if I wanted to get fancy)
  6. then it sends another get request to get the current data
  7. then it rerenders all the updated data (thus including ones added by third parties, for example)
  8. repeat ad nauseam
3. Data Sketch:
```
  data = [
  {
    toDoText: 'empty trash',
    toDoAdded: 'Jul 6, 2016, 12:25pm',
    toDoCompleted: false,
  },
  {
    toDoText: 'sketch data model',
    toDoAdded: 'Jul 6, 2016, 12:00pm',
    toDoCompleted: 'Jul 6, 2016, 12:25pm'
  },
  ]
```

## Build order (will likely follow order sketch, i.e. build first things first)
1. post initial data to server using postman, a chrome app (data copied from the above data sketch):  http://tiny-za-server.herokuapp.com/collections/jcsjday18todolist
2. initial file connections tested
3. build the basic html and a few minor JS/CSS things to get everything to fit (username prepended to header, jquery to make the sidebar the remaining window height)
4. set up/test initial ajax request
5. code the initial render function
6. get distracted trying to add timestamps, set that aside for later
7. get distracted trying to add a completed checkbox event listener, also put that aside
8. set up an event listener for the enter key to check if there's stuff in the new item box, then send that stuff to the server and rerender the page
9. write the rerender function clear out all content and to hook back into the initial render function (why write all that code twice?)
10. adjust the initial render function to ad an id class that means we can grab the individual piece we need
11. use that to write the delete function so that it could grab the individual  elements
12. realize I was adding the data in the DOM in a 'less than best practices' way, tried to get the `.data()` method to work but was less than successful

## Issues
1. I had a lot of fiddling necessary to get the delete function to grab the `<li>` using the `.target()` method, because the `.parent()` would work differently depending if you got right on the icon or just on the button (around the edge, outside the technical space of the icon). Eventually I just had to do an if else and throw in some extra variables to check which one it was grabbing
