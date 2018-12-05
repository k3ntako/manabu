import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      profileImgLink: "",
      messages: []
    };
    this.profileImgClick = this.profileImgClick.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.updateImageDrop = this.updateImageDrop.bind(this);
    this.formatSize = this.formatSize.bind(this);
  }

  profileImgClick(){
    document.getElementById("selectImage").click()
  }

  onDrop(file) {
    if(file.length == 1) {
      this.setState({ file: file });
    } else {
      this.setState({ message: 'You can only upload one image.'});
    }
  }

  updateImageDrop(event){
    event.preventDefault();
    let formPayLoad = new FormData();
    formPayLoad.append('profile_image', this.state.file[0]);

    fetch(`/api/v1/users/update_profile_image`, {
      method: 'PATCH',
      body: formPayLoad,
      headers: {
        'Accept': 'application/json'},
        credentials: 'same-origin'
      })
    .then(data => data.json())
    .then(data => {
      this.setState({
        profileImgLink: data.image_url,
        file: []
      })
      if(data.message){
        this.setState({messages: [...this.state.messages, {success: data.message}]})
      }
    })
  }

  formatSize(bytes){
    if(bytes < 1000){
      return bytes + " bytes"
    }else if(bytes < 1000000){
      return (bytes/1000).toFixed(1) + " kB"
    }else {
      return (bytes/1000000).toFixed(1) + " MB"
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      profileImgLink: nextProps.currentUser.profile_image_url
    })
  }

  render(){
    let name, imgLink;
    if(this.props.currentUser){
      name = `${this.props.currentUser.current_user.first_name} ${this.props.currentUser.current_user.last_name}`
    }

    const droppedFiles = this.state.file.map(f => {
      return(
        <span key={f.name}>
          <strong>{f.name}</strong> - {this.formatSize(f.size)}
        </span>
      )
    });

    let submitButton;
    if(droppedFiles.length > 0){
      submitButton = <input type='submit' value='Upload' />
    };

    const messages = this.props.renderFlash(this.state.messages);

    return(
      <div className="">
        {messages}
        <h1>{name}</h1>
        <h3 className="change-password"><a href="/users/edit">Change Password</a></h3>

        <h3>Profile Photo</h3>
        <div className="profile-img-container">
          <img className="profile-img" src={this.state.profileImgLink} onClick={this.profileImgClick}/>
        </div>
        <form className="dropzone-container" onSubmit = {this.updateImageDrop}>
          <section>
            <div className="dropzone">
              <Dropzone
                onDrop={this.onDrop}
                accept={"image/jpeg,image/png,image/gif"}
                multiple={false}
                maxSize={2000000}
                >
                <p>To update your profile picture, drag and drop an image.</p>
                <p>Has to be .gif, .jpg, or .png, and less than 2 MB.</p>
              </Dropzone>
            </div>
            <aside>
              <div className="dropzone-dropped">
                {droppedFiles}
              </div>
            </aside>
          </section>

          {submitButton}
        </form>
      </div>
    );
  }
};

export default Profile
