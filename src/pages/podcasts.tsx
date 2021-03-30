import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pages } from "../components/page";
import { PodcastCard } from "../components/podcastCard";
import {
  podcastsPageQuery,
  podcastsPageQueryVariables,
} from "../__generated__/podcastsPageQuery";

const PODCASTS_QUERY = gql`
  query podcastsPageQuery($input: GetAllPodcastsInput!) {
    getAllPodcasts(input: $input) {
      ok
      error
      totalPages
      totalResults
      podcasts {
        id
        title
        category
        rating
        description
        updatedAt
      }
    }
  }
`;

const Categories = [
  "All",
  "News",
  "Culture",
  "Education",
  "Business",
  "Health",
  "Art",
  "Sports",
  "Science",
  "History",
];

export const Podcasts = () => {
  const [page, setPage] = useState(1);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [callQuery, { loading, data }] = useLazyQuery<
    podcastsPageQuery,
    podcastsPageQueryVariables
  >(PODCASTS_QUERY);
  useEffect(() => {
    const category = categoryIndex === 0 ? null : Categories[categoryIndex];
    callQuery({
      variables: {
        input: {
          page,
          category,
        },
      },
    });
  }, [callQuery, page, categoryIndex]);
  return loading ? (
    <div className="min-h-screen w-full max-w-screen-md mx-auto flex flex-col bg-blue-300">
      <div className="flex overflow-auto px-4 py-3">
        {Categories.map((category, idx) => (
          <div className="flex" key={idx}>
            <span
              className={`mx-1 px-2 ${
                idx === categoryIndex ? "bg-blue-600" : "bg-blue-400"
              } hover:bg-blue-600 cursor-pointer rounded-3xl text-white`}
              onClick={() => {
                setPage(1);
                setCategoryIndex(idx);
              }}
            >
              {category}
            </span>
          </div>
        ))}
      </div>
      <div className="flex px-4 py-2 bg-blue-400 text-white justify-center">
        Loading...
      </div>
    </div>
  ) : (
    <div className="min-h-screen w-full max-w-screen-md mx-auto flex flex-col bg-blue-300">
      <div className="flex overflow-auto px-4 py-3">
        {Categories.map((category, idx) => (
          <div className="flex" key={idx}>
            <span
              className={`mx-1 px-2 ${
                idx === categoryIndex ? "bg-blue-600" : "bg-blue-400"
              } hover:bg-blue-600 cursor-pointer rounded-3xl text-white`}
              onClick={() => {
                setPage(1);
                setCategoryIndex(idx);
              }}
            >
              {category}
            </span>
          </div>
        ))}
      </div>
      <Pages page={page} totalPage={100} setPage={setPage} />
      {data?.getAllPodcasts.podcasts?.map((podcast) => (
        <Link key={podcast.id} to={`/podcast/${podcast.id}`}>
          <PodcastCard
            id={podcast.id}
            title={podcast.title}
            updatedAt={podcast.updatedAt}
            category={podcast.category}
            rating={podcast.rating}
            description={podcast.description || "No Description"}
            totalSubscribers={30}
          />
        </Link>
      ))}
    </div>
  );
};
