<script setup>
// import HistoryEntry from './components/HistoryEntry.vue';
</script>

<template>
    <main>
      <h1>History</h1>
      <div id="history-log">
        <div class="hidden-div" id="history-container">
          <p>{</p>
          <div class="history-entry">
              <p class="history-chemical">Chemical: </p>
              <p class="history-location">Location: </p>
              <p class="history-amount">Amount used: </p>
              <p class="history-timestamp">Timestamp: </p>
              <p class="history-crop-count">Crops affected: </p>
              <p class="history-crop-type">Crop type: </p>
              <p class="history-image-link">Image link: </p>
          </div>
          <p>}</p>
      </div>
      <div class="hidden-div" id="bulk-history-container">
          <p>{</p>
          <div class="bulk-history-entry">
              <p class="history-chemical">Chemical: </p>
              <p class="history-times-run">Times run: </p>
              <p class="history-location">Location: </p>
              <p class="history-amount">Total amount used: </p>
              <p class="history-start-time">Start time: </p>
              <p class="history-end-time">End time: </p>
              <p class="history-crop-count">Crops affected: </p>
              <p class="history-crop-type">Crop type: </p>
              <p class="history-image-link">Image link: </p>
          </div>
          <p>}</p>
      </div>
      </div>
    </main>
  </template>

<script>
function addHistoryEntry(chemical, location, amount, cropCount, cropType, timestamp, imageLink){
  var log = document.getElementById("history-log");
  var cont = document.getElementById("history-container");
  const clone = cont.cloneNode(true);
  clone.classList.remove("hidden-div");
  clone.querySelector(".history-chemical").innerText = "Chemical: " + chemical;
  clone.querySelector(".history-location").innerText = "Location: " + location;
  clone.querySelector(".history-amount").innerText = "Amount used: " + amount;
  clone.querySelector(".history-crop-count").innerText = "Crops affected: " + cropCount;
  clone.querySelector(".history-crop-type").innerText = "Crop type: " + cropType;
  clone.querySelector(".history-timestamp").innerText = "Timestamp: " + timestamp;
  clone.querySelector(".history-image-link").innerText = "Image link: " + imageLink;
  log.appendChild(clone);
}

function addBulkHistoryEntry(chemical, location, amount, cropCount, cropType, timesRun, startTime, endTime, imageLink){
  var log = document.getElementById("history-log");
  var cont = document.getElementById("bulk-history-container");
  const clone = cont.cloneNode(true);
  clone.classList.remove("hidden-div");
  clone.querySelector(".history-chemical").innerText = "Chemical: " + chemical;
  clone.querySelector(".history-times-run").innerText = "Times run: " + timesRun;
  clone.querySelector(".history-location").innerText = "Location: " + location;
  clone.querySelector(".history-amount").innerText = "Total amount used: " + amount;
  clone.querySelector(".history-crop-count").innerText = "Crops affected: " + cropCount;
  clone.querySelector(".history-crop-type").innerText = "Crop type: " + cropType;
  clone.querySelector(".history-start-time").innerText = "Start time: " + startTime;
  clone.querySelector(".history-end-time").innerText = "Start time: " + endTime;
  clone.querySelector(".history-image-link").innerText = "Image link: " + imageLink;
  log.appendChild(clone);
}

export{
  addHistoryEntry, addBulkHistoryEntry
};
</script>