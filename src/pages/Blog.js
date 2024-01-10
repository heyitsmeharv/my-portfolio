import ReactGA from 'react-ga';
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

// components
import Pagination from "../components/Pagination/Pagination";

// icons
import { StyledClose } from '../resources/styles/icons';
import { Search } from '@styled-icons/ionicons-solid/Search'
import { JavascriptSVG, ReactjsSVG, AWSSVG, AWSIAMSVG, AWSEC2SVG, AWSRDSSVG } from '../resources/styles/icons';


const SearchBarWrapper = styled.div`
  display: flex;
  position: relative;
  padding: 1rem 4rem;
`;

const StyledSearchBar = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 45px;
  font-size: 1.5rem;
`;

const StyledSearchIcon = styled(Search)`
  position: absolute;
  align-self: center;
  color: ${({ theme }) => theme.icon};
  width: 2.5rem;
  padding: 0 8px;
`;

const StyledCloseIcon = styled(StyledClose)`
  color: ${({ theme }) => theme.icon};
`;

const StyledCloseButton = styled.button`
  position: absolute;
  right: 40px;
  height: 50px;
  width: 60px;
  outline: none;
  border: none;
  background: none;
  :hover {
    cursor: pointer;
  }
`;

/* COOL TAG COLOURS */
// #64CBF6
// #8B191D
// #23262E

export default function Blog() {
  const [search, setSearch] = useState('')
  const [blogPosts, setBlogPosts] = useState([
    {
      title: 'The Start',
      readingTime: 'less than 1 minute',
      type: 'Retrospective',
      date: '05/04/2023',
      tags: [{ name: 'Misc', background: '#23262E' }],
      intro: `For a long time I've wanted to write a blog about technologies I'm interested in.
            The purpose of this blog is just to document my personal journey learning cool tech,
            if only to cement my own understanding and potentially help people with similar interests...`,
      navigate: 'the-start',
      published: true
    },
    {
      title: 'JavaScript Arrays',
      readingTime: 'approx 10 minutes',
      type: 'Discovery',
      date: '12/04/2023',
      tags: [{ name: 'JavaScript', background: '#F4BF36', icon: <JavascriptSVG /> }],
      intro: `Do you ever find yourself forgetting what helper methods would be best to manipulate your data? 
        In this post, I would like to go through the different helper functions and the use cases for manipulating your data.
        But before we get into that... 
      `,
      navigate: 'javascript-arrays',
      published: true
    },
    {
      title: 'JavaScript Objects',
      readingTime: 'approx 5 minutes',
      type: 'Discovery',
      date: '04/05/2023',
      tags: [{ name: 'JavaScript', background: '#F4BF36', icon: <JavascriptSVG /> }],
      intro: `After writing a blog post about arrays, which you can find here. Naturally it feels like the next post needs to be about JavaScript Objects. 
      Similar to my last post, I'll be keeping a similar format; that being explaining what objects are and how we can use them. Simple enough? Let's get it...`,
      navigate: 'javascript-objects',
      published: true
    },
    {
      title: 'AWS IAM',
      readingTime: 'approx 6 minutes',
      type: 'Discovery',
      date: '26/10/2023',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSSVG /> }, { name: 'IAM', background: '#FF9900', icon: <AWSIAMSVG /> }],
      intro: `This is the first of my AWS series blog posts where I'll be going through the Identity and Access Management Service, also known as IAM. I'm hoping 
      this will serve at least somewhat of a refresher or a quick reference guide for those familiar with the IAM service; if not getting to grips with the basics 
      if you're not familiar with this service at all...`,
      navigate: 'aws-identity-access-management',
      published: true
    },
    {
      title: 'AWS EC2',
      readingTime: 'approx 25 minutes',
      type: 'Discovery',
      date: '02/11/2023',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSSVG /> }, { name: 'IAM', background: '#FF9900', icon: <AWSEC2SVG /> }],
      intro: `In this blog post we'll be going through the Elastic Compute Cloud service, also known as EC2 which can be defined as an infrastructure as a Service (IaaS). 
      In short EC2 is a virtual service in the AWS cloud. Why would you need this? Well, any time you need to compute a task this service will be handy....`,
      navigate: 'aws-elastic-compute-cloud',
      published: true
    },
    {
      title: 'AWS Databases',
      readingTime: 'TBD',
      type: 'Discovery',
      date: '20/12/2023',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSSVG /> }, { name: 'RDS', background: '#FF9900', icon: <AWSRDSSVG /> }],
      intro: `...`,
      navigate: 'aws-databases',
      published: true
    },
    {
      title: 'React.js Text Based Adventure Game',
      readingTime: 'N/A',
      type: 'Practical',
      date: '07/05/2023',
      tags: [{ name: 'React', background: '#64CBF6', icon: <ReactjsSVG /> }, { name: 'JavaScript', background: '#F4BF36', icon: <JavascriptSVG /> }],
      intro: `I've been contemplating on whether or not to do a separate blog post to explain what the React.js framework is but I want to move away from my last posts and get stuck in with building something!
      If you're completely new to React I would recommend having a gander at their documentation...`,
      navigate: 'react-text-based-adventure',
      published: false
    }
  ]);

  const defaultArr = [
    {
      title: 'The Start',
      readingTime: 'less than 1 minute',
      type: 'Retrospective',
      date: '05/04/2023',
      tags: [{ name: 'Misc', background: '#23262E' }],
      intro: `For a long time I've wanted to write a blog about technologies I'm interested in.
            The purpose of this blog is just to document my personal journey learning cool tech,
            if only to cement my own understanding and potentially help people with similar interests...`,
      navigate: 'the-start',
      published: true
    },
    {
      title: 'JavaScript Arrays',
      readingTime: 'approx 10 minutes',
      type: 'Discovery',
      date: '12/04/2023',
      tags: [{ name: 'JavaScript', background: '#F4BF36', icon: <JavascriptSVG /> }],
      intro: `Do you ever find yourself forgetting what helper methods would be best to manipulate your data? 
      In this post, I would like to go through the different helper functions and the use cases for manipulating your data.
      But before we get into that...
    `,
      navigate: 'javascript-arrays',
      published: true
    },
    {
      title: 'JavaScript Objects',
      readingTime: 'approx 5 minutes',
      type: 'Discovery',
      date: '04/05/2023',
      tags: [{ name: 'JavaScript', background: '#F4BF36', icon: <JavascriptSVG /> }],
      intro: `After writing a blog post about arrays, which you can find here. Naturally it feels like the next post needs to be about JavaScript Objects. 
      Similar to my last post, I'll be keeping a similar format; that being explaining what objects are and how we can use them. Simple enough? Let's get it...`,
      navigate: 'javascript-objects',
      published: true
    },
    {
      title: 'AWS IAM',
      readingTime: 'approx 6 minutes',
      type: 'Discovery',
      date: '26/10/2023',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSSVG /> }, { name: 'IAM', background: '#FF9900', icon: <AWSIAMSVG /> }],
      intro: `This is the first of my AWS series blog posts where I'll be going through the Identity and Access Management Service, also known as IAM. I'm hoping 
      this will serve at least somewhat of a refresher or a quick reference guide for those familiar with the IAM service; if not getting to grips with the basics 
      if you're not familiar with this service at all...`,
      navigate: 'aws-identity-access-management',
      published: true
    },
    {
      title: 'AWS EC2',
      readingTime: 'approx 25 minutes',
      type: 'Discovery',
      date: '02/11/2023',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSSVG /> }, { name: 'IAM', background: '#FF9900', icon: <AWSEC2SVG /> }],
      intro: `In this blog post we'll be going through the Elastic Compute Cloud service, also known as EC2 which can be defined as an infrastructure as a Service (IaaS). 
      In short EC2 is a virtual service in the AWS cloud. Why would you need this? Well, any time you need to compute a task this service will be handy....`,
      navigate: 'aws-elastic-compute-cloud',
      published: true
    },
    {
      title: 'AWS Databases',
      readingTime: 'TBD',
      type: 'Discovery',
      date: '20/12/2023',
      tags: [{ name: 'AWS', background: '#FF9900', icon: <AWSSVG /> }, { name: 'RDS', background: '#FF9900', icon: <AWSRDSSVG /> }],
      intro: `...`,
      navigate: 'aws-databases',
      published: true
    },
    {
      title: 'React.js Text Based Adventure Game',
      readingTime: 'N/A',
      type: 'Practical',
      date: '07/05/2023',
      tags: [{ name: 'React', background: '#64CBF6', icon: <ReactjsSVG /> }, { name: 'JavaScript', background: '#F4BF36', icon: <JavascriptSVG /> }],
      intro: `I've been contemplating on whether or not to do a separate blog post to explain what the React.js framework is but I want to move away from my last posts and get stuck in with building something!
      If you're completely new to React I would recommend having a gander at their documentation...`,
      navigate: 'react-text-based-adventure',
      published: false
    }
  ];

  useEffect(() => {
    if (search !== '') {
      setBlogPosts(blogPosts.filter(x => x.title.toLowerCase().includes(search.toLowerCase()) || x.type.toLowerCase().includes(search.toLowerCase())));
    } else {
      setBlogPosts(defaultArr)
    }
  }, [search]);

  // analytics
  useEffect(() => {
    const isLocal = window.location.hostname === "localhost" ? true : false;
    if (!isLocal) {
      ReactGA.pageview('/blog');
    }
  }, []);

  return (
    <>
      <SearchBarWrapper>
        <StyledSearchIcon />
        <StyledSearchBar placeholder="Search" type="text" onChange={e => setSearch(e.target.value)} value={search} />
        <StyledCloseButton onClick={() => setSearch('')}> <StyledCloseIcon /></StyledCloseButton>
      </SearchBarWrapper>
      <Pagination itemsPerPage={6} items={blogPosts} />
    </>
  );
}