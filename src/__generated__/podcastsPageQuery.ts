/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetAllPodcastsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: podcastsPageQuery
// ====================================================

export interface podcastsPageQuery_getAllPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  rating: number;
  description: string | null;
  updatedAt: any;
}

export interface podcastsPageQuery_getAllPodcasts {
  __typename: "GetAllPodcastsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  podcasts: podcastsPageQuery_getAllPodcasts_podcasts[] | null;
}

export interface podcastsPageQuery {
  getAllPodcasts: podcastsPageQuery_getAllPodcasts;
}

export interface podcastsPageQueryVariables {
  input: GetAllPodcastsInput;
}
