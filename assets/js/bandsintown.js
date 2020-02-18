$.ajax('https://rest.bandsintown.com/artists/Moody Moose/events', {
  data: {
    api_version: '2.0',
    //date: '2014-01-01,2016-12-31',
    app_id: 'codingbootcamp'
  },
  dataType: 'jsonp',
  jsonpCallback: 'createPastConcertsList',
  crossDomain: true
})

window.createPastConcertsList = function (res) {
  console.log(res)
  $('body').append(res)
  var concerts = res.sort(function (a, b) {
    return new Date(b.datetime) - new Date(a.datetime)
  })
  console.log(concerts)
  var $container = $('.concerts-list')

 // $('<h4 class="title">All Shows</h4>').appendTo($container)
  var $table = $('<table class="list" />')
  $table.append('<tr class="concerts-list"><th></th><th>Date</th><th>Venue</th><th>Location</th><th>Tickets</th></tr>')

  $.each(concerts, function (index, concert) {
    var date = concert.datetime.match(/(\d\d\d\d)-(\d\d)-(\d\d)/)
    var dateString = date[3] + '/' + date[2] + '/' + date[1]
    var url = $("<a>").attr({href: concert.url, class: "icon solid fa-ticket-alt" })
    var $tr = $('<tr class="concerts-list" />')
    $tr.append($('<td class="spacer" />'))
    $tr.append($('<td class="date" />').text(dateString))
    $tr.append($('<td class="venue" />').text(concert.venue.name))
    $tr.append($('<td class="location" />').text(concert.venue.city + ', ' + concert.venue.country))
    $tr.append($('<td class="tickets" />').append(url))
    $table.append($tr)
  })

  // console.log(concerts)
  $container.append($table)
}
