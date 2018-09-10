import React, { Component } from 'react';
import './Home.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getStories } from '../../actions/storyActions';
import propTypes from 'prop-types';
import jsonQuery from 'json-query';
import { Slide } from 'react-slideshow-image';
//import { Provider } from 'react-redux';

class Home extends Component {
  
  
  
  componentDidMount() {
    this.props.getStories(); 
    
  }


  handleClick = (e) => {
    let ref1 = "storytitle" + e.target.id;
    let ref2 = "storybody" + e.target.id;
    let ref3 = "storylocation" + e.target.id;
    let ref4 = "storyimage" + e.target.id;
    let ref5 = "storydate" + e.target.id

    console.log(ref1);
    console.log(e.target.getAttribute('id'));
    this.props.story.storytitle = this.refs[ref1].textContent;
    this.props.story.storybody = this.refs[ref2].textContent;
    this.props.story.location = this.refs[ref3].textContent;
    this.props.story.storyimage = this.refs[ref4].src;
    this.props.story.storydate = this.refs[ref5].textContent
  }

  
  

  render()
  {
    const { stories } = this.props.story; 
    const storiesArr = Object.keys(stories);

    const Title = jsonQuery('[*][Title]', {data: stories} ).value;
    const Content = jsonQuery('[*][Content]', {data: stories} ).value;
    const ImageURL = jsonQuery('[*][ImageURL]', {data: stories} ).value;
    const location = jsonQuery('[*][Location]', {data: stories} ).value;

    /*updateData = (stories) => {
      this.setState({ stories });
    }*/
    
    const properties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true
    }

    const Slideshow = () => 
    {
      return (
        <Slide {...properties}>
          
          <div className="each-slide">
            <img alt="pix"ref="storyimage1" src={ ImageURL[storiesArr.length - 1] } />
            <div className="text-div">
              <NavLink className="homeNavLink" to="/story" id="1" onClick={this.handleClick}>
                <h2 className="text-title" ref="storytitle1">{ Title[storiesArr.length - 1] }</h2>
              </NavLink>
              <span className="hiddenLocation" ref="storylocation1">{location[storiesArr.length - 1]}</span>
              <p className="text-desc" ref="storybody1">
                {Content[storiesArr.length - 1]}
              </p>
            </div>
          </div>
          <div className="each-slide">
            <img alt="pix"ref="storyimage2" src={ImageURL[storiesArr.length - 2]} />
            <div className="text-div">
              <NavLink className="homeNavLink" to="/story" id="2" onClick={this.handleClick}>
                <h2 className="text-title">{ Title[storiesArr.length - 2] }</h2>
              </NavLink>
              <span className="hiddenLocation" ref="storylocation2">{location[storiesArr.length - 2]}</span>
              <p className="text-desc">
              {Content[storiesArr.length - 2]}
              </p>
            </div>
          </div>
          <div className="each-slide">
            <img alt="pix"ref="storyimage3" src={ImageURL[storiesArr.length - 3]} />
            <div className="text-div">
              <NavLink className="homeNavLink" to="/story" id="3" onClick={this.handleClick}>
                <h2 className="text-title">{ Title[storiesArr.length - 3] }</h2>
              </NavLink>
              <span className="hiddenLocation" ref="storylocation3">{location[storiesArr.length - 3]}</span>
              <p className="text-desc">
              {Content[storiesArr.length - 3]}
              </p>
            </div>
          </div>

        </Slide>
      )
  }

    
    
    const feedArray = [];

    feedArray.length = storiesArr.length;

    const getContent = storiesArr.map((eachStory, i) => {
      let index = i + 4
      return(
        <NavLink to="/story" key={i} id={index} className="navLink" onClick={this.handleClick}>
          <div className="news-item">
            <p className="origin">Canada-{location[i]}</p>
            <p className="item-title" ref={`storytitle${index}`}>
              {Title[i]}
            </p>
          </div>
        </NavLink>
        
      );
      
    });

    const formerFeatured = stories.map((eachStory, index) => {
      let i = index + 4
      if(i < 7 && i > 3)
      {
        return(
          <div className="otherNews" key={i}>
            <div className="otherNewsImg">
              <img alt="pix" ref={`storyimage${i}`} src={eachStory.ImageURL} />
            </div>

            <div className="otherNewsText">
                <h3 className="other-title" ref={`storytitle${i}`}>{eachStory.Title}</h3>
                <div className="hiddenLocation" ref={`storylocation${i}`}>{eachStory.Location}</div>
                <div className="hiddenLocation" ref={`storydate${i}`}>{eachStory.DateCreated}</div>
                <p className="other_text">
                  {eachStory.Content.split('.').splice(0,2)}
                </p>

                <p className="other_text_hidden" ref={`storybody${i}`}>
                  {eachStory.Content}
                </p>
                
                <p className="linktofull"><NavLink to="/story" id={i} onClick={this.handleClick}>Read Full Story <span> > </span> </NavLink></p>
            </div>
          </div>
        );
      }
    })

    
    return(
      
        <div className="content-wrapper">
        <div className="left">
          <div className="aceaNews">
            <h1>Anti-Corruption News</h1>
            <div className="headlineSlideShow">
              <div className="featured-story">
                <span>Featured Stories</span>
              </div>
              <div className="news-img">
                { Slideshow() }
              </div>

            </div>

            { formerFeatured }

            
          </div>

          <div className="stories">
            <div className="story"></div>
          </div>
        </div>
        <div className="right">
          <div className="feed home-top">
            <h3>Older Stories</h3>
        
            { getContent }
          </div>

          <div className="feed bottom">
            <h3>Twitter Feed</h3>

            
          </div>
        </div>
      </div>
    );
  }
  
}


Home.propTypes = {
  getStories: propTypes.func.isRequired, 
  story: propTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  story: state.story
});

export default connect(mapStateToProps, { getStories })(Home);

    