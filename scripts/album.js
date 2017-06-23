var setSong = function(songNumber) {
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber -1];
};

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number='"]');  
};

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
    var $row = $(template);
 var clickHandler = function () {
         
 var clickHandler = function() {

    var songNumber = parseInt($(this).attr('data-song-number'));

    if (currentlyPlayingSongNumber !== null) {
         // Revert to song number for currently playing song because user started playing new song.
+             var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNUmber);
+             currentlyPlayingCell.html(currentlyPlayingSongNumber);
     }

+    if (currentlyPlayingSongNumber !== songNumber) {
         // Switch from Play -> Pause button to indicate new song is playing.
         $(this).html(pauseButtonTemplate);
+        setSong(songNumber);
+        currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
         updatePlayerBarSong();
+    } else if (currentlyPlayingSongNumber === songNumber) {
         // Switch from Pause -> Play button to pause currently playing song.
         $(this).html(playButtonTemplate);
         $('.main-controls .play-pause').html(playerBarPlayButton);
+        currentlyPlayingSongNumber = null;
+        currentSongFromAlbum = null;
     }

 };

 var onHover = function(event) {
     var songNumberCell = $(this).find('.song-item-number');
     var songNumber = parseInt($(this).attr('data-song-number'));

+    if (songNumber !== currentlyPlayingSongNumber) {
         songNumberCell.html(playButtonTemplate);
     }
    
 };

 var offHover = function(event) {
     var songNumberCell = $(this).find('.song-item-number');
     var songNumber = parseInt($(this).attr('data-song-number'));

+    if (songNumber !== currentlyPlayingSongNumber) {
        songNumberCell.html(songNumber);
     }
     console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
 };
     // #1
     $row.find('.song-item-number').click(clickHandler);
     // #2
     $row.hover(onHover, offHover);
     // #3
     return $row;  
 };

var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 
var setCurrentAlbum = function(album) {
     currentAlbum = album;
     var $albumTitle = $('album-view-title');
    
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
    var body = "";
     for (var i = 0; i < album.songs.length; i++) {
         body += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
    albumSongList.innerHTML = body;
 };
     
var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };
var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
}; 
 
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
     
 // Store state of playing songs
 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null;
 var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');

$(document).ready(function() {
     setCurrentAlbum(albumPicasso);    
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
});
    
  //is this insereted at the correct Location?//   
var findParentByClassName = function(element, targetClass) {
    if (element) {
        var currentParent = element.parentElement;
        while (currentParent.className !== targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
};
var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};
    
var nextSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();

    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};
    
var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};
    
 var clickHandler = function(targetElement) {
 
    var songItem = getSongItem(targetElement);  
         
         if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
         } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
                    songItem.innerHTML = playButtonTemplate;
                    currentlyPlayingSong = null;
         } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
            var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
                currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
                songItem.innerHTML = pauseButtonTemplate;
                currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }
 };
    
    
$(document).ready(function() {
    setCurrentAlbum)albumPicasso);
}
      
     for (var i = 0; i < songRows.length; i++) {
         
         songRows[i].addEventListener('click', function(event) {
              clickHandler(event.target);
         });
     }
         
});

     
var album = [albumPicasso, albumMarconi, albumBlackLab];
var index = 1;
     albumImage.addEventListener("click", function(event)  {
        setCurrentAlbum(album); 
        index++;
        if (index == album.length) {
            index = 0;
        }
     });
};
