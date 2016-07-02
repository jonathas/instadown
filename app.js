"use strict";

var buttonImage = "https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519672-178_Download-128.png";
let context = null;

class ProfilePageDownloader {

    constructor() {
        this.mediaLinksList = document.getElementsByClassName('_8mlbc');

        this.setDownloadLink();
        if(!context) {
            context = this;
        }

        //Attach listeners
        document.getElementsByClassName("coreSpriteLeftPaginationArrow")[0].addEventListener("click",
            function(e) {
                context.setDownloadLink(e.target);
            }
        );
        document.getElementsByClassName("coreSpriteRightPaginationArrow")[0].addEventListener("click",
            function(e) {
                context.setDownloadLink(e.target);
            }
        );
    }

    setDownloadLink(e) {
        var mediaCodeUrl = this.setMediaCodeUrl(e);
        var mediaCode = "";
        var mediaLink = "";

        for(var i = 0; i < this.mediaLinksList.length;i++) {
            mediaCode = this.mediaLinksList[i].getAttribute("href").split("/")[2];

            if(mediaCode == mediaCodeUrl) {
                mediaLink = this.mediaLinksList[i].getElementsByClassName('_icyx7')[0].getAttribute('src');
                break;
            }
        }

        this.setDownloadButton(mediaLink);
    }

    setMediaCodeUrl(e) {
        //Had to get the link from the arrow because the new download link was being set before the URL would change
        if(e == undefined) {
            return window.location.href.toString().split(window.location.host)[1].split("/")[2];
        } else {
            //Here we set the right download link if it's not coming from a click event (first time)
            return e.getAttribute('href').split("/")[2];
        }
    }

    setDownloadButton(mediaLink) {
        if (document.getElementsByClassName('download-media').length > 0) {
          document.getElementsByClassName('download-media')[0].href = mediaLink;
        } else {
            document.getElementsByClassName('_s6yvg')[0].innerHTML = document.getElementsByClassName('_s6yvg')[0].innerHTML + '&nbsp;&nbsp;<a class="download-media" href="' + mediaLink + '" download="instagram.jpg"><img src="' + buttonImage + '" width="20"></a>';
        }
    }
}

class PhotoPageDownloader {
    constructor() {
        this.setDownloadLink();
    }

    setDownloadLink() {
        this.setDownloadButton(document.getElementsByClassName('_icyx7')[0].getAttribute('src'));
    }

    setDownloadButton(mediaLink) {
        if (document.getElementsByClassName('download-media').length > 0) {
          document.getElementsByClassName('download-media')[0].href = mediaLink;
        } else {
            document.getElementsByClassName('_s6yvg')[0].innerHTML = document.getElementsByClassName('_s6yvg')[0].innerHTML + '&nbsp;&nbsp;<a class="download-media" href="' + mediaLink + '" download="instagram.jpg"><img src="' + buttonImage + '" width="20"></a>';
        }
    }
}

class TimelineDownloader {

}

var url = window.location.href.toString();

//Check if it is a photo opened in the profile page
if(url.indexOf("?taken-by=") > -1) {
    var profile = new ProfilePageDownloader();
} else if (url.indexOf("/p/") > -1) {
    console.log("Photo page");
    var photoPage = new PhotoPageDownloader();
} else {
    console.log("Timeline");
    var timeline = new TimelineDownloader();
}
