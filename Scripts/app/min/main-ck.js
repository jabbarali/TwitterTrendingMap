function buildTweetWindow(e){var t=new Date(e.CreatedAt),o=t.getDate(),a=t.getMonth()+1,s=t.getFullYear(),n=t.toTimeString(),i=o+"/"+a+"/"+s,l='<div class="tweet">        <div class="header">        <div class="avatar"><a target="_blank" href="https://www.twitter.com/'+e.User+'"><img src="'+e.ImageUrl+'"/></a></div>        <div class="screen-name"><span class="handle">@'+e.User+'</span><span class="time-ago"><time class="timeago" datetime="'+e.CreatedAt+'">'+i+'</time></span></div>        </div>        <div class="body"><p>'+e.Text+'</p></div>        <div class="footer">'+i+" "+n+"</div>        </div>";return l}var map,mc,guids=[],counter=0,chat=$.connection.chatHub,twitterHub=$.connection.geoFeedHub,stylez=[{featureType:"water",stylers:[{saturation:43},{lightness:-11},{hue:"#0088ff"}]},{featureType:"road",elementType:"geometry.fill",stylers:[{hue:"#ff0000"},{saturation:-100},{lightness:99}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{color:"#808080"},{lightness:54}]},{featureType:"landscape.man_made",elementType:"geometry.fill",stylers:[{color:"#ece2d9"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#ccdca1"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#767676"}]},{featureType:"road",elementType:"labels.text.stroke",stylers:[{color:"#ffffff"}]},{featureType:"poi",stylers:[{visibility:"off"}]},{featureType:"landscape.natural",elementType:"geometry.fill",stylers:[{visibility:"on"},{color:"#b8cb93"}]},{featureType:"poi.park",stylers:[{visibility:"on"}]},{featureType:"poi.sports_complex",stylers:[{visibility:"on"}]},{featureType:"poi.medical",stylers:[{visibility:"on"}]},{featureType:"poi.business",stylers:[{visibility:"simplified"}]}],map_options={zoom:7,backgroundColor:"#A3A3A3",disableDoubleClickZoom:!0,center:new google.maps.LatLng(53,-.2),mapTypeID:google.maps.MapTypeId.HYBRID,keyboardShortcuts:!1,overviewMapControl:!1,mapTypeControlOptions:{mapTypeIds:[google.maps.MapTypeId.ROADMAP]},panControl:!1,scrollwheel:!1,streetViewControl:!1,styles:stylez},guid=function(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return function(){return e()+e()}}();$(function(){$("#autocomplete").geocomplete({map:"#map-canvas",mapOptions:map_options}).bind("geocode:result",function(t,o){e.setCenter(o.geometry.location),e.setZoom(10)});var e=$("#autocomplete").geocomplete("map");e.set("streetViewControl",!0),e.mapTypeControl=!1;var t={gridSize:100,batchSize:3e3,batchSizeIE:200,maxZoom:12,averageCenter:!1};google.maps.event.addListener(e,"dragend",function(t){var o=e.getBounds(),a=o.getSouthWest(),s=o.getNorthEast(),n=a.lat(),i=a.lng(),l=s.lat(),r=s.lng();twitterHub.server.changeStreamBounds({Latitude:n,Longitude:i}).done(function(){console.log("Invocation of NewContosoChatMessage succeeded")}).fail(function(e){console.log("Invocation of NewContosoChatMessage failed. Error: "+e)}),console.log("end")}),mc=new MarkerClusterer(e,[],t),chat.client.broadcastMessage=function(e,t){var o=$("<div />").text(e).html(),a=$("<div />").text(t).html();$("#discussion").append("<li><strong>"+o+"</strong>:&nbsp;&nbsp;"+a+"</li>")},$("#message").focus(),$.connection.hub.start().done(function(){$("#message").keyup(function(e){13==e.which&&(chat.server.send($("#displayname").val(),$("#message").val()),$("#message").val("").focus())})}),twitterHub.client.broadcastTweetMessage=function(t){counter++,$("#tweet-count").html(counter);var o=new google.maps.Marker({map:e,position:new google.maps.LatLng(t.Latitude,t.Longitude),title:t.Text+" by @"+t.User}),a=new google.maps.InfoWindow({content:buildTweetWindow(t)});$("time.timeago").timeago(),google.maps.event.addListener(o,"click",function(){e.panTo(o.getPosition()),a.open(e,o)}),mc.addMarker(o);var s=$("ul.live-tweets li").size(),n=10,i='<li class="tweet-item"><span class="tweet-avatar"><a target="_blank" href="https://www.twitter.com/'+t.User+'"><img src="'+t.ImageUrl+'"/></a></span><span class="tweet-content">'+t.Text+'</span><span class="tweet-author">@'+t.User+"</span></li>";n>s?$("ul.live-tweets").prepend(i):($("ul.live-tweets li:last-child").remove(),$("ul.live-tweets").prepend(i))},twitterHub.client.debug=function(e){console.log(e)},$.connection.hub.start().done(function(){$("#displayname").val("user"+guid())});var o=$.connection.trendsAnalysisHub;o.client.broadcastTrend=function(e){console.log(e)},o.client.broadcastLog=function(e){console.log(e)}});