import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { XmlEntities } from "html-entities";
import Loader from "react-loader-spinner";

const entities = new XmlEntities();

const Wrapper = styled.div`
  width: 60%;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 5px 5px 15px #dfdfdf;
  border-radius: 5px;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-row-gap: 20px;
  align-items: center;
  justify-items: center;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  height: 2rem;
  background: transparent;
  border-bottom: 1px solid rgb(200, 200, 200);
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  font-size: 1rem;

  &:focus {
    outline: none;
    border-bottom: 1px solid rgb(0, 120, 255);
  }
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1rem;
  text-align: center;
`;

const TitleContainer = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
`;

const Title = styled.p`
  margin: 0;
  font-size: 1.2rem;
  text-align: center;
`;

class TitleScraper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      title: "",
      loading: false,
      timeout: null
    };
  }

  handleChange = e => {
    if (this.state.timeout) clearTimeout(this.state.timeout);

    this.setState({
      input: e.target.value,
      timeout: e.target.value && setTimeout(this.getSiteTitle, 2000)
    });
  };

  parseDataForSiteTitle = data => {
    let title = data.match(/<title.*>(.+)<\/title>/);

    title = title
      ? entities.decode(title[1])
      : `No title found for "${this.state.input}"`;

    return title;
  };

  getSiteTitle = async () => {
    this.setState({ loading: true });

    axios({
      method: "get",
      url: `https://cors-anywhere.herokuapp.com/${this.state.input}` // Using cors-anywhere to avoid send request from localhost (http)
    })
      .then(({ data }) => {
        let title = this.parseDataForSiteTitle(data);

        this.setState({
          title,
          loading: false
        });
      })
      .catch(({ response }) => {
        this.setState({
          title: `${response.status} ${response.statusText}`,
          loading: false
        });
      });
  };

  render() {
    const { loading, input, title } = this.state;
    return (
      <Wrapper>
        <TitleContainer>
          {loading ? (
            <Loading>
              <Loader
                type="TailSpin"
                color="rgb(0, 120, 220)"
                height="3rem"
                width="3rem"
              />
              <LoadingText>Waiting for "{input}"</LoadingText>
            </Loading>
          ) : (
            <Title>{title}</Title>
          )}
        </TitleContainer>
        <Input
          type="input"
          value={input}
          placeholder="https://example.com"
          onChange={this.handleChange}
        />
      </Wrapper>
    );
  }
}

export default TitleScraper;
