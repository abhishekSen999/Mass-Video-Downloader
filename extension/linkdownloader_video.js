function download()
{
    
    let archive_url=document.getElementById("archive_link").value;
    //archive_url=archive_url.toString().trim();
    console.log("started- "+archive_url);
    document.getElementById('my_iframe').src=archive_url;
}
console.log("here");
//document.getElementById("download").onclick()     

