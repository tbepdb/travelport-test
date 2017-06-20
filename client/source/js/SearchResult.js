'use strict';

/* global define*/

define('SearchResult', [
  'jquery',
  'objectPath',
  'moment',
  'log',
  'bootstrap'
], function ($, objectPath, moment) {
  return function (qDate, airlinesCount) {
    const that = this;
    let airlinesCounter = 0,
      searchProgress,
      searchResult,
      searchResultContent,
      searchResultTabs;

    that.appendDate = function (date) {
      if (searchResultTabs) {
        if (qDate === date) {
          $(`<li role="presentation" >
              <a href="#searchResult${date}" role="tab" data-toggle="tab">
                <strong>${date.format('LL')}</strong>
              </a>
            </li>`
          ).appendTo(searchResultTabs);
        } else {
          $(`<li role="presentation">
              <a href="#searchResult${date}" role="tab" data-toggle="tab">
                ${date.format('LL')}
              </a>
            </li>`
          ).appendTo(searchResultTabs);
        }
        $(`<div role="tabpanel" class="tab-pane"  id="searchResult${date}">
            <ul id="searchResultList${date}" class="list-group search-result-list">
              <li class="list-group-item">
                <div class="row">
                  <div class="col-md-3">
                    <center><strong>Airline</strong></center>
                  </div>
                  <div class="col-md-2">
                    <center><strong>Fl. Num.</strong></center>
                  </div>
                  <div class="col-md-2">
                    <center><strong>Departure</strong></center>
                  </div>
                  <div class="col-md-2">
                    <center><strong>Duration</strong></center>
                  </div>
                  <div class="col-md-2">
                    <center><strong>Arrival</strong></center>
                  </div>
                  <div class="col-md-1">
                    <center><strong>Price</strong></center>
                  </div>
                </div>
              </li>
            </ul>
          </div>`).appendTo(searchResultContent);
      }
    };

    that.appendFlight = function (date, flight) {
      const flightList = $(`#searchResultList${date}`);
      if (flightList) {
        $(`<li class="list-group-item">
            <div class="row">
              <div class="col-md-3">
                ${objectPath.get(flight, 'airline.name', '')}
              </div>
              <div class="col-md-2 text-center">
                ${objectPath.get(flight, 'flightNum', '')}
              </div>
              <div class="col-md-2 text-center">
                ${moment(objectPath.get(flight, 'start.dateTime', '')).format('h:mm')}
              </div>

              <div class="col-md-2 text-center">
                ${moment.duration(objectPath.get(flight, 'durationMin', ''), 'minutes').humanize()}
              </div>

              <div class="col-md-2 text-center">
                ${moment(objectPath.get(flight, 'finish.dateTime', '')).format('h:mm')}
              </div>
              <div class="col-md-1 text-right">
                ${objectPath.get(flight, 'price', '')}
              </div>
            </div>
          </li>`).appendTo(flightList);
      }
    };

    that.selectDate = function (date) {
      $(`#searchResult a[href="#searchResult${date}"]`).tab('show');
    };

    that.airlineDone = function () {
      airlinesCounter = airlinesCounter + 1;
      $('#searchProgressInd').attr('aria-valuenow', airlinesCounter);
      const percent = Math.ceil(100 * airlinesCounter / airlinesCount);
      $('#searchProgressInd').attr('style', `width: ${percent}%;`);
      if (airlinesCounter === airlinesCount) {
        const searchProgressContainer = $('#searchProgressContainer');
        searchProgress = $('#searchProgress');
        if (searchProgress) {
          searchProgress.remove();
        }
        searchProgress = $(`
          <div id="searchProgress" class="alert alert-info" role="alert">
            Search is done
          </div>`).appendTo(searchProgressContainer);
      }
    };

    searchProgress = $('#searchProgress');
    const searchProgressContainer = $('#searchProgressContainer');
    if (searchProgress) {
      searchProgress.remove();
    }
    if (searchProgressContainer) {
      searchProgress = $(`
        <div id="searchProgress" class="alert alert-info" role="alert">
          Search in progress
          <div class="progress">
            <div id="searchProgressInd" class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="${airlinesCount}" style="width: 0%;">
            </div>
          </div>
        </div>`).appendTo(searchProgressContainer);
    }

    searchResult = $('#searchResult');
    const searchResultContainer = $('#searchResultContainer');
    if (searchResult) {
      searchResult.remove();
    }
    if (searchResultContainer) {
      searchResult = $('<div id="searchResult"></div>').appendTo(searchResultContainer);
      searchResultTabs = $('<ul role="tablist" class="nav nav-tabs"></ul>').appendTo(searchResult);
      searchResultContent = $('<div class="tab-content"></div>').appendTo(searchResult);
      searchResult.tab();
    }
    return that;
  };
});
