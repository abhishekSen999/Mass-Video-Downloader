var video_links=[];
// var other_links=[];
// var links=[];
var downloadCompleted=0;
function scrapeAndDownload(url,newDocument)//scrapes given  html document object for furthur links.
{
    //console.log("here7");
    var reference= newDocument.getElementsByTagName("a");
    for(let i=0;i<reference.length;i++){
        if(reference[i].href===url)reference.splice(i,1);
        if (reference[i].href.endsWith(".mkv")||reference[i].href.endsWith(".mp4"))
        {
            // console.log(reference[i].href);
            // console.log("here13");
            // downloadLink(reference[i].href);
            video_links.push(reference[i].href);
            
        }
    }
    
    let indexToDownload=0;
    if(isleftToDownload(indexToDownload))
    {
        downloadLink(indexToDownload);
    }
        
    document.getElementById("status").innerHTML="Finished Downloading "
}

function isleftToDownload(indexToDownload)
{
    if(indexToDownload<video_links.length)return true;
    return false;
}


function downloadLink(indexToDownload)
{
    let url=video_links[indexToDownload];
    console.log("downloading: "+url);
    //downloadCompleted=0;
    document.getElementById("status").innerHTML="Downloading fuck";
    //document.getElementById('my_iframe').src=url;
    var downloading=chrome.downloads.download({url},);
    chrome.downloads.onChanged.addListener(function(downloadDelta){
        if (downloadDelta.state && downloadDelta.state.current === "complete") {
            if(isleftToDownload(indexToDownload+1))
            {
                downloadLink(indexToDownload+1);
            }
          }

    });
    // let file=
    // let stream = IO.newOutputStream(file, "binary");
}




// console.log("here");
// document.getElementById("download").onclick="download()";     
$(document).ready(function(){
    $("#download").click(function(){
        let url=getArchiveLink();
        retrieveAndDownloadVideos(url);
    });
  });


function getArchiveLink()
{
    //var url="https://www.google.com"//'dl.upfdl.com/files/Series/Person%20of%20Interest/S01/480p/';
    var url=document.getElementById("archive_link").value;
    return url;

}

function retrieveAndDownloadVideos(url){

    let xhr=new XMLHttpRequest;
    
//   console.log("unsent: "+xhr.status);
    xhr.open('GET',url);
    xhr.responseType="document";
//   console.log(url+"  opened: "+xhr.status);
    xhr.onprogress=function(event){
    document.getElementById("status").style.display="inline";
    
    document.getElementById("status").innerHTML="Downloading";
    //   console.log("loading: "+xhr.status);
    console.log("loaded- "+event.loaded);
    console.log("contentLength- "+event.total);
    };
    
    xhr.onload=function(){
        document.getElementById("status").innerHTML="Downloading Complete";
        console.log("done"+xhr.status);
        let newDocument=xhr.response;
        scrapeAndDownload(url,newDocument);
    //document.getElementById("content").innerHTML=xhr.response;
    //document.getElementById("content").style.display="inline";
    };
    xhr.send();
   
}  