import requests
from bs4 import BeautifulSoup
# archive_url="http://dl.upfdl.com/files/Series/Person%20of%20Interest/S01/"#"http://dl.upfdl.com/files/Series/Person%20of%20Interest/S01/480p/"#"http://dl.upfdl.com/files/Series/Person%20of%20Interest/S01/720p%20x265/"
def get_video_links(url):
    r=requests.get(url)
    soup= BeautifulSoup(r.content,"html.parser")

    links=soup.findAll('a')
    # print(links)
    video_links = [url + link.get('href') for link in links if link.get('href').endswith('mkv')]
    video_links= video_links+[url + link.get('href') for link in links if link.get('href').endswith('mp4')]
    # for link in video_links:
    #     print(link)

    other_links=[]
    other_links = [url + link.get('href') for link in links if (not link.get('href').endswith('mkv') and not link.get('href').endswith('mp4') and not link.get('href').endswith('../') )]
    # print(other_links)
    for otherlink in  other_links:
        print("----------------",otherlink,"---------------------")
        for link in video_links:
            print(link)

        print("==")
        video_links=video_links+get_video_links(otherlink)
        

    return video_links

def download_video_series(video_links): 
    for link in video_links: 
        file_name = link.split('/')[-1]
        print ("Downloading file:%s",file_name)
        r = requests.get(link, stream = True)

        with open(file_name, 'wb') as f: 
            for chunk in r.iter_content(chunk_size = 1024*1024): 
                if chunk: 
                    f.write(chunk) 
        print ("%s downloaded!\n"%file_name)
    
    print ("All videos downloaded!")
    return
def download():
    archive_url=document.getElementById("archive_link").innerHTML
    # getting all video links 
    video_links = get_video_links(archive_url) 
  
    # download all videos 
    download_video_series(video_links)   

document.getElementById("download").addEventListener("click", download())     



    