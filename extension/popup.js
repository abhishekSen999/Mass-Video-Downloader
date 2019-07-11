import videos from './videos.js';

$(document).ready(function(){


    $("#download").click(function(event){
        event.target.disabled=true;
        //worker.postMessage('from main: download started')
        let url=getArchiveLink();
        chrome.runtime.sendMessage({link:url},function(response){});



        // retrieveDocument(url)
        // .then( (doc) => {
        //     videos.addVideos(scrape(doc,url)) 
        // })
        // .catch(err=>console.log(err));
    });
});





function getArchiveLink()
{
    //var url="https://www.google.com"//'dl.upfdl.com/files/Series/Person%20of%20Interest/S01/480p/';
    var url=document.getElementById("archive_link").value;

    return url;

}
