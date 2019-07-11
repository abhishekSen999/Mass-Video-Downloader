import videos from './videos.js';
//console.log("registering event");
//videos.addEventListener('videos-added',start_download);



chrome.downloads.onChanged.addListener(function(downloadDelta){
    //chrome.extension.getBackgroundPage().console.log("delta0-"+downloadDelta[0]+"   delta1-"+downloadDelta[1]);
    //chrome.extension.getBackgroundPage().console.log("state-"+chrome.downloads.State);
    chrome.extension.getBackgroundPage().console.log("currentID-"+downloadDelta.id);
    chrome.downloads.search({id:downloadDelta.id},function(items){
        let currentItem=items[0];
        chrome.extension.getBackgroundPage().console.log("downloading-"+currentItem.url);
        chrome.extension.getBackgroundPage().console.log("downloading-"+currentItem.state);
        
        if(currentItem.state=='complete'){

            chrome.extension.getBackgroundPage().console.log("satisfied complete status check");
            if(!videos.isEmpty())
            {
                chrome.extension.getBackgroundPage().console.log("satisfied complete is left check");
                download();
            }
        }
        
    });
});

chrome.runtime.onMessage.addListener(
    function(recievedMessage) {
    //   console.log(sender.tab ?
    //               "from a content script:" + sender.tab.url :
    //               "from the extension");

        let url=recievedMessage.link;
        
        retrieveDocument(url)
        .then( (doc) => {
            videos.addVideos(scrape(doc,url) );
            start_download();
        })
        .catch(err=>console.log(err));    

    //   if (request.greeting == "hello")
    //     sendResponse({farewell: "goodbye"});
});

function scrape(newDocument,url)//scrapes given  html document object for furthur links.
{
    let links=[];
    //console.log("here7");
    var reference= newDocument.getElementsByTagName("a");
    for(let i=0;i<reference.length;i++){
        if(reference[i].href===url)reference.splice(i,1);
       // if (reference[i].href.endsWith(".mkv")||reference[i].href.endsWith(".mp4"))
        if(reference[i].href.match(/\.(mp4|mkv|avi|mpg)$/))
        {
            links.push(reference[i].href);
            
        }
    }
    
    return links;
}


function retrieveDocument(url){
    return new Promise((resolve, reject) => {

        let xhr=new XMLHttpRequest;
        
    //   console.log("unsent: "+xhr.status);
        xhr.open('GET',url);
        xhr.responseType="document";
    //   console.log(url+"  opened: "+xhr.status);
        xhr.onprogress=function(event){
            //document.getElementById("status").style.display="inline";
        
            //document.getElementById("status").innerHTML="Downloading";
            //   console.log("loading: "+xhr.status);
        console.log("loaded- "+event.loaded);
        console.log("contentLength- "+event.total);
        };
        
        xhr.onload=function(){
            //document.getElementById("status").innerHTML="Downloading Complete";
            console.log("done"+xhr.status);
            let newDocument=xhr.response;
            resolve(newDocument);
        //document.getElementById("content").innerHTML=xhr.response;
        //document.getElementById("content").style.display="inline";
        };
        xhr.send();
    });
   
}  












function start_download(){download();}

function download(){
    

     let url=videos.getVideoLink();
     console.log("downloading: "+url);
     //downloadCompleted=0;
     //document.getElementById("status").innerHTML="Downloading";
     //document.getElementById('my_iframe').src=url;
     var downloading=chrome.downloads.download({url},function(downloadId){});
 
     chrome.extension.getBackgroundPage().console.log("here before");
 
}