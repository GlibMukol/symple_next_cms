const paths = {
    homePath(){
        return '/'
    },
    topicPath(topicSlug: string){
        return `/topics/${topicSlug}`;
    },
    postCreatePAth(topicSlug: string){
        return `topics/${topicSlug}/post/new`;
    },
    postShowPath(topicSlug: string, postId: string){
        return `topics/${topicSlug}/post/${postId}`;
    }

};

export default paths;