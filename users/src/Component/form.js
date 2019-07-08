import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
background-color:white;
width:60%;
margin:5% 20%;
min-height:60vh;
border-radius:10px;

h1{
    text-align:center;
    color:teal;
    padding-top:10px;
}
`
const Formed = styled.form`
width:60%;
margin: 10% 20%;
display:flex;
flex-direction:column;
input{
    height:5vh;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin:1% 5%;
    padding-left:5%;
    outline:none;
    border:none;
}
input[type =submit]{
    background-color:goldenrod;
}
`
 class Form extends React.Component{
     constructor(props){
         super(props)
         this.state=({
            name:"Name",
            bio:"Bio",
            value: 'Add Friend',
            target:''
        })
     }
     getFriend = async (id) =>{
        await this.props.get()
        const newFriend = this.props.data.find(friend => friend.id === Number(id))
        this.setState({
            name: newFriend.name,
            bio: newFriend.bio,
            value: "Update",
            target: id,
        })
        }
        componentDidMount(){
            if(this.props.location.pathname === `/${this.props.match.params.id}/update`) {
                this.getFriend(this.props.match.params.id)
            } 
        }
   render(){
    return (
        <Container>
        <h1>{this.state.value}</h1>
        <Formed onSubmit ={(e) =>this.props.submit(e , this.state.target)}>
            <input type='text'  onChange={(e) =>this.props.inputValue(e.target.value, 'name')} placeholder={this.state.name}/>
            <input type='text' onChange={(e)=>this.props.inputValue(e.target.value, 'bio')} placeholder={this.state.bio} />
            <input type='submit' value={this.state.value} />
        </Formed>
        </Container>
    )
}
 }
export default Form