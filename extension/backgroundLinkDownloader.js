var currentId;
//var currentItem=null;
var video_links=[];
var indexToDownload;
// chrome.runtime.onInstalled.addListener(function() {
//     chrome.contextMenus.create({
//       "id": "sampleContextMenu",
//       "title": "Sample Context Menu",
//       "contexts": ["selection"]
//     });
//   });

function isleftToDownload(indexToDownload_local)
{
    if(indexToDownload_local<this.video_links.length)return true;
    return false;
}


function downloadLink(indexToDownload_local)
{
    this.indexToDownload=indexToDownload_local;
   // var backgroungPage = chrome.extension.getBackgroundPage();
    let url=this.video_links[this.indexToDownload];
    console.log("downloading: "+url);
    //downloadCompleted=0;
    document.getElementById("status").innerHTML="Downloading";
    //document.getElementById('my_iframe').src=url;
    var downloading=chrome.downloads.download({url},function(downloadId){this.currentId=downloadId});

    chrome.extension.getBackgroundPage().console.log("here before");

}    




chrome.downloads.onChanged.addListener(function(downloadDelta){
    chrome.extension.getBackgroundPage().console.log("delta0-"+downloadDelta[0]+"   delta1-"+downloadDelta[1]);
    //chrome.extension.getBackgroundPage().console.log("state-"+chrome.downloads.State);
    chrome.extension.getBackgroundPage().console.log("currentID-"+downloadDelta.id);
    chrome.downloads.search({id:downloadDelta.id},function(items){
        let currentItem=items[0];
        chrome.extension.getBackgroundPage().console.log("downloading-"+currentItem.url);
        chrome.extension.getBackgroundPage().console.log("downloading-"+currentItem.state+"     video_links.length="+this.video_links.length+"    indextodownload="+this.indexToDownload);
        
        if(currentItem.state=='complete'){

            chrome.extension.getBackgroundPage().console.log("satisfied complete status check -indextodownload="+this.indexToDownload);
            if(isleftToDownload(indexToDownload+1))
            {
                chrome.extension.getBackgroundPage().console.log("satisfied complete is left check");
                downloadLink(this.indexToDownload+1);
            }
        }
        
    }.bind(this));




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



