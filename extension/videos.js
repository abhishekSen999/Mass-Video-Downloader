// export const VIDEO_ADDED_EVENT = 'video-added';
const state = {
    video_links: [],
    
    //listeners: {},
}

export default{



    addVideos(urls) {
        urls.forEach((url)=>{
            state.video_links.push(url);
        });
        // console.log("firing"); 
        // this.fire('videos-added');
    },

    isEmpty(){
        return state.video_links.length==0;
    },
    getVideoLink(){
        return state.video_links.pop();
    },

    // addEventListener(name, callback) {
    //     if (!state.listeners.hasOwnProperty(name)) {
    //         state.listeners[name] = []
    //     }

    //     state.listeners[name].push(callback) ;
    //     console.log("added listner   ");
    //     console.log(state.listeners);

    // },

    // fire(name) {
    //     console.log(state.listeners);
    //     console.log("firing - "+name);
    //     if (state.listeners.hasOwnProperty(name) ) {
    //         console.log("firing - "+name);
    //         state.listeners[name].forEach(callback => callback());
    //     }
    // },


}