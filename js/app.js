/* eslint-disable no-empty */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

// creating variables ..

var allProduct = [];
var totalClicks = 0;

var resultsList = document.getElementById('finalResult');
var leftSideImageElement = document.getElementById('leftImgTag');
var middleSideImageElement = document.getElementById('middleImgTag');
var rightSideImageElement = document.getElementById('rightImgTag');
var imagesSection = document.getElementById('productItem');

var currentLeftSideImage;
var currentMiddleSideImage;
var currentRightSideImage;

var lablesName = [];
var lableVotes = [];
var lableDisply = [];
var arrTest = [-1, -1, -1];

// constructor
function ProductImg(productName, link) {
  this.productName = productName;
  this.link = link;
  this.views = 0;
  this.clicks = 0;
  allProduct.push(this);

}
if (localStorage.getItem('someVotes')) {
  allProduct = JSON.parse(localStorage.getItem('someVotes'));
} else {

  //creating objects
  new ProductImg('bag', 'image/bag.jpg');
  new ProductImg('banana', 'image/banana.jpg');
  new ProductImg('bathroom', 'image/bathroom.jpg');
  new ProductImg('boots', 'image/boots.jpg');
  new ProductImg('breakfast', 'image/breakfast.jpg');
  new ProductImg('bubblegum', 'image/bubblegum.jpg');
  new ProductImg('chair', 'image/chair.jpg');
  new ProductImg('cthulhu', 'image/cthulhu.jpg');
  new ProductImg('dog-duck', 'image/dog-duck.jpg');
  new ProductImg('dragon', 'image/dragon.jpg');
  new ProductImg('pen', 'image/pen.jpg');
  new ProductImg('pet-sweep', 'image/pet-sweep.jpg');
  new ProductImg('scissors', 'image/scissors.jpg');
  new ProductImg('shark', 'image/shark.jpg');
  new ProductImg('sweep', 'image/sweep.png');
  new ProductImg('tauntaun', 'image/tauntaun.jpg');
  new ProductImg('unicorn', 'image/unicorn.jpg');
  new ProductImg('usb', 'image/usb.gif');
  new ProductImg('water-can', 'image/water-can.jpg');
  new ProductImg('wine-glass', 'image/wine-glass.jpg');
}
// Function to display Random Images ..

var leftImageIndex, middleImageIndex, rightImageIndex;
function displayRandomImages() {
  do {
    leftImageIndex = Math.floor(Math.random() * allProduct.length);
  } while (leftImageIndex === arrTest[0] || leftImageIndex === arrTest[1] || leftImageIndex === arrTest[2]);
  do {
    middleImageIndex = Math.floor(Math.random() * allProduct.length);
  } while (leftImageIndex === middleImageIndex || middleImageIndex === arrTest[0] || middleImageIndex === arrTest[1] || middleImageIndex === arrTest[2]);
  do {
    rightImageIndex = Math.floor(Math.random() * allProduct.length);
  } while (rightImageIndex === leftImageIndex || rightImageIndex === middleImageIndex || rightImageIndex === arrTest[0] || rightImageIndex === arrTest[1] || rightImageIndex === arrTest[2]);
  arrTest = [];
  arrTest.push(leftImageIndex);
  arrTest.push(rightImageIndex);
  arrTest.push(middleImageIndex);
  displayImages(leftImageIndex, middleImageIndex, rightImageIndex);
}

// function to display images ..

function displayImages(leftIndex, middleIndex, rightIndex) {
  currentLeftSideImage = allProduct[leftIndex];
  currentMiddleSideImage = allProduct[middleIndex];
  currentRightSideImage = allProduct[rightIndex];
  currentLeftSideImage.clicks++;
  currentMiddleSideImage.clicks++;
  currentRightSideImage.clicks++;

  leftSideImageElement.setAttribute('src', currentLeftSideImage.link);
  middleSideImageElement.setAttribute('src', currentMiddleSideImage.link);
  rightSideImageElement.setAttribute('src', currentRightSideImage.link);
}

displayRandomImages();

// add Event listener to count 25 rounds ..

imagesSection.addEventListener('click', handleVote);

function handleVote(event) {
  var clickedImage;

  if (event.target.id === 'leftImgTag') {
    clickedImage = currentLeftSideImage;

  } else if (event.target.id === 'rightImgTag') {
    clickedImage = currentRightSideImage;

  } else if (event.target.id === 'middleImgTag') {
    clickedImage = currentMiddleSideImage;

  }


  // caluclate total clicks ..
  if (clickedImage) {
    clickedImage.views++;
    displayRandomImages();
    totalClicks++;
  }

  if (totalClicks >= 25) {
    imagesSection.removeEventListener('click', handleVote);
    for (var i = 0; i < allProduct.length; i++) {
      lablesName[i] = allProduct[i].productName;
      lableVotes[i] = allProduct[i].views;
      lableDisply[i] = allProduct[i].clicks;
      console.log(allProduct[i]);
    }

    displayResults();
    thechart();

    localStorage.setItem('someVotes', JSON.stringify(allProduct));



  }
}

//Display the list of all the products followed by the votes received and number of times seen for each

function displayResults() {
  var listItem;
  for (var i = 0; i < allProduct.length; i++) {
    listItem = document.createElement('li');
    listItem.textContent = allProduct[i].productName + ' Slicer had ' + allProduct[i].views + ' votes and was shown ' + allProduct[i].clicks + ' times ';
    resultsList.appendChild(listItem);
  }
}

function thechart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: lablesName,
      datasets: [{
        label: 'Votes',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: lableVotes,
      },
      {
        label: 'Number Of Disply',
        backgroundColor: 'rgb(252, 186, 3)',
        borderColor: 'rgb(252, 186, 3)',
        data: lableDisply,
      }
      ]
    },

    // Configuration options go he
    options: {}
  });
}

// localStorage.setItem('someVotes', JSON.stringify(lableVotes.views));
// console.log(localStorage);


