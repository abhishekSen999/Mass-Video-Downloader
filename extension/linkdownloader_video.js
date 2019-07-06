function download()
{
    
    let archive_url=document.getElementById("archive_link").value;
    //archive_url=archive_url.toString().trim();
    downloadLink(archive_url);
    console.log("started- "+archive_url);
    
    console.log("started- "+archive_url);
}
function downloadLink(url)
{
    document.getElementById('my_iframe').src=url;
}




console.log("here");
// document.getElementById("download").onclick="download()";     
$(document).ready(function(){
    $("#download").click(function(){
        download();
    });
  });