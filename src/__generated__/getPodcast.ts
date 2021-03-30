/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPodcast
// ====================================================

export interface getPodcast_getPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: string;
}

export interface getPodcast_getPodcast_podcast_reviews_creator {
  __typename: "User";
  id: number;
  email: string;
}

export interface getPodcast_getPodcast_podcast_reviews {
  __typename: "Review";
  id: number;
  title: string;
  text: string;
  creator: getPodcast_getPodcast_podcast_reviews_creator;
}

export interface getPodcast_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  coverImage: string | null;
  rating: number;
  episodes: getPodcast_getPodcast_podcast_episodes[];
  reviews: getPodcast_getPodcast_podcast_reviews[];
}

export interface getPodcast_getPodcast {
  __typename: "PodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: getPodcast_getPodcast_podcast | null;
}

export interface getPodcast {
  getPodcast: getPodcast_getPodcast;
}

export interface getPodcastVariables {
  input: PodcastSearchInput;
}
