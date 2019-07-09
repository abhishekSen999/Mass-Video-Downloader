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
        
    //document.getElementById("status").innerHTML="Finished Downloading "
}

    // let file=
    // let stream = IO.newOutputStream(file, "binary");




worker = new Worker('worker.js');

// console.log("here");
// document.getElementById("download").onclick="download()";     
$(document).ready(function(){
    $("#download").click(function(){
        //worker.postMessage('from main: download started')
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