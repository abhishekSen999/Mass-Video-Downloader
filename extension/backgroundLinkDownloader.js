var currentId=0;
var currentItem=null
function isleftToDownload(indexToDownload)
{
    if(indexToDownload<video_links.length)return true;
    return false;
}


function downloadLink(indexToDownload)
{
   // var backgroungPage = chrome.extension.getBackgroundPage();
    let url=video_links[indexToDownload];
    console.log("downloading: "+url);
    //downloadCompleted=0;
    document.getElementById("status").innerHTML="Downloading";
    //document.getElementById('my_iframe').src=url;
    var downloading=chrome.downloads.download({url},function(downloadId){currentId=downloadId});

    chrome.extension.getBackgroundPage().console.log("here before");

    




    chrome.downloads.onChanged.addListener(function(downloadDelta){
        chrome.extension.getBackgroundPage().console.log("delta-"+downloadDelta);
        chrome.extension.getBackgroundPage().console.log("delta state-"+downloadDelta.state);
        chrome.extension.getBackgroundPage().console.log("state-"+chrome.downloads.State);
        chrome.extension.getBackgroundPage().console.log("currentID-"+currentId);
        chrome.downloads.search({id:currentId},function(items){
           currentItem=items[0];
           chrome.extension.getBackgroundPage().console.log("downloading-"+currentItem.url);
           chrome.extension.getBackgroundPage().console.log("downloading-"+currentItem.state);
           
           if(currentItem.state=='complete'){
                if(isleftToDownload(indexToDownload+1))
                {
                    downloadLink(indexToDownload+1);
                }
            }
           
        });




        //console.log(".current"+downloadDelta.state.current);
        // if (downloadDelta.state && downloadDelta.state.current === "complete") {
        //     if(isleftToDownload(indexToDownload+1))
        //     {
        //         downloadLink(indexToDownload+1);
        //     }
        //   }

    });




    // chrome.downloads.search({id:currentId},function(items){
    //     currentItem=items[0];
    //     chrome.extension.getBackgroundPage().console.log("downloading-"+currentItem.url);
    //     chrome.extension.getBackgroundPage().console.log("downloading-"+currentItem.state);
    // });



}