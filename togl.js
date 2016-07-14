var togglApiKey = '';
Handlebars.registerHelper("div", function(lvalue, rvalue) {
    return parseFloat(lvalue) / parseFloat(rvalue);
});

function generateReport() {
  togglApiKey = $('#apiKey').val();
  Cookies.set('toggleApiKey', togglApiKey);
  $('#loader').show();
  $('#out').hide();
  $('#form').hide();
  var projectsById = {};
  findWorkspaces()
    .then(function(workspaces) {
      var workspaceIds = _.map(workspaces, 'id');
      var projectRequests = $.when.apply($, _.map(workspaceIds, findProject));
      var entriesRequest = findEntriesFromRange();
      return $.when(projectRequests, entriesRequest)
    })
    .then(function(projects, entries) {
      var projectsById = _.keyBy(_.flatten(projects[0]), 'id');
      return assignProjectToEntries(projectsById, entries[0]);
    })
    .then(generateHtml)
    .then(function() {
      $('#loader').hide();
      $('#out').show();
      $('#form').show();
    });
}

function assignProjectToEntries(projectsById, entries) {
  return _.map(entries, function(entry) {
    return _.assign(entry, {project: projectsById[entry.pid]});
  });
}

function generateHtml(entries) {
  var headerTemplate = Handlebars.compile('<h2>Work log from {{startDate}} to {{endDate}}</h3><hr>');
  var projectSumTemplate = Handlebars.compile($('#projectSum').html());
  var daySummaryTemplate = Handlebars.compile('{{date}}:<br>{{{dayDetails}}}');
  var dayDetailsTemplate = Handlebars.compile('&nbsp;&nbsp;&nbsp;&nbsp; {{description}} - {{div duration 3600}}');

  var durations = calcuateProjectsDuration(entries);
  var activitiesByDay = groupActivitiesByDay(entries);

  var templateContexts = _.reduce(durations, function(result, totalProjectDuration, projectName) {
    var details = _.map(activitiesByDay[projectName], function(entries, date) {
      return daySummaryTemplate({
        date: date,
        dayDetails: _.map(entries, dayDetailsTemplate).join('<br>')
      });
    }).join('<br><br>');

    return _.concat(result, {
      projectName: projectName,
      durationTotal: totalProjectDuration,
      durationDetails: details
    });
  }, []);

  $('#out').html(
    headerTemplate({
      startDate: $('#startDate').val(),
      endDate: $('#endDate').val(),
    }) +
    _.map(templateContexts, projectSumTemplate).join('\n'));
}

function groupActivitiesByDay(entries) {
  return _.reduce(entries, function(result, entry) {
    var entryDate = moment(entry.start).format('DD-MM-YYYY');
    var projectName = entry.project.name;

    var projectDays = _.get(result, projectName, {});
    var projectEntries = _.get(projectDays, entryDate, []);

    projectDays[entryDate] = _.concat(projectEntries, entry);
    result[projectName] = projectDays;

    return result;
  }, {});
}

function calcuateProjectsDuration(entries) {
  var projectsDuration = {};
  return _.chain(entries)
    .reduce(function(result, entry) {
      var projectName = entry.project.name;
      var oldValue = _.get(result, projectName, 0);
      return _.set(result, projectName, oldValue + entry.duration);
    }, {})
    .reduce(function(result, durationSeconds, projectName) {
      result[projectName] = durationSeconds/3600;
      return result;
    }, {})
    .value();
}

function findWorkspaces() {
  return $.ajax(togglRequestOptions('/workspaces'));
}

function findProject(workspaceId) {
  return $.ajax(togglRequestOptions('/workspaces/' + workspaceId + '/projects'));
}

function findEntriesFromRange() {
  function encodeDate(date) {
    return encodeURIComponent(date.format("YYYY-MM-DDTHH:mm:ssZ"))
  }
  return $.ajax(togglRequestOptions('/time_entries?start_date=' + encodeDate(getDate('#startDate')) + "&end_date=" + encodeDate(getDate('#endDate'))));
}

function togglRequestOptions(path) {
  return {
    url: 'http://localhost:' + location.port + '/api/v8' + path,
    headers: {Authorization: 'Basic ' + btoa(togglApiKey + ':api_token')},
    dataType: 'json'
  };
};

function getDate(inputId, tillDayEnd) {
  var selectedDate = moment($(inputId).val(), 'DD-MM-YYYY');
  return tillDayEnd ? selectedDate.add(1, 'd').add(-1, 's') : selectedDate;
}
