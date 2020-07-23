import React from "react";
import "../css/app.css";
import InfiniteScroll from 'react-infinite-scroll-component';

const axios = require("axios");
let page:number = 0;
type State = {
  searchTerm: string;
  galData: any;
  isOpen:Boolean,
  imgUrl:String,
};
const APIURL = "https://api.unsplash.com/search/photos?";
const APIKEY = "IbifwU4jKdF-KgX3UnZMabEa1zy2QA6KeS_CjT1_8dY";
class ImageSearchPage extends React.Component<PaymentResponse, State> {
  state = {
    searchTerm: "",
    galData: [],
    isOpen: false,
    imgUrl:'',
  };
  getPhotos = (page = 1) => {
    return axios.get(`${APIURL}client_id=${APIKEY}&page=${page}&query=${this.state.searchTerm}`);
  };
  getNewPhotos = async () => {
    page++;
    const response = await this.getPhotos(page);
    let galVal = this.state.galData;
    galVal = galVal.concat(response.data.results);
    this.setState({galData: galVal});
    }
  searchImage = async () => {
    const response = await this.getPhotos();
    console.log(response);
    let galVal = this.state.galData;
    galVal = galVal.concat(response.data.results);
    this.setState({ galData: galVal });
    };
  render() {
    const ress = this.state.galData;
    let ovStyle:any = this.state.isOpen ? 'blur(6px)':'none';
    return (
      <React.Fragment>
        <div className="wrap">
          <div className="search">
            <input
              type="text"
              className="searchTerm"
              placeholder="What are you looking for?"
              onChange={(event: any) =>
                this.setState({ searchTerm: event.target.value , galData:[]})
              }
            />
            <button
              type="submit"
              className="searchButton"
              onClick={() => this.searchImage()}
            >
              submit
            </button>
          </div>
        </div>
        <div className="outer" onClick={() => this.setState({isOpen:!this.state.isOpen})}>
        <div className="glylst" style={{filter: ovStyle}}>
        <ul className="searchUl">
        <InfiniteScroll
                dataLength={ress.length}
                next={this.getNewPhotos}
                hasMore={true}
                loader={''}
        >
        {ress
          ? ress.map((val: any, key:any) => (
              <li key={key} className="glyli">
                <a href="javascript:void(0)" style={{ backgroundImage: `url(${val.urls.regular})` }} 
                onClick={() => this.setState({isOpen:!this.state.isOpen,imgUrl:val.urls.full})}
                ></a>
              </li>
            ))
          : ""}
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
export default ImageSearchPage;
