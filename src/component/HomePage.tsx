import React from 'react';
import '../css/app.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const axios = require('axios');
let page:number = 0;
type Props = {
    //data:any
};
type State = {
    galData:any,
    initialize:Boolean,
    isOpen:Boolean,
    imgUrl:String,
};
const APIURL = 'https://api.unsplash.com/photos/';
const APIKEY = 'IbifwU4jKdF-KgX3UnZMabEa1zy2QA6KeS_CjT1_8dY';
class HomePage extends React.Component<Props,State> {
    state = {
        galData:[],
        initialize:false,
        isOpen: false,
        imgUrl:'',
    }
    getPhotos = (page = 1) => {
        return axios.get(`${APIURL}/?client_id=${APIKEY}&page=${page}`);
    }
    getNewPhotos = async () => {
        page++;
        const response = await this.getPhotos(page);
        let galVal = this.state.galData;
        galVal = galVal.concat(response.data);
        this.setState({galData: galVal, initialize:true});
    }
    componentDidMount(){
        if (!this.state.initialize) {
            this.getNewPhotos();
        }
    }
    
    render() {
        const ress =  this.state.galData;
        let ovStyle:any = this.state.isOpen ? 'blur(6px)':'none';

      return (
        <React.Fragment>
            <div className="outer" onClick={() => this.setState({isOpen:!this.state.isOpen})}>
            <div className="glylst" style={{filter: ovStyle}}>
            <ul>
            <InfiniteScroll
                dataLength={ress.length}
                next={this.getNewPhotos}
                hasMore={true}
                loader={''}
            >
            {ress ? ress.map((val:any) => (
                <li key={val.id} >
                    <a href="#javascript" style={{ backgroundImage: `url(${val.urls.regular})` }} 
                    onClick={() => this.setState({isOpen:!this.state.isOpen,imgUrl:val.urls.full})}
                    ></a>
                </li>
            )) : ''
            }
            </InfiniteScroll>
             </ul>
             </div>
             {this.state.isOpen && (
          <div
            className="dialog"
            style={{ position: "fixed" }}
            >
            <img
              className="fullImage"
              src={this.state.imgUrl}
              alt=""
              onClick={() => this.setState({isOpen:!this.state.isOpen})}
            />
            </div>)}
            </div>
        </React.Fragment>
        );
    }
}
export default HomePage;